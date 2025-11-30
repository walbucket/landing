'use client'

import { useState, useEffect, useRef } from 'react'
import { Search as SearchIcon, X, FileText, BookOpen, Code, Settings } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import type { SearchResult } from '@/lib/search-index'

interface SearchProps {
  onResultClick?: () => void
}

/**
 * Documentation Search Component
 * Provides real-time search across all documentation
 */
export function Search({ onResultClick }: SearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsOpen(true)
        setTimeout(() => inputRef.current?.focus(), 100)
      }
      // Escape to close
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        setQuery('')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Search when query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    
    // Debounce search
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/docs/search?q=${encodeURIComponent(query)}`)
        if (response.ok) {
          const data = await response.json()
          setResults(data.results || [])
        }
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleResultClick = () => {
    setIsOpen(false)
    setQuery('')
    onResultClick?.()
  }

  const getSectionIcon = (slug: string[]) => {
    if (slug.length === 0) return BookOpen
    if (slug[0] === 'api') return Code
    if (slug[0] === 'advanced') return Settings
    if (slug[0] === 'examples') return FileText
    return BookOpen
  }

  // Highlight search matches in text
  const highlightMatches = (text: string, searchQuery: string): React.ReactNode => {
    if (!searchQuery.trim()) return text
    
    const terms = searchQuery.trim().split(/\s+/).filter(t => t.length > 0)
    if (terms.length === 0) return text

    // Escape HTML in text first
    const escapeHtml = (str: string) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
    }

    let highlighted = escapeHtml(text)
    terms.forEach(term => {
      const escapedTerm = escapeHtml(term)
      const regex = new RegExp(`(${escapedTerm})`, 'gi')
      highlighted = highlighted.replace(
        regex,
        '<mark class="bg-yellow-200 dark:bg-yellow-900/50 px-0.5 rounded font-medium">$1</mark>'
      )
    })

    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />
  }

  return (
    <div ref={searchRef} className="relative">
      {/* Search Input */}
      <Button
        variant="outline"
        className={cn(
          'w-full justify-start text-left font-normal',
          'text-muted-foreground hover:text-foreground',
          'h-9 px-3 text-sm'
        )}
        onClick={() => {
          setIsOpen(true)
          setTimeout(() => inputRef.current?.focus(), 100)
        }}
        aria-label="Search documentation"
        aria-expanded={isOpen}
        aria-controls="search-results"
      >
        <SearchIcon className="mr-2 h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Search docs...</span>
        <span className="sm:hidden">Search...</span>
        <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {/* Search Results */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9998] bg-background/80"
              style={{
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                // @ts-ignore - Mozilla vendor prefix
                MozBackdropFilter: 'blur(4px)',
              } as React.CSSProperties}
              onClick={() => setIsOpen(false)}
            />

            {/* Search Modal */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed left-1/2 top-24 z-[9999] w-full max-w-2xl -translate-x-1/2 rounded-lg border border-border bg-background shadow-lg"
            >
              {/* Search Input */}
              <div className="flex items-center gap-2 border-b border-border p-4">
                <SearchIcon className="h-5 w-5 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search documentation..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  autoFocus
                />
                {query && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuery('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {isLoading ? (
                  <div className="p-8 text-center text-sm text-muted-foreground">
                    Searching...
                  </div>
                ) : query.trim() && results.length === 0 ? (
                  <div className="p-8 text-center text-sm text-muted-foreground">
                    No results found for &quot;{query}&quot;
                  </div>
                ) : results.length > 0 ? (
                  <div className="p-2" role="list">
                    {results.map((result, index) => {
                      const Icon = getSectionIcon(result.slug)
                      return (
                        <Link
                          key={`${result.href}-${index}`}
                          href={result.href}
                          onClick={handleResultClick}
                          className="block rounded-md p-3 transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          role="option"
                          aria-label={`${result.title} - ${result.excerpt}`}
                        >
                          <div className="flex items-start gap-3">
                            <Icon className="mt-0.5 h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm">
                                {highlightMatches(result.title, query)}
                              </div>
                              <div className="mt-1 text-xs text-muted-foreground line-clamp-2">
                                {highlightMatches(result.excerpt, query)}
                              </div>
                              <div className="mt-1 text-xs text-muted-foreground/70">
                                {result.href}
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center text-sm text-muted-foreground">
                    Type to search documentation...
                  </div>
                )}
              </div>

              {/* Footer */}
              {query.trim() && results.length > 0 && (
                <div className="border-t border-border p-2 text-xs text-muted-foreground text-center">
                  {results.length} result{results.length !== 1 ? 's' : ''} found
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
