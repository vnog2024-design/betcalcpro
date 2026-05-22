'use client'

import { useEffect, useRef, useState } from 'react'

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
        data-ad-client="ca-pub-3765222786344373"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  )
}

export function AdBanner({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <AdUnit
        adSlot="0000000000"
        adFormat="horizontal"
        style={{ display: 'block', minHeight: '90px' }}
        label="Anúncio"
      />
    </div>
  )
}

export function AdSidebar({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <AdUnit
        adSlot="0000000000"
        adFormat="vertical"
        style={{ display: 'block', minHeight: '250px', width: '300px' }}
        label="Anúncio"
      />
    </div>
  )
}

export function AdInFeed({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <AdUnit
        adSlot="0000000000"
        adFormat="fluid"
        style={{ display: 'block' }}
        label="Anúncio"
      />
    </div>
  )
}

export function AdInArticle({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <AdUnit
        adSlot="0000000000"
        adFormat="fluid"
        style={{ display: 'block', textAlign: 'center' }}
        label="Anúncio"
      />
    </div>
  )
}
