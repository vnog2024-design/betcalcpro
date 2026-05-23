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
      }, 2000)
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
    <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
      <div
        className="relative border-t border-border/60 border-t-neon/30 bg-card/95 backdrop-blur-xl shadow-lg shadow-black/30"
        role="dialog"
        aria-label="Consentimento de cookies"
      >
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-4 py-2.5 sm:px-6 sm:py-2.5">
          <div className="flex-1 min-w-0 flex items-center gap-2">
            <span className="text-sm shrink-0" role="img" aria-hidden="true">🍪</span>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Usamos cookies para melhorar sua experiência e exibir anúncios.{' '}
              <Link
                href="/cookies"
                className="inline font-medium text-neon underline underline-offset-2 transition-colors hover:text-neon/80"
              >
                Saiba mais
              </Link>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEssentialOnly}
              className="border-border/60 text-muted-foreground hover:bg-muted/50 hover:text-foreground h-7 text-xs px-2.5"
            >
              Essenciais
            </Button>
            <Button
              size="sm"
              onClick={handleAcceptAll}
              className="bg-neon font-semibold text-primary-foreground shadow-sm shadow-neon/20 hover:bg-neon/90 h-7 text-xs px-2.5"
            >
              Aceitar todos
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
