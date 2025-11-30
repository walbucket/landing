'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Database, Zap, Code, Lock, Cloud } from 'lucide-react'
import { Section } from '@/components/sections/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SceneCanvas } from '@/components/three/Canvas'
import { FeatureVisualization } from '@/components/three/FeatureVisualization'
import { staggerContainer, staggerItem } from '@/lib/transitions'

const features = [
  {
    icon: Database,
    title: 'Decentralized Storage',
    description: 'Store media files on Sui blockchain using Walrus decentralized storage. No single point of failure.',
    color: 'from-cyan-500 to-blue-500',
    visualizationType: 'storage' as const,
  },
  {
    icon: Lock,
    title: 'Built-in Encryption',
    description: 'Automatic encryption support via Seal. Your files are secure by default with zero configuration.',
    color: 'from-blue-500 to-indigo-500',
    visualizationType: 'encryption' as const,
  },
  {
    icon: Zap,
    title: 'Flexible Gas Strategies',
    description: 'Choose from sponsor, user, or hybrid gas payment strategies. Optimize costs for your use case.',
    color: 'from-indigo-500 to-purple-500',
    visualizationType: 'gas' as const,
  },
  {
    icon: Code,
    title: 'Cloudinary-like API',
    description: 'Familiar API design makes migration easy. Upload, retrieve, delete, and transform with simple methods.',
    color: 'from-purple-500 to-pink-500',
    visualizationType: 'api' as const,
  },
  {
    icon: Cloud,
    title: 'Automatic URL Generation',
    description: 'Get instant URLs for your uploaded files. No need to manage CDN or storage endpoints manually.',
    color: 'from-pink-500 to-rose-500',
    visualizationType: 'url' as const,
  },
  {
    icon: Shield,
    title: 'Type-Safe SDK',
    description: 'Full TypeScript support with comprehensive types. Catch errors at compile time, not runtime.',
    color: 'from-rose-500 to-orange-500',
    visualizationType: 'typescript' as const,
  },
]

/**
 * Feature Card Component with 3D Visualization
 */
function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number]
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = feature.icon

  return (
    <motion.div variants={staggerItem}>
      <Card
        className="h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-cyan-500/50 group relative overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="article"
        aria-labelledby={`feature-${index}-title`}
      >
        <CardHeader>
          <div className="relative mb-4">
            {/* 2D Icon (always visible) */}
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} p-3 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
              <Icon className="w-full h-full text-white" />
            </div>
            
            {/* 3D Visualization (on hover) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <SceneCanvas
                className="w-full h-24"
                camera={{ position: [0, 0, 2], fov: 50 }}
                dpr={1}
              >
                <FeatureVisualization type={feature.visualizationType} hovered={isHovered} />
              </SceneCanvas>
            </div>
          </div>
                    <CardTitle className="text-xl" id={`feature-${index}-title`}>{feature.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">
            {feature.description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}

/**
 * Features Section Component
 * Displays key features of Walbucket SDK in a grid layout with 3D visualizations
 */
export function Features() {
  return (
    <Section
      id="features"
      variant="fadeInUp"
      className="py-24 md:py-32 bg-gradient-to-b from-muted/20 via-background to-background"
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
              Powerful Features
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build with decentralized media storage
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
