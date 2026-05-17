'use client'

// AdSense banner component — insert your publisher ID and slot IDs when ready
export function AdBanner({ slot, className = '' }: { slot: string; className?: string }) {
  return (
    <div className={`ad-container ${className}`}>
      <div 
        className="ad-slot min-h-[90px] flex items-center justify-center rounded-lg border border-border/30 bg-muted/10"
        data-ad-slot={slot}
        data-ad-format="horizontal"
      >
        {/* 
          AdSense code will be inserted here when approved.
          Replace with:
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXX"
            data-ad-slot="XXXXXXX"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        */}
        <span className="text-xs text-muted-foreground/40">Anúncio</span>
      </div>
    </div>
  )
}

// In-content ad — placed between sections for higher RPM
export function AdInContent({ className = '' }: { className?: string }) {
  return (
    <div className={`ad-container my-6 ${className}`}>
      <div 
        className="ad-slot min-h-[250px] flex items-center justify-center rounded-lg border border-border/30 bg-muted/10"
        data-ad-format="fluid"
      >
        <span className="text-xs text-muted-foreground/40">Anúncio</span>
      </div>
    </div>
  )
}

// Sidebar ad — vertical format
export function AdSidebar({ className = '' }: { className?: string }) {
  return (
    <div className={`ad-container ${className}`}>
      <div 
        className="ad-slot min-h-[600px] flex items-center justify-center rounded-lg border border-border/30 bg-muted/10"
        data-ad-format="vertical"
      >
        <span className="text-xs text-muted-foreground/40">Anúncio</span>
      </div>
    </div>
  )
}
