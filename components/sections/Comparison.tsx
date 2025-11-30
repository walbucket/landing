'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Section } from '@/components/sections/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/transitions'

const comparisonFeatures = [
  {
    feature: 'Decentralized Storage',
    walbucket: true,
    cloudinary: false,
    description: 'No single point of failure',
  },
  {
    feature: 'Blockchain-Based',
    walbucket: true,
    cloudinary: false,
    description: 'Immutable metadata on Sui',
  },
  {
    feature: 'Wallet-Gated Encryption',
    walbucket: true,
    cloudinary: false,
    description: 'Native encryption with Seal',
  },
  {
    feature: 'Developer-Sponsored Gas',
    walbucket: true,
    cloudinary: false,
    description: 'Users don\'t pay gas fees',
  },
  {
    feature: 'CDN Delivery',
    walbucket: true,
    cloudinary: true,
    description: 'Fast global content delivery',
  },
  {
    feature: 'Image Transformations',
    walbucket: false,
    cloudinary: true,
    description: 'On-the-fly image processing',
  },
  {
    feature: 'Video Processing',
    walbucket: false,
    cloudinary: true,
    description: 'Video encoding and streaming',
  },
  {
    feature: 'Free Tier',
    walbucket: true,
    cloudinary: true,
    description: 'Generous free usage limits',
  },
  {
    feature: 'API Simplicity',
    walbucket: true,
    cloudinary: true,
    description: 'Easy-to-use developer API',
  },
  {
    feature: 'Ownership & Control',
    walbucket: true,
    cloudinary: false,
    description: 'True ownership of your assets',
  },
]

/**
 * Comparison Section
 * Walbucket vs Cloudinary feature comparison
 */
export function Comparison() {
  return (
    <Section
      id="comparison"
      variant="fadeInUp"
      className="py-20 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent" id="comparison-heading">
            Walbucket vs Cloudinary
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how Walbucket compares to traditional cloud storage solutions
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Card className="overflow-hidden" role="region" aria-labelledby="comparison-heading">
            <CardHeader className="bg-muted/50">
              <div className="grid grid-cols-3 gap-4 items-center" role="row">
                <div role="columnheader">
                  <CardTitle className="text-lg">Feature</CardTitle>
                </div>
                <div className="text-center" role="columnheader">
                  <CardTitle className="text-lg">Walbucket</CardTitle>
                  <Badge className="mt-2 bg-gradient-to-r from-cyan-500 to-blue-500" aria-label="Decentralized platform">
                    Decentralized
                  </Badge>
                </div>
                <div className="text-center" role="columnheader">
                  <CardTitle className="text-lg">Cloudinary</CardTitle>
                  <Badge variant="secondary" className="mt-2" aria-label="Centralized platform">
                    Centralized
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border" role="table">
                {comparisonFeatures.map((item, index) => (
                  <motion.div
                    key={item.feature}
                    variants={staggerItem}
                    className="grid grid-cols-3 gap-4 p-4 hover:bg-muted/30 transition-colors"
                    role="row"
                  >
                    <div className="flex flex-col" role="gridcell">
                      <span className="font-medium">{item.feature}</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        {item.description}
                      </span>
                    </div>
                    <div className="flex items-center justify-center" role="gridcell" aria-label={item.walbucket ? `${item.feature} available in Walbucket` : `${item.feature} not available in Walbucket`}>
                      {item.walbucket ? (
                        <Check className="h-6 w-6 text-green-500" aria-hidden="true" />
                      ) : (
                        <X className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                      )}
                    </div>
                    <div className="flex items-center justify-center" role="gridcell" aria-label={item.cloudinary ? `${item.feature} available in Cloudinary` : `${item.feature} not available in Cloudinary`}>
                      {item.cloudinary ? (
                        <Check className="h-6 w-6 text-green-500" aria-hidden="true" />
                      ) : (
                        <X className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Differentiators */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mt-12"
          >
            <motion.div variants={staggerItem}>
              <Card className="h-full border-2 border-primary/20 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl">Decentralized</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Built on Sui blockchain with Walrus storage. No vendor lock-in,
                    no single point of failure. Your data, your control.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Card className="h-full border-2 border-primary/20 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl">Wallet-Gated</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Native encryption with Seal protocol. Control who can access
                    your files with wallet-based permissions.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Card className="h-full border-2 border-primary/20 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl">Developer-Friendly</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Sponsor gas fees for your users. Simple API, familiar patterns.
                    Cloudinary-like experience with blockchain benefits.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}
