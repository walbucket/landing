'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, MeshTransmissionMaterial, Float, Sparkles, Text3D } from '@react-three/drei'
import * as THREE from 'three'
import { createOceanGradientMaterial } from '@/lib/three-helpers'
import { getQualitySettings } from '@/lib/performance'

/**
 * Walrus-Inspired Bucket
 * Combines walrus features (tusks, flippers) with bucket storage design
 */
function WalrusBucket() {
  const groupRef = useRef<THREE.Group>(null)
  const bucketRef = useRef<THREE.Mesh>(null)
  const tuskRefs = useRef<THREE.Mesh[]>([])
  const flipperRefs = useRef<THREE.Mesh[]>([])

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      // Gentle floating motion (like walrus in water)
      groupRef.current.position.y = Math.sin(time * 0.4) * 0.3
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.1
    }
    
    if (bucketRef.current) {
      // Slow rotation
      bucketRef.current.rotation.y += 0.002
    }

    // Animate tusks (gentle swaying)
    tuskRefs.current.forEach((tusk, i) => {
      if (tusk) {
        const sway = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.1
        tusk.rotation.z = sway
      }
    })

    // Animate flippers (swimming motion)
    flipperRefs.current.forEach((flipper, i) => {
      if (flipper) {
        const swim = Math.sin(state.clock.elapsedTime * 0.8 + i * Math.PI) * 0.3
        flipper.rotation.x = swim
      }
    })
  })

  const bucketMaterial = createOceanGradientMaterial('#06b6d4', '#0ea5e9')
  const tuskMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#E0E0E0',
        emissive: '#FFFFFF',
        emissiveIntensity: 0.3,
        metalness: 0.9,
        roughness: 0.1,
      }),
    []
  )

  // Get quality settings for geometry complexity
  const quality = useMemo(() => getQualitySettings(), [])
  const segments = quality.geometrySegments

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef}>
        {/* Main Bucket Body - Walrus-shaped */}
        <mesh ref={bucketRef} position={[0, 0, 0]}>
          {/* Bucket shape with walrus body proportions - adaptive segments */}
          <cylinderGeometry args={[1.1, 0.95, 1.4, segments]} />
          <primitive object={bucketMaterial} attach="material" />
        </mesh>

        {/* Walrus Head/Neck (front of bucket) */}
        <mesh position={[0, 0.5, 0.8]} scale={[0.7, 0.6, 0.5]}>
          <sphereGeometry args={[0.6, segments / 2, segments / 2]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.2}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        {/* Walrus Tusks - Elegant curved tusks */}
        {[0, 1].map((i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) tuskRefs.current[i] = el
            }}
            position={[i === 0 ? -0.15 : 0.15, 0.3, 1.1]}
            rotation={[0, 0, i === 0 ? -0.3 : 0.3]}
          >
            <coneGeometry args={[0.08, 0.4, 8]} />
            <primitive object={tuskMaterial} attach="material" />
          </mesh>
        ))}

        {/* Walrus Flippers - Side flippers that look like handles */}
        {[0, 1].map((i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) flipperRefs.current[i] = el
            }}
            position={[i === 0 ? -1.15 : 1.15, 0, 0]}
            rotation={[0, 0, i === 0 ? Math.PI / 2 : -Math.PI / 2]}
            scale={[1, 1.5, 1]}
          >
            <boxGeometry args={[0.3, 0.5, 0.1]} />
            <meshStandardMaterial
              color="#0ea5e9"
              emissive="#0ea5e9"
              emissiveIntensity={0.4}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}

        {/* Inner Storage Core - Glowing energy inside */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.7, 0.6, 1.2, segments / 2]} />
          <meshStandardMaterial
            color="#00D9FF"
            emissive="#00D9FF"
            emissiveIntensity={0.6}
            transparent
            opacity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Storage Rings - Like bucket bands but with tech aesthetic */}
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            position={[0, -0.5 + i * 0.4, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <torusGeometry args={[1.05, 0.04, 8, segments / 2]} />
            <meshStandardMaterial
              color="#00D9FF"
              emissive="#00D9FF"
              emissiveIntensity={0.5}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        ))}

        {/* Top Rim - Bucket opening with walrus whiskers */}
        <mesh position={[0, 0.7, 0]}>
          <torusGeometry args={[1.15, 0.1, 8, segments / 2]} />
          <meshStandardMaterial
            color="#00D9FF"
            emissive="#00D9FF"
            emissiveIntensity={0.7}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Whiskers - Data flow indicators */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * 1.1,
                0.5,
                Math.sin(angle) * 1.1,
              ]}
              rotation={[0, angle, 0]}
            >
              <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
              <meshStandardMaterial
                color="#00D9FF"
                emissive="#00D9FF"
                emissiveIntensity={0.8}
                transparent
                opacity={0.7}
              />
            </mesh>
          )
        })}

        {/* Ocean Wave Effect - Around the bucket */}
        <mesh position={[0, -0.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.05, 8, segments]} />
          <meshStandardMaterial
            color="#00D9FF"
            emissive="#00D9FF"
            emissiveIntensity={0.4}
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
    </Float>
  )
}

/**
 * Ocean Data Particles
 * Files/data represented as water droplets/bubbles
 */
