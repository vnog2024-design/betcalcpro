'use client'

import { AdUnit } from '@/components/ads/ad-unit'

// Horizontal banner ad — top/bottom of pages
export function AdBanner({ className = '' }: { slot?: string; className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <AdUnit
        adSlot="0000000000"
        adFormat="horizontal"
        style={{ display: 'block', minHeight: '90px' }}
      />
    </div>
  )
}

// In-content ad — placed between sections for higher RPM
export function AdInContent({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full my-6 ${className}`}>
      <AdUnit
        adSlot="0000000000"
        adFormat="fluid"
        style={{ display: 'block' }}
      />
    </div>
  )
}

// Sidebar ad — vertical format
export function AdSidebar({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <AdUnit
        adSlot="0000000000"
        adFormat="vertical"
        style={{ display: 'block', minHeight: '250px', width: '300px' }}
      />
    </div>
  )
}
