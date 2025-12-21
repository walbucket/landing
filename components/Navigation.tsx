'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Cloud } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Search } from '@/components/docs/Search'
import { cn } from '@/lib/utils'
import { config } from '@/lib/config'

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Quick Start', href: '#quick-start' },
  { label: 'Documentation', href: '/docs' },
  { label: 'Playground', href: '/playground' },
  { label: 'Examples', href: '#examples' },
  { label: 'Console', href: config.dappUrl, external: true },
]

/**
 * Navigation component with smooth scroll and mobile menu
 */
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e?.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        const offset = 80 // Account for fixed navbar
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 border-b border-border shadow-sm'
          : 'bg-transparent'
      )}
      style={isScrolled ? {
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        // @ts-ignore - Mozilla vendor prefix
        MozBackdropFilter: 'blur(12px)',
      } as React.CSSProperties : undefined}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2"
            aria-label="Walbucket - Go to homepage"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <Cloud className="h-6 w-6 text-blue-600" />
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Walbucket
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4" role="menubar">
            {navItems.map((item) => {
              if (item.href.startsWith('#')) {
                return (
                  <motion.button
                    key={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:rounded-md px-2 py-1"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    aria-label={`Navigate to ${item.label} section`}
                    role="menuitem"
                  >
                    {item.label}
                  </motion.button>
                )
              }
              const isExternal = (item as any).external === true
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:rounded-md px-2 py-1"
                  aria-label={`Navigate to ${item.label}${isExternal ? ' (opens in new tab)' : ''}`}
                  role="menuitem"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    {item.label}
                  </motion.div>
                </Link>
              )
            })}
            <div className="w-56">
              <Search />
            </div>
            <ThemeToggle />
            <Button asChild size="sm">
              <Link href="/docs">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
              role="menu"
              aria-label="Mobile navigation menu"
            >
              <div className="py-4 space-y-4">
                {/* Mobile Search */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0 }}
                  className="px-4"
                >
                  <Search />
                </motion.div>
                {navItems.map((item, index) => {
                  if (item.href.startsWith('#')) {
                    return (
                      <motion.button
                        key={item.href}
                        onClick={(e) => handleNavClick(item.href, e)}
                        className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: (index + 1) * 0.1 }}
                        role="menuitem"
                        aria-label={`Navigate to ${item.label} section`}
                      >
                        {item.label}
                      </motion.button>
                    )
                  }
                  const isExternal = (item as any).external === true
                  return (
                    <Link 
                      key={item.href} 
                      href={item.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      role="menuitem"
                      aria-label={`Navigate to ${item.label}${isExternal ? ' (opens in new tab)' : ''}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: (index + 1) * 0.1 }}
                      >
                        {item.label}
                      </motion.div>
                    </Link>
                  )
                })}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: (navItems.length + 1) * 0.1 }}
                  className="px-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Theme</span>
                    <ThemeToggle />
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/docs">Get Started</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
