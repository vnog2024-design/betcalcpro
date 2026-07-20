import { MgidWidget } from '@/components/ads/mgid-widget'

/**
 * Facade components — mapeiam para posições MGID.
 * Cada uma usa um widget ID fixo (configurável via admin).
 */

export function AdInContent({ className = '' }: { className?: string }) {
  return <MgidWidget widgetId="2056714" className={`my-6 ${className}`} />
}

export function AdBanner({ className = '' }: { className?: string }) {
  return <MgidWidget widgetId="2056714" className={className} />
}

export function AdSidebar({ className = '' }: { className?: string }) {
  return <MgidWidget widgetId="2056714" className={className} minH={250} />
}