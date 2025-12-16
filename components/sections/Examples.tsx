'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Code2, Shield, FileText, Zap, ExternalLink, Play } from 'lucide-react'
import { Section } from '@/components/sections/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/transitions'
import { CodeBlock } from '../CodeBlock'

interface ExampleData {
  id: string
  title: string
  description: string
  icon: string
  category: string
  code: string
  highlightedCode?: string
  href: string
  color: string
}

// Icon mapping for client-side resolution
const iconMap = {
  FileText,
  Shield,
  Code2,
  Zap,
}

const examples: ExampleData[] = [
  {
    id: 'basic-upload',
    title: 'Basic Upload',
    description: 'Upload files to decentralized storage with a simple API call',
    icon: 'FileText',
    category: 'Getting Started',
    code: `const result = await walbucket.upload(file, {
  name: 'my-image.jpg',
  folder: 'products',
});`,
    href: '/docs/examples/basic-upload',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'with-encryption',
    title: 'With Encryption',
    description: 'Upload files with wallet-gated encryption for secure access',
    icon: 'Shield',
    category: 'Security',
    code: `const result = await walbucket.upload(file, {
  encryption: true,
  policy: {
    allowedWallets: ['0x...'],
  },
});`,
    href: '/docs/examples/with-encryption',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'wallet-integration',
    title: 'Wallet Integration',
    description: 'Integrate with Sui wallets for user-pays gas strategy',
    icon: 'Code2',
    category: 'Advanced',
    code: `const walbucket = new Walbucket({
  gasStrategy: 'user-pays',
  userSigner: walletSigner,
});`,
    href: '/docs/examples/wallet-integration',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'retrieve-delete',
    title: 'Retrieve & Delete',
    description: 'Retrieve and delete files from decentralized storage',
    icon: 'Zap',
    category: 'Operations',
    code: `const file = await walbucket.retrieve(assetId);
await walbucket.delete(assetId);`,
    href: '/docs/api/retrieve',
    color: 'from-orange-500 to-red-500',
  },
]

const categories = ['All', 'Getting Started', 'Security', 'Advanced', 'Operations']

interface ExamplesProps {
  examples?: ExampleData[]
}

/**
 * Examples Gallery Section
 * Showcase code examples with interactive cards
 */
export function Examples({ examples: examplesProp }: ExamplesProps) {
  const examplesData = examplesProp || examples
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredExamples =
    selectedCategory === 'All'
      ? examplesData
      : examplesData.filter((ex) => ex.category === selectedCategory)

  return (
    <Section
      id="examples"
      variant="fadeInUp"
      className="py-20 bg-gradient-to-b from-muted/20 to-background"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Code Examples
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore real-world examples and learn how to integrate Walbucket SDK
            into your projects
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <motion.div key={category} variants={staggerItem}>
              <Button
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
                aria-label={`Filter examples by ${category}`}
                aria-pressed={selectedCategory === category}
                role="button"
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Examples Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredExamples.map((example) => {
            const Icon = iconMap[example.icon as keyof typeof iconMap] || FileText
            return (
              <motion.div key={example.id} variants={staggerItem}>
                <Card className="group h-full flex flex-col hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-br ${example.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {example.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{example.title}</CardTitle>
                    <CardDescription>{example.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    {/* Code Preview */}
                    <div className="mb-4">
                      <CodeBlock 
                        code={example.code} 
                        language="typescript" 
                        highlightedCode={example.highlightedCode}
                        className="text-xs"
                      />
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex gap-2">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Link href={example.href} aria-label={`View documentation for ${example.title}`}>
                          <ExternalLink className="h-4 w-4 mr-2" aria-hidden="true" />
                          View Docs
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        className="flex-1 bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                      >
                        <Link href={`/playground?example=${example.id}`} aria-label={`Try ${example.title} example in playground`}>
                          <Play className="h-4 w-4 mr-2" aria-hidden="true" />
                          Try It
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </Section>
  )
}
