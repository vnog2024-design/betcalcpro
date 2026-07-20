'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Footer } from '@/components/layout/footer'
import { AnimatedBackground } from '@/components/shared/animated-background'
import { CookieConsent } from '@/components/shared/cookie-consent'
import { AgeGate } from '@/components/shared/age-gate'
import { DisclaimerBar } from '@/components/shared/disclaimer-bar'
import { Toaster } from '@/components/ui/toaster'
import { ShareButtons } from '@/components/shared/share-buttons'
import { useAppStore } from '@/store/app-store'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const MGID_WIDGET_ID = '2056714'

export function ToolPageLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, setSidebarOpen, colorTheme, theme } = useAppStore()
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.setAttribute('data-color-theme', colorTheme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [colorTheme, theme])

  return (
    <div className="min-h-screen flex flex-col bg-background grid-pattern relative">
      <AnimatedBackground />
      <AgeGate />
      <DisclaimerBar />
      <Header />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-h-0 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-end mb-2">
              <ShareButtons
                url={typeof window !== 'undefined' ? window.location.href : ''}
                title=""
                variant="compact"
              />
            </div>
            {/* Ad — Header Banner */}
            <div className="mgid-ad-container mb-4" style={{ minHeight: 90 }}>
              <div data-type="_mgwidget" data-widget-id={MGID_WIDGET_ID} />
            </div>
            {children}
            {/* Ad — Below content */}
            <div className="mgid-ad-container my-8" style={{ minHeight: 90 }}>
              <div data-type="_mgwidget" data-widget-id={MGID_WIDGET_ID} />
            </div>
            {/* Mobile-only Widget */}
            <div className="mgid-ad-container mt-6 lg:hidden" style={{ minHeight: 90 }}>
              <div data-type="_mgwidget" data-widget-id={MGID_WIDGET_ID} />
            </div>
          </div>
        </main>
      </div>
      <Footer />
      <CookieConsent />
      <Toaster />
    </div>
  )
}