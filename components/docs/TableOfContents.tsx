'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Heading {
  id: string
  text: string
  level: number
}

/**
 * Extract headings from the page
 */
function extractHeadings(): Heading[] {
  if (typeof window === 'undefined') return []

  const headings: Heading[] = []
  const article = document.querySelector('article')
  if (!article) return []

  const headingElements = article.querySelectorAll('h1, h2, h3, h4, h5, h6')
  
  headingElements.forEach((heading) => {
    const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || ''
    if (id) {
      // Set ID if not already set
      if (!heading.id) {
        heading.id = id
      }
      
      headings.push({
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1)),
      })
    }
  })

  return headings
}

/**
 * Table of Contents Component
 * Auto-generates from page headings
 */
export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Wait for content to be rendered
    const timer = setTimeout(() => {
      const extracted = extractHeadings()
      setHeadings(extracted)

      if (extracted.length === 0) return

      // Set up intersection observer for active heading
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id)
            }
          })
        },
        {
          rootMargin: '-100px 0px -66%',
          threshold: 0,
        }
      )

      // Observe all headings
      extracted.forEach((heading) => {
        const element = document.getElementById(heading.id)
        if (element) {
          observer.observe(element)
        }
      })

      // Store observer for cleanup
      ;(window as any).__tocObserver = observer
    }, 100)

    return () => {
      clearTimeout(timer)
      if ((window as any).__tocObserver) {
        ;(window as any).__tocObserver.disconnect()
        delete (window as any).__tocObserver
      }
    }
  }, [])

  if (headings.length === 0) {
    return null
  }

  // Filter out h1 (usually the page title)
  const tocHeadings = headings.filter((h) => h.level > 1)

  if (tocHeadings.length === 0) {
    return null
  }

  return (
    <nav className="hidden xl:block sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="w-full pl-4">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">On this page</h3>
        </div>
        <ul className="space-y-1.5 text-sm">
          {tocHeadings.map((heading) => (
            <li key={heading.id}>
              <Link
                href={`#${heading.id}`}
                className={cn(
                  'block py-1.5 px-2 rounded-md transition-colors',
                  'text-muted-foreground hover:text-foreground hover:bg-accent',
                  heading.level === 2 && 'font-medium',
                  heading.level === 3 && 'ml-4 text-xs',
                  heading.level === 4 && 'ml-8 text-xs',
                  activeId === heading.id && 'text-foreground bg-accent font-medium'
                )}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(heading.id)
                  if (element) {
                    const offset = 100 // Account for fixed header
                    const elementPosition = element.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.pageYOffset - offset

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth',
                    })
                  }
                }}
              >
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
