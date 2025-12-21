/**
 * Application configuration
 * Centralizes environment variable access
 */

export const config = {
  dappUrl: process.env.NEXT_PUBLIC_DAPP_URL || 'http://localhost:3000',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://walbucket.com',
} as const

