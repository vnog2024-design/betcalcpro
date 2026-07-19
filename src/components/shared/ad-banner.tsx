'use client'

import { DynamicAd } from '@/components/ads/dynamic-ad'

/**
 * Re-export componentes de anúncio usando Adskeeper DynamicAd.
 * Antes usava AdSense (ad-unit.tsx) que retornava null.
 * Agora todos os imports existentes de AdInContent e AdBanner
 * automaticamente renderizam anúncios Adskeeper.
 */

export function AdInContent({ className = '' }: { className?: string }) {
  return <DynamicAd position="in_content" className={`my-6 ${className}`} minH={90} />
}

export function AdBanner({ className = '' }: { className?: string }) {
  return <DynamicAd position="banner_bottom" className={className} minH={90} />
}

export function AdSidebar({ className = '' }: { className?: string }) {
  return <DynamicAd position="sidebar_ad" className={className} minH={250} />
}