'use client'

import { useEffect, useRef } from 'react'

interface AdUnitProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'fluid'
  style?: React.CSSProperties
  className?: string
}

export function AdUnit({
  adSlot,
  adFormat = 'auto',
  style,
  className = '',
}: AdUnitProps) {
  const adRef = useRef<HTMLInsElement>(null)
  const isPushed = useRef(false)

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

  return (
    <div className={`ad-container flex justify-center items-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
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
      />
    </div>
  )
}
