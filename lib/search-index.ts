/**
 * Documentation search index
 * Indexes all documentation content for search functionality
 */

import { readFile, readdir } from 'fs/promises'
import { join } from 'path'
import { docsOrder } from './docs-order'

export interface SearchResult {
  href: string
  title: string
  slug: string[]
  excerpt: string
  score: number
}

export interface SearchIndexItem {
  href: string
  title: string
  slug: string[]
  content: string
}

/**
 * Index all documentation files
 */
export async function buildSearchIndex(): Promise<SearchIndexItem[]> {
  const basePath = join(process.cwd(), 'content', 'docs')
  const index: SearchIndexItem[] = []

  // Helper to extract text from MDX (remove markdown syntax)
  const extractText = (mdx: string): string => {
    // First, extract code block language and comments for better indexing
    let text = mdx
      // Extract comments from code blocks (they often contain useful info)
      .replace(/```[\w]*\n([\s\S]*?)```/g, (match, code) => {
        // Extract comments from code
        const comments = code.match(/\/\/.*$/gm) || []
        const commentText = comments.join(' ').replace(/\/\//g, '').trim()
        return commentText ? ` ${commentText} ` : ' '
      })
      .replace(/`[^`]+`/g, '') // Remove inline code
      .replace(/#{1,6}\s+/g, '') // Remove heading markers but keep text
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold markers, keep text
      .replace(/\*([^*]+)\*/g, '$1') // Remove italic markers, keep text
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
      .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()
    
    return text
  }

  // Index all pages from docsOrder
  for (const page of docsOrder) {
    try {
      const filePath = join(basePath, ...page.slug) + '.mdx'
      const content = await readFile(filePath, 'utf-8')
      const textContent = extractText(content)
      
      // For examples pages, ensure we have at least the title and some content
      // If content is empty after extraction, use the raw content (without code blocks)
      let finalContent = textContent.trim()
      if (!finalContent && page.slug[0] === 'examples') {
        // For examples, extract headings and descriptions even if code is removed
        const headings = content.match(/^#+\s+(.+)$/gm) || []
        const headingText = headings.map(h => h.replace(/^#+\s+/, '')).join(' ')
        finalContent = headingText || page.title
      }
      
      if (!finalContent) {
        console.warn(`Skipping ${page.href}: empty content after extraction`)
        continue
      }
      
      index.push({
        href: page.href,
        title: page.title,
        slug: page.slug,
        content: finalContent,
      })
    } catch (error) {
      // Log error with more details
      const filePath = join(basePath, ...page.slug) + '.mdx'
      console.error(`Could not index ${page.href} (${filePath}):`, error)
    }
  }

  // Also index the main index page
  try {
    const indexPath = join(basePath, 'index.mdx')
    const content = await readFile(indexPath, 'utf-8')
    const textContent = extractText(content)
    
    index.push({
      href: '/docs',
      title: 'Documentation',
      slug: [],
      content: textContent,
    })
  } catch (error) {
    // Skip if doesn't exist
  }

  return index
}

/**
 * Search documentation index
 */
export function searchDocs(
  query: string,
  index: SearchIndexItem[],
  limit: number = 10
): SearchResult[] {
  if (!query.trim()) {
    return []
  }

  const searchTerms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((term) => term.length > 0)

  if (searchTerms.length === 0) {
    return []
  }

  const results: SearchResult[] = []

  // Score each item
  for (const item of index) {
    const titleLower = item.title.toLowerCase()
    const contentLower = item.content.toLowerCase()
    let score = 0

    // Calculate score based on matches
    for (const term of searchTerms) {
      // Title matches are worth more
      if (titleLower.includes(term)) {
        score += 15
        // Exact title match is worth even more
        if (titleLower === term) {
          score += 25
        }
        // Partial word match in title
        const titleWords = titleLower.split(/\s+/)
        if (titleWords.some(word => word.includes(term) || term.includes(word))) {
          score += 5
        }
      }

      // Content matches
      const contentMatches = (contentLower.match(new RegExp(term, 'g')) || []).length
      score += contentMatches * 2

      // Check if term appears at word boundaries (better match)
      const wordBoundaryRegex = new RegExp(`\\b${term}\\b`, 'gi')
      const wordBoundaryMatches = (contentLower.match(wordBoundaryRegex) || []).length
      score += wordBoundaryMatches * 4
      
      // Boost score for examples pages if searching for example-related terms
      const exampleTerms = ['example', 'examples', 'demo', 'sample', 'tutorial']
      if (exampleTerms.some(et => term.includes(et) || et.includes(term))) {
        if (item.slug[0] === 'examples') {
          score += 10
        }
      }
    }

    if (score > 0) {
      // Generate excerpt (first 150 chars with match highlighted)
      const excerpt = generateExcerpt(item.content, searchTerms, 150)

      results.push({
        href: item.href,
        title: item.title,
        slug: item.slug,
        excerpt,
        score,
      })
    }
  }

  // Sort by score (descending) and limit results
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

/**
 * Generate excerpt with highlighted search terms
 */
function generateExcerpt(
  content: string,
  searchTerms: string[],
  maxLength: number = 150
): string {
  const lowerContent = content.toLowerCase()
  
  // Find the first occurrence of any search term
  let bestIndex = -1
  let bestTerm = ''
  
  for (const term of searchTerms) {
    const index = lowerContent.indexOf(term)
    if (index !== -1 && (bestIndex === -1 || index < bestIndex)) {
      bestIndex = index
      bestTerm = term
    }
  }

  if (bestIndex === -1) {
    // No match found, return beginning
    return content.substring(0, maxLength) + (content.length > maxLength ? '...' : '')
  }

  // Extract excerpt around the match
  const start = Math.max(0, bestIndex - 50)
  const end = Math.min(content.length, bestIndex + bestTerm.length + maxLength - 50)
  let excerpt = content.substring(start, end)

  // Add ellipsis if needed
  if (start > 0) excerpt = '...' + excerpt
  if (end < content.length) excerpt = excerpt + '...'

  return excerpt.trim()
}
