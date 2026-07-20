'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Footer } from '@/components/layout/footer'
import { AnimatedBackground } from '@/components/shared/animated-background'
import { CookieConsent } from '@/components/shared/cookie-consent'
import { AgeGate } from '@/components/shared/age-gate'
import { DisclaimerBar } from '@/components/shared/disclaimer-bar'
import { Toaster } from '@/components/ui/toaster'
import { MgidWidget } from '@/components/ads/mgid-widget'
import { useAppStore } from '@/store/app-store'
import { useEffect } from 'react'

export function ToolPageLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, setSidebarOpen, colorTheme, theme } = useAppStore()

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
            {/* Ad — Header Banner */}
            <MgidWidget widgetId="2056714" className="mb-4" />
            {children}
            {/* Ad — Below content */}
            <MgidWidget widgetId="2056714" className="my-8" />
            {/* Mobile-only Widget */}
            <MgidWidget widgetId="2056714" className="mt-6 lg:hidden" />
          </div>
        </main>
      </div>
      <Footer />
      <CookieConsent />
      <Toaster />
    </div>
  )
}