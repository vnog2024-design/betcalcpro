'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Footer } from '@/components/layout/footer'
import { LandingPage } from '@/components/landing/landing-page'
import { AnimatedBackground } from '@/components/shared/animated-background'
import { CookieConsent } from '@/components/shared/cookie-consent'
import { AgeGate } from '@/components/shared/age-gate'
import { DisclaimerBar } from '@/components/shared/disclaimer-bar'
import { Toaster } from '@/components/ui/toaster'
import { useAppStore } from '@/store/app-store'
import { useEffect } from 'react'

export default function Home() {
  const { sidebarOpen, setSidebarOpen, colorTheme, theme } = useAppStore()

  // Sync color theme to DOM
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
            <LandingPage />
          </div>
        </main>
      </div>
      <Footer />
      <CookieConsent />
      <Toaster />
    </div>
  )
}
