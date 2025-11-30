'use client'

import Link from 'next/link'
import { Github, Package, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Footer component
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    product: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Examples', href: '#examples' },
      { label: 'Features', href: '#features' },
    ],
    resources: [
      { label: 'GitHub', href: 'https://github.com/walbucket/sdk', external: true },
      { label: 'NPM Package', href: 'https://www.npmjs.com/package/@walbucket/sdk', external: true },
      { label: 'Release Notes', href: '/docs/release-notes' },
    ],
    legal: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'License', href: '/license' },
    ],
  }

  return (
    <footer className="border-t border-border bg-muted/30" role="contentinfo" aria-label="Site footer">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Walbucket
            </div>
            <p className="text-sm text-muted-foreground">
              Decentralized media storage for developers. Cloudinary-like API on Sui blockchain.
            </p>
            <div className="flex space-x-4" role="list" aria-label="Social links">
              <Link
                href="https://github.com/walbucket/sdk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:rounded-md p-1"
                aria-label="Visit Walbucket on GitHub (opens in new tab)"
                role="listitem"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="https://www.npmjs.com/package/@walbucket/sdk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:rounded-md p-1"
                aria-label="View Walbucket on npm (opens in new tab)"
                role="listitem"
              >
                <Package className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <nav aria-label="Product navigation">
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2" role="list">
              {links.product.map((link) => (
                <li key={link.href} role="listitem">
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:rounded-md px-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources Links */}
          <nav aria-label="Resources navigation">
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2" role="list">
              {links.resources.map((link) => (
                <li key={link.href} role="listitem">
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:rounded-md px-1"
                    aria-label={link.external ? `${link.label} (opens in new tab)` : link.label}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal Links */}
          <nav aria-label="Legal navigation">
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2" role="list">
              {links.legal.map((link) => (
                <li key={link.href} role="listitem">
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:rounded-md px-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {currentYear} Walbucket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
