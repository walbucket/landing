'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { Section } from '@/components/sections/Section'
import { Card, CardContent } from '@/components/ui/card'
import { SceneCanvas } from '@/components/three/Canvas'
import { Particles } from '@/components/three/Particles'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/transitions'

interface Stat {
  value: number
  label: string
  suffix?: string
  description: string
}

const stats: Stat[] = [
  {
    value: 100,
    label: 'Uptime',
    suffix: '%',
    description: 'Decentralized reliability',
  },
  {
    value: 0,
    label: 'Vendor Lock-in',
    suffix: '%',
    description: 'True ownership',
  },
  {
    value: 1000,
    label: 'Files',
    suffix: '+',
    description: 'Supported formats',
  },
  {
    value: 24,
    label: 'Support',
    suffix: '/7',
    description: 'Community-driven',
  },
]

/**
 * Animated counter component
 */
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString() + suffix
      }
    })
  }, [springValue, suffix])

  return <span ref={ref}>0{suffix}</span>
}

/**
 * Stats/Social Proof Section
 * Display metrics with animated counters and particle effects
 */
export function Stats() {
  return (
    <Section
      id="stats"
      variant="fadeInUp"
      className="relative py-20 overflow-hidden bg-gradient-to-b from-muted/20 via-background to-muted/20"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 z-0 opacity-30">
        <SceneCanvas className="w-full h-full">
          <Particles count={200} speed={0.2} />
        </SceneCanvas>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent" id="stats-heading">
            Built for Developers
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by developers building the future of decentralized applications
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          role="list"
          aria-labelledby="stats-heading"
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.label} variants={staggerItem} role="listitem">
              <Card className="text-center hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent" aria-label={`${stat.value}${stat.suffix} ${stat.label}`}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-lg font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
