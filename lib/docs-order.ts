/**
 * Documentation navigation order
 * Defines the chronological order of documentation pages
 */

export interface DocPage {
  href: string
  title: string
  slug: string[]
}

/**
 * Flat list of all documentation pages in reading order
 */
export const docsOrder: DocPage[] = [
  // Getting Started
  { href: '/docs/installation', title: 'Installation', slug: ['installation'] },
  { href: '/docs/quick-start', title: 'Quick Start', slug: ['quick-start'] },
  { href: '/docs/configuration', title: 'Configuration', slug: ['configuration'] },
  
  // API Reference
  { href: '/docs/api/upload', title: 'Upload', slug: ['api', 'upload'] },
  { href: '/docs/api/retrieve', title: 'Retrieve', slug: ['api', 'retrieve'] },
  { href: '/docs/api/delete', title: 'Delete', slug: ['api', 'delete'] },
  { href: '/docs/api/get-asset', title: 'Get Asset', slug: ['api', 'get-asset'] },
  
  // Advanced
  { href: '/docs/advanced/gas-strategies', title: 'Gas Strategies', slug: ['advanced', 'gas-strategies'] },
  { href: '/docs/advanced/encryption-policies', title: 'Encryption Policies', slug: ['advanced', 'encryption-policies'] },
  { href: '/docs/advanced/error-handling', title: 'Error Handling', slug: ['advanced', 'error-handling'] },
  { href: '/docs/advanced/wallet-integration', title: 'Wallet Integration', slug: ['advanced', 'wallet-integration'] },
  
  // Examples
  { href: '/docs/examples/basic-upload', title: 'Basic Upload', slug: ['examples', 'basic-upload'] },
  { href: '/docs/examples/with-encryption', title: 'With Encryption', slug: ['examples', 'with-encryption'] },
  { href: '/docs/examples/wallet-integration', title: 'Wallet Integration', slug: ['examples', 'wallet-integration'] },
]

/**
 * Get next and previous documentation pages
 */
export function getDocsNavigation(currentSlug: string[]): {
  prev: DocPage | null
  next: DocPage | null
} {
  // Handle root docs page
  if (currentSlug.length === 0) {
    return {
      prev: null,
      next: docsOrder[0] || null,
    }
  }

  // Find current page index
  const currentIndex = docsOrder.findIndex(
    (page) => JSON.stringify(page.slug) === JSON.stringify(currentSlug)
  )

  if (currentIndex === -1) {
    return { prev: null, next: null }
  }

  return {
    prev: currentIndex > 0 ? docsOrder[currentIndex - 1] : null,
    next: currentIndex < docsOrder.length - 1 ? docsOrder[currentIndex + 1] : null,
  }
}
