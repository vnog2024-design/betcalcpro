import { DynamicAd } from '@/components/ads/dynamic-ad'

/**
 * Re-export componentes de anúncio usando Adskeeper DynamicAd.
 * DynamicAd agora é um Server Component que renderiza apenas
 * um <div data-type="_mgwidget"> — o preloader do Adskeeper
 * escaneia o DOM e renderiza os anúncios automaticamente.
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