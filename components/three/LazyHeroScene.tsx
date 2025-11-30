'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load HeroScene to reduce initial bundle size
const HeroScene = dynamic(
  () => import('./HeroScene').then((mod) => ({ default: mod.HeroScene })),
  {
    ssr: false,
    loading: () => (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#06b6d4" />
      </mesh>
    ),
  }
)

export function LazyHeroScene() {
  return (
    <Suspense fallback={
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#06b6d4" />
      </mesh>
    }>
      <HeroScene />
    </Suspense>
  )
}
