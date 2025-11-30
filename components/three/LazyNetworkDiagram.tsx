'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

interface NetworkDiagramProps {
  activeConnection?: string | null
  onNodeClick?: (nodeId: string) => void
  animated?: boolean
}

// Lazy load NetworkDiagram to reduce initial bundle size
const NetworkDiagram = dynamic(
  () => import('./NetworkDiagram').then((mod) => ({ default: mod.NetworkDiagram })),
  {
    ssr: false,
    loading: () => (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#8B5CF6" />
      </mesh>
    ),
  }
)

export function LazyNetworkDiagram(props: NetworkDiagramProps) {
  return (
    <Suspense fallback={
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#8B5CF6" />
      </mesh>
    }>
      <NetworkDiagram {...props} />
    </Suspense>
  )
}
