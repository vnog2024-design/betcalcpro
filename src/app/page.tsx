'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Footer } from '@/components/layout/footer'
import { LandingPage } from '@/components/landing/landing-page'
import { AnimatedBackground } from '@/components/shared/animated-background'
import { CookieConsent } from '@/components/shared/cookie-consent'
import { PWAInstallPrompt } from '@/components/shared/pwa-install-prompt'
import { AgeGate } from '@/components/shared/age-gate'
import { DisclaimerBar } from '@/components/shared/disclaimer-bar'
import { Toaster } from '@/components/ui/toaster'
import { useAppStore } from '@/store/app-store'
import { useEffect } from 'react'
import { useMounted } from '@/hooks/use-mounted'

export default function Home() {
  const { sidebarOpen, setSidebarOpen, colorTheme, theme } = useAppStore()
  const mounted = useMounted()

  // Sync color theme to DOM
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
            <img
              src="/logo-icon.png"
              alt="BetCalc Pro"
              className="h-8 w-8 rounded-lg object-cover animate-pulse"
            />
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
            <LandingPage />
          </div>
        </main>
      </div>
      <Footer />
      <CookieConsent />
      <PWAInstallPrompt />
      <Toaster />
    </div>
  )
}
