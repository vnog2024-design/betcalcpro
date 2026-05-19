'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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

  // Update Google Consent Mode
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    if (accepted) {
      ;(window as any).gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      })
    }
    // If not accepted, consent remains denied (set in layout.tsx default)
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    const consent = getStoredConsent()
    if (!consent) {
      const timer = setTimeout(() => {
        setVisible(true)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = useCallback(() => {
    storeConsent(true)
    setVisible(false)
  }, [])

  const handleEssentialOnly = useCallback(() => {
    storeConsent(false)
    setVisible(false)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up p-4 sm:p-6">
      <div
        className="relative mx-auto max-w-4xl rounded-xl border border-border/60 border-t-2 border-t-neon/40 bg-card/90 backdrop-blur-xl shadow-2xl shadow-black/40"
        role="dialog"
        aria-label="Consentimento de cookies"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" />

        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
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
              anúncios. Você pode aceitar todos os cookies ou apenas os essenciais.{' '}
              <Link
                href="/cookies"
                className="inline font-medium text-neon underline underline-offset-2 transition-colors hover:text-neon/80"
              >
                Política de Cookies
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-shrink-0 sm:flex-row sm:items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEssentialOnly}
              className="border-border/60 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            >
              Apenas essenciais
            </Button>
            <Button
              size="sm"
              onClick={handleAcceptAll}
              className="bg-neon font-semibold text-primary-foreground shadow-md shadow-neon/20 hover:bg-neon/90"
            >
              Aceitar todos
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
