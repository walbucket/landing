'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Download, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/sections/Section'
import { SceneCanvas } from '@/components/three/Canvas'
import { LazyHeroScene } from '@/components/three/LazyHeroScene'
import { Particles } from '@/components/three/Particles'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/transitions'

/**
 * Hero Section Component
 * Main landing section with headline, 3D scene, and CTAs
 */
export function Hero() {
  return (
    <Section
      id="hero"
      variant="fadeInUp"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/20"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 z-0">
        <SceneCanvas className="w-full h-full">
          <Particles count={300} speed={0.3} />
        </SceneCanvas>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6 text-center lg:text-left"
          >
            <motion.div variants={staggerItem} className="w-full">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent block">
                  Decentralized Media Storage
                </span>
                <span className="text-foreground block">for Developers</span>
              </motion.h1>
            </motion.div>

            <motion.p
              variants={staggerItem}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 w-full"
            >
              Cloudinary-like API for decentralized media storage on Sui blockchain.
              Built-in encryption, flexible gas strategies, and seamless integration.
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              role="group"
              aria-label="Call to action buttons"
            >
              <Button asChild size="lg" className="group">
                <Link href="/docs" aria-label="Get started with Walbucket documentation">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group">
                <Link 
                  href="https://www.npmjs.com/package/@walbucket/sdk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Install Walbucket SDK from npm (opens in new tab)"
                >
                  <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                  Install SDK
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="group">
                <Link href="/docs" aria-label="View documentation">
                  <BookOpen className="mr-2 h-4 w-4" aria-hidden="true" />
                  Documentation
                </Link>
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-cyan-500">100%</div>
                <div className="text-sm text-muted-foreground">Decentralized</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-cyan-500">Built-in</div>
                <div className="text-sm text-muted-foreground">Encryption</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-cyan-500">Sui</div>
                <div className="text-sm text-muted-foreground">Blockchain</div>
              </div>
            </motion.div>
          </motion.div>

          {/* 3D Scene */}
          <motion.div
            className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full min-w-0 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            aria-label="3D visualization of Walbucket decentralized storage"
            role="img"
            style={{ contain: 'layout style paint' }}
          >
            <div className="w-full h-full" style={{ minHeight: '400px' }}>
              <SceneCanvas className="w-full h-full">
                <LazyHeroScene />
                <Particles count={200} speed={0.2} />
              </SceneCanvas>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        aria-label="Scroll down indicator"
        role="presentation"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-foreground/40 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </Section>
  )
}
