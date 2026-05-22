'use client'

import { useEffect, useRef, useState } from 'react'
import { AD_CLIENT, AD_SLOTS } from './ad-config'

interface AdUnitProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'fluid'
  style?: React.CSSProperties
  className?: string
  label?: string
}

export function AdUnit({
  adSlot,
  adFormat = 'auto',
  style,
  className = '',
  label = 'Anúncio',
}: AdUnitProps) {
  const adRef = useRef<HTMLInsElement>(null)
  const isPushed = useRef(false)
  const [adLoaded, setAdLoaded] = useState(false)

  useEffect(() => {
    if (isPushed.current) return
    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense script
      const adsbygoogle = window.adsbygoogle || []
      adsbygoogle.push({})
      isPushed.current = true
    } catch (e) {
      console.warn('AdSense push error:', e)
    }
  }, [])

  // Check if ad has loaded after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (adRef.current) {
        const ins = adRef.current
        // If the ins element has children or a data attribute set by AdSense, ad loaded
        if (ins.childNodes.length > 0 || ins.getAttribute('data-ad-status') === 'filled') {
          setAdLoaded(true)
        }
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Show placeholder when ad hasn't loaded (pre-approval or placeholder slot)
  const showPlaceholder = !adLoaded

  return (
    <div className={`ad-container flex justify-center items-center ${className}`}>
      {showPlaceholder && (
        <div className="w-full rounded-lg border border-dashed border-border/40 bg-muted/10 flex items-center justify-center py-4 relative">
          <span className="text-xs text-muted-foreground/40 uppercase tracking-widest font-medium">{label}</span>
        </div>
      )}
      <ins
        ref={adRef}
        className={`adsbygoogle ${adLoaded ? '' : 'absolute opacity-0 pointer-events-none'}`}
        style={style || { display: 'block', minHeight: '90px' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  )
}

// ── Componentes de conveniência com slots centralizados ──

export function AdBannerTop({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <AdUnit adSlot={AD_SLOTS.BANNER_TOP} adFormat="horizontal" style={{ display: 'block', minHeight: '90px' }} label="Anúncio" />
    </div>
  )
}

export function AdBannerMiddle({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <AdUnit adSlot={AD_SLOTS.BANNER_MIDDLE} adFormat="horizontal" style={{ display: 'block', minHeight: '90px' }} label="Anúncio" />
    </div>
  )
}

export function AdBannerBottom({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <AdUnit adSlot={AD_SLOTS.BANNER_BOTTOM} adFormat="horizontal" style={{ display: 'block', minHeight: '90px' }} label="Anúncio" />
    </div>
  )
}

export function AdInContent({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full my-6 ${className}`}>
      <AdUnit adSlot={AD_SLOTS.IN_CONTENT} adFormat="fluid" style={{ display: 'block' }} label="Anúncio" />
    </div>
  )
}

export function AdInArticle({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <AdUnit adSlot={AD_SLOTS.IN_ARTICLE} adFormat="fluid" style={{ display: 'block', textAlign: 'center' }} label="Anúncio" />
    </div>
  )
}

export function AdSidebar({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <AdUnit adSlot={AD_SLOTS.SIDEBAR} adFormat="vertical" style={{ display: 'block', minHeight: '250px', width: '300px' }} label="Anúncio" />
    </div>
  )
}

export function AdInFeed({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <AdUnit adSlot={AD_SLOTS.IN_FEED} adFormat="fluid" style={{ display: 'block' }} label="Anúncio" />
    </div>
  )
}

// Legacy aliases (kept for backward compatibility with existing imports)
export function AdBanner({ className = '' }: { className?: string }) {
  return <AdBannerBottom className={className} />
}
