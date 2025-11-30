'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createOceanGradientMaterial } from '@/lib/three-helpers'

interface FeatureVisualizationProps {
  type: 'storage' | 'encryption' | 'api' | 'gas' | 'url' | 'typescript'
  hovered?: boolean
}

/**
 * Storage: Stack of boxes
 */
function StorageVisualization({ hovered }: { hovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const material = createOceanGradientMaterial('#06b6d4', '#0ea5e9')

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      groupRef.current.rotation.y = hovered ? time * 0.5 : time * 0.2
      
      // Floating animation
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Bottom box */}
      <mesh position={[0, -0.3, 0]} scale={hovered ? 1.1 : 1}>
        <boxGeometry args={[0.6, 0.4, 0.6]} />
        <primitive object={material} attach="material" />
      </mesh>
      {/* Middle box */}
      <mesh position={[0, 0, 0]} scale={hovered ? 1.15 : 1}>
        <boxGeometry args={[0.5, 0.4, 0.5]} />
        <primitive object={material} attach="material" />
      </mesh>
      {/* Top box */}
      <mesh position={[0, 0.3, 0]} scale={hovered ? 1.2 : 1}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  )
}

/**
 * Encryption: Lock/shield
 */
function EncryptionVisualization({ hovered }: { hovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const material = createOceanGradientMaterial('#3b82f6', '#2563eb')

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      groupRef.current.rotation.y = hovered ? time * 0.3 : time * 0.1
      groupRef.current.position.y = Math.sin(time * 0.6) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Shield body */}
      <mesh position={[0, 0, 0]} scale={hovered ? 1.2 : 1}>
        <cylinderGeometry args={[0.3, 0.3, 0.5, 8]} />
        <primitive object={material} attach="material" />
      </mesh>
      {/* Lock shackle */}
      <mesh position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.05, 8, 16]} />
        <primitive object={material} attach="material" />
      </mesh>
      {/* Keyhole */}
      <mesh position={[0, -0.1, 0.31]}>
        <boxGeometry args={[0.1, 0.15, 0.05]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  )
}

/**
 * API: Network nodes
 */
function APIVisualization({ hovered }: { hovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const material = createOceanGradientMaterial('#8b5cf6', '#7c3aed')
  const nodePositions = [
    [0, 0, 0],
    [-0.3, 0.3, 0],
    [0.3, 0.3, 0],
    [-0.3, -0.3, 0],
    [0.3, -0.3, 0],
  ]

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      groupRef.current.rotation.y = hovered ? time * 0.4 : time * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={[pos[0], pos[1], pos[2]]} scale={hovered ? 1.3 : 1}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <primitive object={material} attach="material" />
        </mesh>
      ))}
      {/* Connections */}
      <lineSegments>
        <edgesGeometry
          args={[
            new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(-0.3, 0.3, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0.3, 0.3, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(-0.3, -0.3, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0.3, -0.3, 0),
            ]),
          ]}
        />
        <lineBasicMaterial color="#06b6d4" opacity={0.5} transparent />
      </lineSegments>
    </group>
  )
}

/**
 * Gas: Coins/tokens
 */
function GasVisualization({ hovered }: { hovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const material = createOceanGradientMaterial('#f59e0b', '#d97706')

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      groupRef.current.rotation.y = hovered ? time * 0.6 : time * 0.2
      
      // Floating coins
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          child.position.y = Math.sin(time * 0.7 + i) * 0.15
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Back coin */}
      <mesh position={[-0.15, 0, -0.1]} scale={hovered ? 1.1 : 0.9}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
        <primitive object={material} attach="material" />
      </mesh>
      {/* Middle coin */}
      <mesh position={[0, 0, 0]} scale={hovered ? 1.2 : 1}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
        <primitive object={material} attach="material" />
      </mesh>
      {/* Front coin */}
      <mesh position={[0.15, 0, 0.1]} scale={hovered ? 1.1 : 0.9}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  )
}

/**
 * URL: Cloud/globe
 */
function URLVisualization({ hovered }: { hovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const material = createOceanGradientMaterial('#ec4899', '#db2777')

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      groupRef.current.rotation.y = hovered ? time * 0.3 : time * 0.1
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Cloud shape */}
      <mesh position={[0, 0, 0]} scale={hovered ? 1.2 : 1}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh position={[-0.2, 0, 0]} scale={hovered ? 1.1 : 0.9}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh position={[0.2, 0, 0]} scale={hovered ? 1.1 : 0.9}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <primitive object={material} attach="material" />
      </mesh>
      {/* Arrow pointing up */}
      <mesh position={[0, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.08, 0.2, 8]} />
        <meshStandardMaterial color="#06b6d4" />
      </mesh>
    </group>
  )
}

/**
 * TypeScript: Code brackets
 */
function TypeScriptVisualization({ hovered }: { hovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const material = createOceanGradientMaterial('#f97316', '#ea580c')

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      groupRef.current.rotation.y = hovered ? time * 0.4 : time * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {/* Left bracket */}
      <mesh position={[-0.15, 0, 0]} scale={hovered ? 1.2 : 1}>
        <boxGeometry args={[0.08, 0.4, 0.08]} />
        <primitive object={material} attach="material" />
      </mesh>
      {/* Right bracket */}
      <mesh position={[0.15, 0, 0]} scale={hovered ? 1.2 : 1}>
        <boxGeometry args={[0.08, 0.4, 0.08]} />
        <primitive object={material} attach="material" />
      </mesh>
      {/* Middle T */}
      <mesh position={[0, 0, 0]} scale={hovered ? 1.15 : 1}>
        <boxGeometry args={[0.2, 0.08, 0.08]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh position={[0, -0.1, 0]} scale={hovered ? 1.1 : 1}>
        <boxGeometry args={[0.08, 0.15, 0.08]} />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  )
}

/**
 * Feature Visualization Component
 * Renders 3D icons for different features
 */
export function FeatureVisualization({ type, hovered = false }: FeatureVisualizationProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={0.8} />
      {type === 'storage' && <StorageVisualization hovered={hovered} />}
      {type === 'encryption' && <EncryptionVisualization hovered={hovered} />}
      {type === 'api' && <APIVisualization hovered={hovered} />}
      {type === 'gas' && <GasVisualization hovered={hovered} />}
      {type === 'url' && <URLVisualization hovered={hovered} />}
      {type === 'typescript' && <TypeScriptVisualization hovered={hovered} />}
    </>
  )
}