function OceanDataParticle({ 
  position, 
  speed = 1 
}: { 
  position: [number, number, number]
  speed?: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed
      // Flowing motion like water currents
      meshRef.current.position.x = position[0] + Math.cos(time) * 2.5
      meshRef.current.position.y = position[1] + Math.sin(time * 0.7) * 1.8
      meshRef.current.position.z = position[2] + Math.sin(time * 0.5) * 2.5
      
      // Gentle rotation
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.015
    }
  })

  const quality = useMemo(() => getQualitySettings(), [])
  const segments = Math.max(8, quality.geometrySegments / 4)

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.06, segments, segments]} />
      <meshStandardMaterial
        color="#00D9FF"
        emissive="#00D9FF"
        emissiveIntensity={1.2}
        metalness={0.8}
        roughness={0.1}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

/**
 * Decentralized Storage Network
 * Multiple walrus-buckets in a network formation
 */
function StorageNetwork() {
  const nodeCount = 5
  const nodes = useMemo(
    () =>
      Array.from({ length: nodeCount }, (_, i) => ({
        angle: (i / nodeCount) * Math.PI * 2,
        radius: 3 + Math.random() * 0.5,
        height: (Math.random() - 0.5) * 1.2,
        delay: i * 0.4,
        scale: 0.4 + Math.random() * 0.2,
      })),
    []
  )

  const groupRefs = useRef<(THREE.Group | null)[]>([])

  useFrame((state) => {
    nodes.forEach((node, i) => {
      const group = groupRefs.current[i]
      if (group) {
        const time = state.clock.elapsedTime + node.delay
        group.position.x = Math.cos(node.angle + time * 0.2) * node.radius
        group.position.z = Math.sin(node.angle + time * 0.2) * node.radius
        group.position.y = node.height + Math.sin(time * 0.4) * 0.4
      }
    })
  })

  return (
    <>
      {nodes.map((node, i) => (
        <group
          key={i}
          ref={(el) => {
            groupRefs.current[i] = el
          }}
          scale={node.scale}
        >
          {/* Mini walrus-bucket nodes */}
          <mesh>
            <cylinderGeometry args={[0.4, 0.35, 0.5, 32]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={0.3}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          
          {/* Connection to center */}
          <mesh position={[-node.radius * 0.4, 0, 0]}>
            <boxGeometry args={[node.radius * 0.8, 0.02, 0.02]} />
            <meshStandardMaterial
              color="#00D9FF"
              emissive="#00D9FF"
              emissiveIntensity={0.2}
              transparent
              opacity={0.25}
            />
          </mesh>
        </group>
      ))}
    </>
  )
}

/**
 * Ocean Floor Effect
 * Reflective surface with ripple/wave patterns
 */
function OceanFloor() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    // Wave animation handled by material distortion
    // Keeping geometry static for performance
  })

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2.8, 0]}
    >
      <planeGeometry args={[30, 30, 16, 16]} />
      <MeshTransmissionMaterial
        backside
        samples={8}
        resolution={256}
        transmission={0.85}
        thickness={0.6}
        roughness={0.15}
        chromaticAberration={0.03}
        anisotropy={0.15}
        distortion={0.15}
        distortionScale={0.15}
        temporalDistortion={0.15}
        color="#00D9FF"
      />
    </mesh>
  )
}

/**
 * Enhanced Hero 3D Scene
 * Walrus + Bucket = Walbucket: Decentralized Storage Visualization
 */
export function HeroScene() {
  const quality = useMemo(() => getQualitySettings(), [])
  const particleCount = Math.max(5, Math.floor(quality.particleCount / 10))
  const sparkleCount = quality.sparkleCount
  
  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 5,
        ] as [number, number, number],
        speed: 0.25 + Math.random() * 0.25,
      })),
    [particleCount]
  )

  return (
    <>
      {/* Ocean-Inspired Lighting */}
      <ambientLight intensity={0.35} color="#E0F2FE" />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#FFFFFF" />
      <directionalLight position={[-5, 5, -5]} intensity={0.6} color="#00D9FF" />
      <pointLight position={[0, 4, 0]} intensity={2.5} color="#00D9FF" />
      <pointLight position={[0, -2, 0]} intensity={1.2} color="#0ea5e9" />
      <pointLight position={[3, 2, 3]} intensity={0.8} color="#06b6d4" />
      <pointLight position={[-3, 2, -3]} intensity={0.8} color="#06b6d4" />

      {/* Ocean Environment */}
      <Environment preset="sunset" environmentIntensity={0.5} />

      {/* Ocean Floor with Waves */}
      <OceanFloor />

      {/* Sparkles - Like bubbles in water */}
      <Sparkles
        count={sparkleCount}
        scale={12}
        size={2.5}
        speed={0.5}
        color="#00D9FF"
        opacity={0.7}
      />

      {/* Central Walrus-Bucket */}
      <WalrusBucket />

      {/* Decentralized Storage Network */}
      <StorageNetwork />

      {/* Ocean Data Particles */}
      {particles.map((particle, i) => (
        <OceanDataParticle
          key={i}
          position={particle.position}
          speed={particle.speed}
        />
      ))}

      {/* Orbit Controls - Smooth ocean-like movement */}
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.06}
        minDistance={4.5}
        maxDistance={11}
        maxPolarAngle={Math.PI / 2.05}
        minPolarAngle={Math.PI / 3.8}
        autoRotate
        autoRotateSpeed={0.25}
        enableZoom={true}
        enablePan={false}
      />
    </>
  )
}
