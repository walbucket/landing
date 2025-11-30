'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { docsOrder } from '@/lib/docs-order'

interface BreadcrumbsProps {
  slug: string[]
}

/**
 * Breadcrumbs Component
 * Shows navigation path for current documentation page
 */
export function Breadcrumbs({ slug }: BreadcrumbsProps) {
  // Find current page
  const currentPage = docsOrder.find(
    (page) => JSON.stringify(page.slug) === JSON.stringify(slug)
  )

  // Build breadcrumb items
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Documentation', href: '/docs' },
  ]

  // Add section based on slug
  if (slug.length > 0) {
    if (slug[0] === 'api') {
      items.push({ label: 'API Reference', href: '/docs/api' })
    } else if (slug[0] === 'advanced') {
      items.push({ label: 'Advanced', href: '/docs/advanced' })
    } else if (slug[0] === 'examples') {
      items.push({ label: 'Examples', href: '/docs/examples' })
    }
  }

  // Add current page
  if (currentPage) {
    items.push({ label: currentPage.title, href: currentPage.href })
  } else if (slug.length > 0) {
    // Fallback: use slug as title
    const title = slug[slug.length - 1]
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    items.push({ label: title, href: `/docs/${slug.join('/')}` })
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.href} className="flex items-center gap-2">
              {index === 0 ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                  aria-label="Home"
                >
                  <Home className="h-4 w-4" />
                </Link>
              ) : (
                <>
                  <ChevronRight className="h-4 w-4" />
                  {isLast ? (
                    <span className="text-foreground font-medium">{item.label}</span>
                  ) : (
                    <Link
                      href={item.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
