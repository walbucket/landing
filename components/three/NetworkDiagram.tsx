'use client'

import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Sphere, Line, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { getQualitySettings } from '@/lib/performance'

interface Node {
  id: string
  name: string
  position: [number, number, number]
  color: string
  size: number
}

interface Connection {
  from: string
  to: string
  active?: boolean
}

interface NetworkDiagramProps {
  activeConnection?: string | null
  onNodeClick?: (nodeId: string) => void
  animated?: boolean
}

const nodes: Node[] = [
  {
    id: 'sui',
    name: 'Sui',
    position: [0, 2, 0],
    color: '#00D9FF',
    size: 0.8,
  },
  {
    id: 'walrus',
    name: 'Walrus',
    position: [-2, 0, 0],
    color: '#4ADE80',
    size: 0.6,
  },
  {
    id: 'seal',
    name: 'Seal',
    position: [2, 0, 0],
    color: '#F59E0B',
    size: 0.6,
  },
  {
    id: 'walbucket',
    name: 'Walbucket',
    position: [0, -1.5, 0],
    color: '#8B5CF6',
    size: 0.7,
  },
]

const connections: Connection[] = [
  { from: 'walbucket', to: 'sui' },
  { from: 'walbucket', to: 'walrus' },
  { from: 'walbucket', to: 'seal' },
  { from: 'sui', to: 'walrus' },
  { from: 'sui', to: 'seal' },
]

/**
 * Animated connection line between nodes
 */
function ConnectionLine({
  from,
  to,
  active = false,
}: {
  from: Node
  to: Node
  active?: boolean
}) {
  const [points] = useState(() => {
    const start = new THREE.Vector3(...from.position)
    const end = new THREE.Vector3(...to.position)
    return [start, end]
  })

  // Calculate opacity based on active state and time
  const opacity = active ? 0.8 : 0.3

  return (
    <Line
      points={points}
      color={active ? '#00D9FF' : '#4B5563'}
      lineWidth={active ? 3 : 1}
      opacity={opacity}
      transparent
    />
  )
}

/**
 * Network node component
 */
function NetworkNode({
  node,
  isActive,
  onClick,
}: {
  node: Node
  isActive: boolean
  onClick?: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = node.position[1] + Math.sin(state.clock.getElapsedTime() + node.position[0]) * 0.1
      
      // Rotation
      meshRef.current.rotation.y += 0.01
    }
  })

  const scale = isActive || hovered ? 1.2 : 1

  return (
    <group position={node.position}>
      {/* Connection glow effect when active */}
      {isActive && (
        <Sphere args={[node.size * 1.5, 16, 16]}>
          <meshStandardMaterial
            color={node.color}
            transparent
            opacity={0.2}
            emissive={node.color}
            emissiveIntensity={0.5}
          />
        </Sphere>
      )}

      {/* Main node sphere */}
      <mesh
        ref={meshRef}
        scale={scale}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={onClick}
      >
        <sphereGeometry args={[node.size, 16, 16]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={isActive ? 0.5 : hovered ? 0.3 : 0.1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Node label */}
      <Text
        position={[0, node.size + 0.5, 0]}
        fontSize={0.3}
        color={isActive ? node.color : '#9CA3AF'}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {node.name}
      </Text>
    </group>
  )
}

/**
 * File icon moving along connection
 */
function FileIcon({
  from,
  to,
  progress,
}: {
  from: Node
  to: Node
  progress: number
}) {
  const position = useMemo(() => {
    const start = new THREE.Vector3(...from.position)
    const end = new THREE.Vector3(...to.position)
    return start.lerp(end, progress)
  }, [from, to, progress])

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.2, 0.2, 0.1]} />
        <meshStandardMaterial
          color="#60A5FA"
          emissive="#60A5FA"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
}

/**
 * Network Diagram 3D Visualization
 * Shows Sui, Walrus, Seal, and Walbucket nodes with animated connections
 */
export function NetworkDiagram({
  activeConnection = null,
  onNodeClick,
  animated = true,
}: NetworkDiagramProps) {
  const [fileProgress, setFileProgress] = useState(0)
  const activeConn = useMemo(() => {
    if (!activeConnection) return null
    return connections.find(
      (c) => c.from === activeConnection || c.to === activeConnection
    )
  }, [activeConnection])

  useFrame((state) => {
    if (animated && activeConn) {
      // Animate file movement along active connection
      setFileProgress((Math.sin(state.clock.getElapsedTime() * 0.5) + 1) / 2)
    }
  })

  const fromNode = activeConn
    ? nodes.find((n) => n.id === activeConn.from)
    : null
  const toNode = activeConn
    ? nodes.find((n) => n.id === activeConn.to)
    : null

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#00D9FF" />

      {/* Connections */}
      {connections.map((conn, index) => {
        const from = nodes.find((n) => n.id === conn.from)!
        const to = nodes.find((n) => n.id === conn.to)!
        const isActive =
          activeConnection === conn.from || activeConnection === conn.to

        return (
          <ConnectionLine
            key={`${conn.from}-${conn.to}-${index}`}
            from={from}
            to={to}
            active={isActive}
          />
        )
      })}

      {/* File icon animation */}
      {fromNode && toNode && activeConn && (
        <FileIcon from={fromNode} to={toNode} progress={fileProgress} />
      )}

      {/* Nodes */}
      {nodes.map((node) => {
        const isActive = activeConnection === node.id
        return (
          <NetworkNode
            key={node.id}
            node={node}
            isActive={isActive}
            onClick={() => onNodeClick?.(node.id)}
          />
        )
      })}
    </>
  )
}
