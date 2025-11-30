'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'
import { sectionTransition } from '@/lib/transitions'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  variant?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn'
}

/**
 * Reusable section component with smooth scroll animations
 * 
 * @example
 * ```tsx
 * <Section id="hero" variant="fadeInUp">
 *   <h1>Hero Content</h1>
 * </Section>
 * ```
 */
export function Section({ children, className, id, variant = 'fadeInUp' }: SectionProps) {
  const variants: Record<NonNullable<SectionProps['variant']>, Variants> = {
    fadeInUp: sectionTransition.variants,
    fadeInDown: {
      hidden: { opacity: 0, y: -60 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -60 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 60 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    },
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: '-100px',
      }}
      variants={variants[variant]}
      aria-label={id ? `${id} section` : undefined}
    >
      {children}
    </motion.section>
  )
}
