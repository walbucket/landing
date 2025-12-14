'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, FileText, BookOpen, Code, Settings, Share2, FolderOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: 'Getting Started',
    href: '/docs',
    icon: BookOpen,
    children: [
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Quick Start', href: '/docs/quick-start' },
      { title: 'Configuration', href: '/docs/configuration' },
    ],
  },
  {
    title: 'API Reference',
    href: '/docs/api',
    icon: Code,
    children: [
      { title: 'Upload', href: '/docs/api/upload' },
      { title: 'Retrieve', href: '/docs/api/retrieve' },
      { title: 'Delete', href: '/docs/api/delete' },
      { title: 'Get Asset', href: '/docs/api/get-asset' },
      { title: 'List', href: '/docs/api/list' },
      { title: 'Rename', href: '/docs/api/rename' },
      { title: 'Copy', href: '/docs/api/copy' },
    ],
  },
  {
    title: 'Folder Management',
    href: '/docs/api/folders',
    icon: FolderOpen,
    children: [
      { title: 'Create Folder', href: '/docs/api/create-folder' },
      { title: 'Delete Folder', href: '/docs/api/delete-folder' },
      { title: 'Move to Folder', href: '/docs/api/move-to-folder' },
    ],
  },
  {
    title: 'Sharing & Permissions',
    href: '/docs/api/sharing',
    icon: Share2,
    children: [
      { title: 'Share Asset', href: '/docs/api/share-asset' },
      { title: 'Revoke Share', href: '/docs/api/revoke-share' },
      { title: 'List Access Grants', href: '/docs/api/list-access-grants' },
      { title: 'Get Access Grant', href: '/docs/api/get-access-grant' },
      { title: 'Create Shareable Link', href: '/docs/api/create-shareable-link' },
      { title: 'Deactivate Link', href: '/docs/api/deactivate-shareable-link' },
      { title: 'Track Link Access', href: '/docs/api/track-link-access' },
      { title: 'List Shareable Links', href: '/docs/api/list-shareable-links' },
      { title: 'Get Shareable Link', href: '/docs/api/get-shareable-link' },
    ],
  },
  {
    title: 'Advanced',
    href: '/docs/advanced',
    icon: Settings,
    children: [
      { title: 'Gas Strategies', href: '/docs/advanced/gas-strategies' },
      { title: 'Encryption Policies', href: '/docs/advanced/encryption-policies' },
      { title: 'Error Handling', href: '/docs/advanced/error-handling' },
      { title: 'Wallet Integration', href: '/docs/advanced/wallet-integration' },
    ],
  },
  {
    title: 'Examples',
    href: '/docs/examples',
    icon: FileText,
    children: [
      { title: 'Basic Upload', href: '/docs/examples/basic-upload' },
      { title: 'With Encryption', href: '/docs/examples/with-encryption' },
      { title: 'Wallet Integration', href: '/docs/examples/wallet-integration' },
      { title: 'Folder Organization', href: '/docs/examples/folder-organization' },
      { title: 'Sharing Workflows', href: '/docs/examples/sharing-workflows' },
      { title: 'File Operations', href: '/docs/examples/file-operations' },
      { title: 'Access Management', href: '/docs/examples/access-management' },
    ],
  },
]

interface SidebarItemProps {
  item: NavItem
  currentPath: string[]
  level?: number
}

function SidebarItem({ item, currentPath, level = 0 }: SidebarItemProps) {
  const [isOpen, setIsOpen] = useState(() => {
    // Auto-open if current path matches
    if (item.children) {
      return item.children.some(
        (child) => child.href === `/docs/${currentPath.join('/')}`
      )
    }
    return false
  })

  const isActive = item.href === `/docs/${currentPath.join('/')}` || 
    (currentPath.length === 0 && item.href === '/docs')

  const Icon = item.icon

  return (
    <div>
      {item.children ? (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            )}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span className="flex-1 text-left">{item.title}</span>
            <ChevronRight
              className={cn(
                'w-4 h-4 transition-transform',
                isOpen && 'rotate-90'
              )}
            />
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="ml-4 mt-1 space-y-1 border-l border-border pl-4">
                  {item.children.map((child) => {
                    const childIsActive = child.href === `/docs/${currentPath.join('/')}`
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'block px-3 py-1.5 rounded-lg text-sm transition-colors',
                          childIsActive
                            ? 'bg-accent text-accent-foreground font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                        )}
                      >
                        {child.title}
                      </Link>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Link
          href={item.href}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
            isActive
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
          )}
        >
          {Icon && <Icon className="w-4 h-4" />}
          <span>{item.title}</span>
        </Link>
      )}
    </div>
  )
}

/**
 * Documentation Sidebar Component
 * Auto-generates navigation from docs structure
 */
export function Sidebar({ currentPath = [] }: { currentPath?: string[] }) {
  return (
    <nav className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="space-y-1">
        {navItems.map((item) => (
          <SidebarItem key={item.href} item={item} currentPath={currentPath} />
        ))}
      </div>
    </nav>
  )
}
