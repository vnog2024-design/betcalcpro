'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/app-store'

const CONSENT_KEY = 'cookie-consent'

interface ConsentData {
  accepted: boolean
  timestamp: number
}

function getStoredConsent(): ConsentData | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ConsentData
  } catch {
    return null
  }
}

function storeConsent(accepted: boolean): void {
  const data: ConsentData = { accepted, timestamp: Date.now() }
  localStorage.setItem(CONSENT_KEY, JSON.stringify(data))
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const initializedRef = useRef(false)
  const setCurrentPage = useAppStore((s) => s.setCurrentPage)

  // Check localStorage on mount — only show if no prior consent
  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    const consent = getStoredConsent()
    if (!consent) {
      // Small delay so the slide-up animation is visible
      const timer = setTimeout(() => {
        setVisible(true)
      }, 300)
      return () => clearTimeout(timer)
    }
    // Consent already given — no need to show banner
  }, [])

  const handleAcceptAll = useCallback(() => {
    storeConsent(true)
    setVisible(false)
  }, [])

  const handleEssentialOnly = useCallback(() => {
    storeConsent(false)
    setVisible(false)
  }, [])

  const handlePolicyClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setCurrentPage('cookies')
    },
    [setCurrentPage]
  )

  // Don't render anything if consent already given or not yet visible
  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up p-4 sm:p-6">
      <div
        className="relative mx-auto max-w-4xl rounded-xl border border-border/60 border-t-2 border-t-[#00ff88]/40 bg-card/90 backdrop-blur-xl shadow-2xl shadow-black/40"
        role="dialog"
        aria-label="Consentimento de cookies"
      >
        {/* Subtle neon accent line at top */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/50 to-transparent" />

        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
          {/* Text section */}
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-lg" role="img" aria-hidden="true">
                🍪
              </span>
              <h3 className="text-sm font-semibold text-foreground">
                Política de Cookies
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Utilizamos cookies para melhorar sua experiência, analisar o tráfego e exibir
              anúncios personalizados do Google AdSense. Ao continuar, você concorda com nossa{' '}
              <button
                type="button"
                onClick={handlePolicyClick}
                className="inline font-medium text-[#00ff88] underline underline-offset-2 transition-colors hover:text-[#00ff88]/80"
              >
                Política de Cookies
              </button>
              .
            </p>
          </div>

          {/* Buttons section */}
          <div className="flex flex-col gap-2 sm:flex-shrink-0 sm:flex-row sm:items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEssentialOnly}
              className="border-border/60 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            >
              Apenas cookies essenciais
            </Button>
            <Button
              size="sm"
              onClick={handleAcceptAll}
              className="bg-[#00ff88] font-semibold text-[#0a0e17] shadow-md shadow-[#00ff88]/20 hover:bg-[#00ff88]/90"
            >
              Aceitar todos os cookies
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
