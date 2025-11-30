'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/sections/Section'
import { CodeBlock } from '@/components/CodeBlock'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const installationCode = {
  pnpm: 'pnpm add @walbucket/sdk',
  npm: 'npm install @walbucket/sdk',
  yarn: 'yarn add @walbucket/sdk',
}

const quickStartCode = `import { Walbucket } from '@walbucket/sdk';

// Initialize SDK
const walbucket = new Walbucket({
  apiKey: 'your-api-key',
  network: 'testnet',
  sponsorPrivateKey: 'your-private-key',
});

// Upload a file
const result = await walbucket.upload(file, {
  name: 'my-image.jpg',
  folder: 'products',
});

console.log(result.assetId); // Sui object ID
console.log(result.url); // Automatically generated file URL

// Retrieve a file
const retrieveResult = await walbucket.retrieve(result.assetId);
console.log('File data:', retrieveResult.data);
console.log('File URL:', retrieveResult.url);`

/**
 * Quick Start Section Component
 * Shows installation and quick start code examples
 */
export function QuickStart() {
  return (
    <Section
      id="quick-start"
      variant="fadeInUp"
      className="py-24 md:py-32 bg-gradient-to-b from-background via-muted/10 to-background"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Get Started in Minutes
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Install the SDK and start uploading files in just a few lines of code
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Installation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-4" id="installation-heading">Installation</h3>
            <Tabs defaultValue="pnpm" className="w-full" aria-labelledby="installation-heading">
              <TabsList className="grid w-full grid-cols-3" role="tablist">
                <TabsTrigger value="pnpm" role="tab" aria-label="Install with pnpm">pnpm</TabsTrigger>
                <TabsTrigger value="npm" role="tab" aria-label="Install with npm">npm</TabsTrigger>
                <TabsTrigger value="yarn" role="tab" aria-label="Install with yarn">yarn</TabsTrigger>
              </TabsList>
              {Object.entries(installationCode).map(([key, code]) => (
                <TabsContent key={key} value={key} className="mt-4">
                  <CodeBlock code={code} language="bash" />
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          {/* Quick Start Code */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-4" id="quick-start-code-heading">Quick Start</h3>
            <CodeBlock code={quickStartCode} language="typescript" ariaLabelledBy="quick-start-code-heading" />
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button asChild size="lg" className="group">
            <Link href="/docs" aria-label="View full documentation">
              View Full Documentation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </Section>
  )
}
