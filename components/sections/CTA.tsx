'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Package, BookOpen, Play } from 'lucide-react'
import { Section } from '@/components/sections/Section'
import { Button } from '@/components/ui/button'
import { SceneCanvas } from '@/components/three/Canvas'
import { Particles } from '@/components/three/Particles'
import { fadeInUp } from '@/lib/transitions'

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/walbucket',
    icon: Github,
    description: 'View source code',
  },
  {
    label: 'NPM Package',
    href: 'https://www.npmjs.com/package/@walbucket/sdk',
    icon: Package,
    description: 'Install via npm',
  },
  {
    label: 'Documentation',
    href: '/docs',
    icon: BookOpen,
    description: 'Read the docs',
  },
  {
    label: 'Playground',
    href: '/playground',
    icon: Play,
    description: 'Try it live',
  },
]

/**
 * CTA (Call to Action) Section
 * Final conversion section with strong headline and CTAs
 */
export function CTA() {
  return (
    <Section
      id="cta"
      variant="fadeInUp"
      className="relative py-32 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background"
    >
      {/* Dynamic Background with Particles */}
      <div className="absolute inset-0 z-0">
        <SceneCanvas className="w-full h-full">
          <Particles count={400} speed={0.4} />
        </SceneCanvas>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent" id="cta-heading">
            Ready to Get Started?
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join developers building the future of decentralized media storage.
            Start integrating Walbucket SDK in minutes.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              <Link href="/docs" aria-label="Get started with Walbucket documentation">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2"
            >
              <Link href="/playground" aria-label="Try Walbucket playground">
                <Play className="mr-2 h-5 w-5" aria-hidden="true" />
                Try Playground
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {links.map((link) => {
              const Icon = link.icon
              return (
                <motion.div
                  key={link.label}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex flex-col items-center p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    aria-label={`${link.label} - ${link.description}${link.href.startsWith('http') ? ' (opens in new tab)' : ''}`}
                  >
                    <Icon className="h-6 w-6 mb-2 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                    <span className="font-medium text-sm mb-1">{link.label}</span>
                    <span className="text-xs text-muted-foreground text-center">
                      {link.description}
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}
