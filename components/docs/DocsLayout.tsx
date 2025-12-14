'use client'

import { ReactNode } from 'react'
import { Sidebar } from '@/components/docs/Sidebar'
import { DocsNavigation } from '@/components/docs/DocsNavigation'
import { TableOfContents } from '@/components/docs/TableOfContents'
import { Breadcrumbs } from '@/components/docs/Breadcrumbs'
import { getDocsNavigation } from '@/lib/docs-order'

interface DocsLayoutProps {
  children: ReactNode
  slug?: string[]
}

/**
 * Documentation Layout Component
 * Combines sidebar navigation with content area, TOC, and breadcrumbs
 */
export function DocsLayout({ children, slug = [] }: DocsLayoutProps) {
  const navigation = getDocsNavigation(slug)

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] xl:grid-cols-[250px_1fr_220px] gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block sticky top-20 self-start">
            <Sidebar currentPath={slug} />
          </aside>

          {/* Content */}
          <main className="min-w-0">
            {/* Breadcrumbs */}
            <Breadcrumbs slug={slug} />
            
            <article className="max-w-4xl prose prose-slate dark:prose-invert prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-code:text-sm prose-pre:bg-[#1e1e1e] prose-pre:text-[#d4d4d4] prose-p:leading-7 prose-li:leading-7 prose-ul:leading-7 prose-ol:leading-7">
              {children}
            </article>
            
            {/* Navigation */}
            <DocsNavigation prev={navigation.prev} next={navigation.next} />
          </main>

          {/* Table of Contents */}
          <TableOfContents />
        </div>
      </div>
    </div>
  )
}
