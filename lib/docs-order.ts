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
  
  // Core API Reference
  { href: '/docs/api/upload', title: 'Upload', slug: ['api', 'upload'] },
  { href: '/docs/api/retrieve', title: 'Retrieve', slug: ['api', 'retrieve'] },
  { href: '/docs/api/delete', title: 'Delete', slug: ['api', 'delete'] },
  { href: '/docs/api/get-asset', title: 'Get Asset', slug: ['api', 'get-asset'] },
  { href: '/docs/api/list', title: 'List', slug: ['api', 'list'] },
  
  // File Operations
  { href: '/docs/api/rename', title: 'Rename', slug: ['api', 'rename'] },
  { href: '/docs/api/copy', title: 'Copy', slug: ['api', 'copy'] },
  
  // Folder Management
  { href: '/docs/api/create-folder', title: 'Create Folder', slug: ['api', 'create-folder'] },
  { href: '/docs/api/delete-folder', title: 'Delete Folder', slug: ['api', 'delete-folder'] },
  { href: '/docs/api/move-to-folder', title: 'Move to Folder', slug: ['api', 'move-to-folder'] },
  
  // Sharing & Permissions - Access Grants
  { href: '/docs/api/share-asset', title: 'Share Asset', slug: ['api', 'share-asset'] },
  { href: '/docs/api/revoke-share', title: 'Revoke Share', slug: ['api', 'revoke-share'] },
  { href: '/docs/api/list-access-grants', title: 'List Access Grants', slug: ['api', 'list-access-grants'] },
  { href: '/docs/api/get-access-grant', title: 'Get Access Grant', slug: ['api', 'get-access-grant'] },
  
  // Sharing & Permissions - Shareable Links
  { href: '/docs/api/create-shareable-link', title: 'Create Shareable Link', slug: ['api', 'create-shareable-link'] },
  { href: '/docs/api/deactivate-shareable-link', title: 'Deactivate Shareable Link', slug: ['api', 'deactivate-shareable-link'] },
  { href: '/docs/api/track-link-access', title: 'Track Link Access', slug: ['api', 'track-link-access'] },
  { href: '/docs/api/list-shareable-links', title: 'List Shareable Links', slug: ['api', 'list-shareable-links'] },
  { href: '/docs/api/get-shareable-link', title: 'Get Shareable Link', slug: ['api', 'get-shareable-link'] },
  
  // Advanced
  { href: '/docs/advanced/gas-strategies', title: 'Gas Strategies', slug: ['advanced', 'gas-strategies'] },
  { href: '/docs/advanced/encryption-policies', title: 'Encryption Policies', slug: ['advanced', 'encryption-policies'] },
  { href: '/docs/advanced/error-handling', title: 'Error Handling', slug: ['advanced', 'error-handling'] },
  { href: '/docs/advanced/wallet-integration', title: 'Wallet Integration', slug: ['advanced', 'wallet-integration'] },
  
  // Examples
  { href: '/docs/examples/basic-upload', title: 'Basic Upload', slug: ['examples', 'basic-upload'] },
  { href: '/docs/examples/with-encryption', title: 'With Encryption', slug: ['examples', 'with-encryption'] },
  { href: '/docs/examples/wallet-integration', title: 'Wallet Integration', slug: ['examples', 'wallet-integration'] },
  { href: '/docs/examples/folder-organization', title: 'Folder Organization', slug: ['examples', 'folder-organization'] },
  { href: '/docs/examples/sharing-workflows', title: 'Sharing Workflows', slug: ['examples', 'sharing-workflows'] },
  { href: '/docs/examples/file-operations', title: 'File Operations', slug: ['examples', 'file-operations'] },
  { href: '/docs/examples/access-management', title: 'Access Management', slug: ['examples', 'access-management'] },
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
