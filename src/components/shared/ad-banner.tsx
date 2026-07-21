import { AdskeeperWidget } from '@/components/ads/adskeeper-widget'

export function AdInContent({ className = '' }: { className?: string }) {
  return <AdskeeperWidget widgetId="2056707" className={`my-6 ${className}`} />
}

export function AdBanner({ className = '' }: { className?: string }) {
  return <AdskeeperWidget widgetId="2056709" className={className} />
}

export function AdSidebar({ className = '' }: { className?: string }) {
  return <AdskeeperWidget widgetId="2056711" className={className} minH={250} />
}