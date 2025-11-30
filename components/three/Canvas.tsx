'use client'

import { Canvas as R3FCanvas } from '@react-three/fiber'
import { Suspense, ReactNode, useMemo } from 'react'
import { getQualitySettings } from '@/lib/performance'

interface SceneCanvasProps {
  children: ReactNode
  className?: string
  camera?: {
    position?: [number, number, number]
    fov?: number
  }
  performance?: {
    min?: number
    max?: number
  }
  dpr?: number | [number, number]
  quality?: 'low' | 'medium' | 'high' | 'auto'
}

/**
 * Three.js Canvas wrapper component
 * 
 * Provides a reusable canvas wrapper with performance optimizations,
 * Suspense boundaries, and mobile-friendly defaults.
 * 
 * @example
 * ```tsx
 * <SceneCanvas>
 *   <HeroScene />
 * </SceneCanvas>
 * ```
 */
export function SceneCanvas({
  children,
  className,
  camera = { position: [0, 0, 5], fov: 75 },
  performance = { min: 0.5 },
  dpr,
  quality = 'auto',
}: SceneCanvasProps) {
  // Get quality settings based on device
  const qualitySettings = useMemo(() => {
    if (quality !== 'auto') {
      const settings = {
        low: { dpr: 1, antialias: false, min: 0.25 },
        medium: { dpr: 1.5, antialias: true, min: 0.5 },
        high: { dpr: 2, antialias: true, min: 0.75 },
      }
      return settings[quality]
    }
    const settings = getQualitySettings()
    return {
      dpr: settings.dpr,
      antialias: settings.antialias,
      min: performance.min || 0.5,
    }
  }, [quality, performance.min])

  const devicePixelRatio = dpr ?? qualitySettings.dpr

  return (
    <div className={className}>
      <R3FCanvas
        camera={{
          position: camera.position || [0, 0, 5],
          fov: camera.fov || 75,
        }}
        gl={{
          antialias: qualitySettings.antialias,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false, // Better performance
        }}
        dpr={devicePixelRatio}
        performance={{ min: qualitySettings.min, max: 1 }}
        className="w-full h-full"
        frameloop="always"
      >
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#06b6d4" />
            </mesh>
          }
        >
          {children}
        </Suspense>
      </R3FCanvas>
    </div>
  )
}
