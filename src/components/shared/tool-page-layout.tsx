'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Footer } from '@/components/layout/footer'
import { AnimatedBackground } from '@/components/shared/animated-background'
import { CookieConsent } from '@/components/shared/cookie-consent'
import { AgeGate } from '@/components/shared/age-gate'
import { DisclaimerBar } from '@/components/shared/disclaimer-bar'
import { AdBannerBottom } from '@/components/ads/ad-unit'
import { Toaster } from '@/components/ui/toaster'
import { useAppStore } from '@/store/app-store'
import { useEffect } from 'react'
import { useMounted } from '@/hooks/use-mounted'

export function ToolPageLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, setSidebarOpen, colorTheme, theme } = useAppStore()
  const mounted = useMounted()

  useEffect(() => {
    document.documentElement.setAttribute('data-color-theme', colorTheme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [colorTheme, theme])

  // Server renders a simple shell to prevent hydration mismatch.
  // Client immediately renders the full interactive content.
  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col bg-background grid-pattern relative">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 rounded-lg gradient-neon flex items-center justify-center animate-pulse">
              <span className="text-black font-bold text-sm">BC</span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

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
            {children}
            <AdBannerBottom className="mt-8" />
          </div>
        </main>
      </div>
      <Footer />
      <CookieConsent />
      <Toaster />
    </div>
  )
}
