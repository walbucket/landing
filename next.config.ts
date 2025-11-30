import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Transpile Three.js for Next.js compatibility
  transpilePackages: ['three'],
  
  // Optimize bundle size
  experimental: {
    optimizePackageImports: [
      '@react-three/fiber',
      '@react-three/drei',
      'lucide-react',
      'framer-motion',
    ],
  },
  
  // Compress output
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
