/**
 * Three.js utility functions and helpers
 */

import * as THREE from 'three'

/**
 * Create a gradient material with ocean theme colors
 */
export function createOceanGradientMaterial(
  color1: string = '#0ea5e9',
  color2: string = '#06b6d4'
): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: color1,
    metalness: 0.8,
    roughness: 0.2,
    emissive: color2,
    emissiveIntensity: 0.3,
  })
}

/**
 * Create a particle system geometry
 */
export function createParticleGeometry(count: number): THREE.BufferGeometry {
  const positions = new Float32Array(count * 3)
  const velocities = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 10
    positions[i3 + 1] = (Math.random() - 0.5) * 10
    positions[i3 + 2] = (Math.random() - 0.5) * 10

    velocities[i3] = (Math.random() - 0.5) * 0.02
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.02
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.02
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3))

  return geometry
}

/**
 * Convert bytes to string (for Sui object data)
 */
export function bytesToString(bytes: number[] | Uint8Array): string {
  if (Array.isArray(bytes)) {
    return String.fromCharCode(...bytes)
  }
  return String.fromCharCode(...Array.from(bytes))
}

/**
 * Create a glow effect material
 */
export function createGlowMaterial(
  color: string = '#06b6d4',
  intensity: number = 0.5
): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: intensity,
    transparent: true,
    opacity: 0.8,
  })
}

/**
 * Calculate distance between two 3D points
 */
export function distance3D(
  p1: THREE.Vector3,
  p2: THREE.Vector3
): number {
  return p1.distanceTo(p2)
}

/**
 * Lerp (linear interpolation) between two values
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Map a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}
