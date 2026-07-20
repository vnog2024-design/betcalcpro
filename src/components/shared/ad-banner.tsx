import { DynamicAd } from '@/components/ads/dynamic-ad'

/**
 * Facade components — mapeiam para posições MGID-compatible.
 * Cada uma usa um slot diferente configurável no painel admin.
 */

export function AdInContent({ className = '' }: { className?: string }) {
  return <DynamicAd position="standard_block" className={`my-6 ${className}`} minH={90} />
}

export function AdBanner({ className = '' }: { className?: string }) {
  return <DynamicAd position="standard_block" className={className} minH={90} />
}

export function AdSidebar({ className = '' }: { className?: string }) {
  return <DynamicAd position="sidebar" className={className} minH={250} />
}