/**
 * SEO utilities for BetCalc Pro.
 * Centralized metadata generation for consistent SEO across all pages.
 */

import type { Metadata } from 'next'

const BASE_URL = 'https://betcalcpro.com.br'
const SITE_NAME = 'BetCalc Pro'
const OG_IMAGE = `${BASE_URL}/og-image.png`

interface ToolSeoConfig {
  title: string
  description: string
  path: string
  /** Category for SoftwareApplication schema */
  category?: string
}

/**
 * Generates complete Metadata object for a tool page.
 * Includes title, description, canonical, OG, and Twitter cards.
 */
export function generateToolMetadata(config: ToolSeoConfig) {
  const url = `${BASE_URL}${config.path}`
  return {
    title: config.title,
    description: config.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: OG_IMAGE,
          width: 1344,
          height: 768,
          alt: config.title,
        },
      ],
      type: 'website' as const,
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: config.title,
      description: config.description,
      images: [OG_IMAGE],
    },
  } satisfies Metadata
}

/**
 * Generates SoftwareApplication JSON-LD for a tool page.
 */
export function generateToolJsonLd(config: ToolSeoConfig) {
  const url = `${BASE_URL}${config.path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: config.title,
    url,
    description: config.description,
    applicationCategory: config.category || 'EducationalApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
    },
    isAccessibleForFree: true,
    inLanguage: 'pt-BR',
  }
}

/**
 * Generates BreadcrumbList JSON-LD.
 */
export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  const allItems = [
    { name: 'Início', url: BASE_URL },
    ...items,
  ]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generates WebPage JSON-LD for a specific page.
 */
export function generateWebPageJsonLd(config: {
  name: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: config.name,
    description: config.description,
    url: config.url,
    inLanguage: 'pt-BR',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: BASE_URL,
    },
  }
}
