'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createParticleGeometry } from '@/lib/three-helpers'

interface ParticlesProps {
  count?: number
  speed?: number
  color?: string
  size?: number
}

/**
 * Particles Component
 * Creates an animated particle system with ocean theme colors
 */
export function Particles({
  count = 500,
  speed = 0.5,
  color = '#06b6d4',
  size = 0.02,
}: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)

  // Create particle geometry
  const geometry = useMemo(() => {
    const geom = createParticleGeometry(count)
    return geom
  }, [count])

  // Animate particles
  useFrame((state) => {
    if (pointsRef.current && geometry) {
      const positions = geometry.attributes.position.array as Float32Array
      const velocities = geometry.attributes.velocity.array as Float32Array
      const time = state.clock.elapsedTime

      for (let i = 0; i < count; i++) {
        const i3 = i * 3

        // Update position based on velocity
        positions[i3] += velocities[i3] * speed
        positions[i3 + 1] += velocities[i3 + 1] * speed
        positions[i3 + 2] += velocities[i3 + 2] * speed

        // Add gentle wave motion
        positions[i3 + 1] += Math.sin(time + positions[i3] * 0.1) * 0.001

        // Wrap around boundaries
        if (Math.abs(positions[i3]) > 10) {
          positions[i3] = (Math.random() - 0.5) * 10
        }
        if (Math.abs(positions[i3 + 1]) > 10) {
          positions[i3 + 1] = (Math.random() - 0.5) * 10
        }
        if (Math.abs(positions[i3 + 2]) > 10) {
          positions[i3 + 2] = (Math.random() - 0.5) * 10
        }
      }

      geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <primitive object={geometry} attach="geometry" />
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
