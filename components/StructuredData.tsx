/**
 * Structured Data (JSON-LD) Component
 * Provides schema.org structured data for SEO
 */

import { config } from '@/lib/config'

export function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Walbucket',
    description: 'Decentralized media storage for developers on Sui blockchain',
    url: config.siteUrl,
    logo: `${config.siteUrl}/logo.png`,
    sameAs: [
      'https://github.com/walbucket',
      'https://www.npmjs.com/package/@walbucket/sdk',
    ],
  }

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Walbucket SDK',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    description: 'Cloudinary-like API for decentralized media storage on Sui blockchain',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Walbucket',
    url: config.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${config.siteUrl}/docs?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
