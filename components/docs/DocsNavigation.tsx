'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { DocPage } from '@/lib/docs-order'

interface DocsNavigationProps {
  prev: DocPage | null
  next: DocPage | null
}

/**
 * Documentation Navigation Component
 * Provides next/previous navigation buttons
 */
export function DocsNavigation({ prev, next }: DocsNavigationProps) {
  if (!prev && !next) {
    return null
  }

  return (
    <nav className="mt-16 pt-8 border-t border-border">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {/* Previous Button */}
        {prev ? (
          <Button
            asChild
            variant="outline"
            className={cn(
              'group flex items-center gap-2 justify-start',
              'w-full sm:w-auto sm:min-w-[200px]'
            )}
          >
            <Link href={prev.href}>
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <div className="flex flex-col items-start">
                <span className="text-xs text-muted-foreground">Previous</span>
                <span className="font-medium">{prev.title}</span>
              </div>
            </Link>
          </Button>
        ) : (
          <div className="w-full sm:w-auto" /> // Spacer
        )}

        {/* Next Button */}
        {next ? (
          <Button
            asChild
            variant="outline"
            className={cn(
              'group flex items-center gap-2 justify-end sm:justify-start',
              'w-full sm:w-auto sm:min-w-[200px] ml-auto'
            )}
          >
            <Link href={next.href}>
              <div className="flex flex-col items-end sm:items-start">
                <span className="text-xs text-muted-foreground">Next</span>
                <span className="font-medium">{next.title}</span>
              </div>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        ) : (
          <div className="w-full sm:w-auto" /> // Spacer
        )}
      </div>
    </nav>
  )
}
