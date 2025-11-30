/**
 * Performance monitoring and optimization utilities
 */

export interface PerformanceMetrics {
  fps: number
  frameTime: number
  isLowPerformance: boolean
}

/**
 * Detect if device is low-end based on hardware concurrency and memory
 */
export function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false

  const navigator = window.navigator as any
  
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4
  const isLowCores = cores < 4

  // Check device memory (if available)
  const memory = navigator.deviceMemory || 4
  const isLowMemory = memory < 4

  // Check connection (if available)
  const connection = (navigator as any).connection
  const isSlowConnection = connection && (
    connection.effectiveType === 'slow-2g' ||
    connection.effectiveType === '2g' ||
    connection.saveData === true
  )

  return isLowCores || isLowMemory || isSlowConnection
}

/**
 * Get optimal quality settings based on device
 */
export function getQualitySettings() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const isLowEnd = isLowEndDevice()

  return {
    // Geometry complexity
    geometrySegments: isLowEnd ? 16 : isMobile ? 32 : 64,
    
    // Rendering quality
    dpr: isLowEnd ? 1 : isMobile ? 1.5 : 2,
    antialias: !isLowEnd && !isMobile,
    
    // Particle counts
    particleCount: isLowEnd ? 50 : isMobile ? 100 : 200,
    sparkleCount: isLowEnd ? 20 : isMobile ? 40 : 60,
    
    // Lighting
    shadowMapSize: isLowEnd ? 512 : isMobile ? 1024 : 2048,
    shadowEnabled: !isLowEnd,
    
    // Post-processing
    enablePostProcessing: !isLowEnd,
    
    // Environment
    environmentIntensity: isLowEnd ? 0.3 : 0.5,
  }
}

/**
 * Monitor FPS and detect performance issues
 */
export function usePerformanceMonitor(callback?: (metrics: PerformanceMetrics) => void) {
  if (typeof window === 'undefined') {
    return { fps: 60, frameTime: 16.67, isLowPerformance: false }
  }

  let lastTime = performance.now()
  let frameCount = 0
  let fps = 60
  let frameTime = 16.67
  let isLowPerformance = false

  function measure() {
    frameCount++
    const currentTime = performance.now()
    const delta = currentTime - lastTime

    if (delta >= 1000) {
      fps = Math.round((frameCount * 1000) / delta)
      frameTime = delta / frameCount
      isLowPerformance = fps < 30

      if (callback) {
        callback({ fps, frameTime, isLowPerformance })
      }

      frameCount = 0
      lastTime = currentTime
    }

    requestAnimationFrame(measure)
  }

  requestAnimationFrame(measure)

  return { fps, frameTime, isLowPerformance }
}
