import { AdskeeperWidget } from '@/components/ads/adskeeper-widget'

export function AdInContent({ className = '' }: { className?: string }) {
  return <AdskeeperWidget widgetId="2056707" className={`my-6 ${className}`} />
}

/** Header/banner — above the fold, no lazy loading */
export function AdBanner({ className = '' }: { className?: string }) {
  return <AdskeeperWidget widgetId="2056709" className={className} lazy={false} />
}

export function AdSidebar({ className = '' }: { className?: string }) {
  return <AdskeeperWidget widgetId="2056711" className={className} minH={250} />
}