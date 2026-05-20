'use client'

import { useState, useEffect, useCallback } from 'react'
import { Download, X, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showIOSHint, setShowIOSHint] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Check if user dismissed the prompt recently (7 days)
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10)
      const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24)
      if (daysSince < 7) return
    }

    // Detect iOS Safari (doesn't support beforeinstallprompt)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window)
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

    if (isIOS && isSafari) {
      // Show iOS hint after a short delay
      const timer = setTimeout(() => {
        setShowIOSHint(true)
        setShowPrompt(true)
      }, 5000)
      return () => clearTimeout(timer)
    }

    // Android/Chrome: listen for beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Show prompt after a short delay so user sees the site first
      setTimeout(() => {
        setShowPrompt(true)
      }, 3000)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Listen for successful install
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setIsInstalled(true)
      }
    } catch {
      // Prompt failed silently
    } finally {
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }, [deferredPrompt])

  const handleDismiss = useCallback(() => {
    setShowPrompt(false)
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
  }, [])

  // Don't show if already installed
  if (isInstalled || !showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="rounded-xl border border-neon/30 bg-card/95 backdrop-blur-xl shadow-2xl shadow-neon/10 p-4">
        <div className="flex items-start gap-3">
          <div className="shrink-0">
            <div className="h-10 w-10 rounded-lg gradient-neon flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-black" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold mb-1">Instale o BetCalc Pro</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              {showIOSHint
                ? 'Toque no ícone de compartilhar e selecione "Adicionar à Tela de Início" para instalar como app.'
                : 'Acesse mais rápido, use offline e tenha experiência de app nativo no seu celular.'
              }
            </p>
            <div className="flex items-center gap-2">
              {!showIOSHint && (
                <Button
                  size="sm"
                  onClick={handleInstall}
                  className="gradient-neon text-black font-bold text-xs h-8 px-3"
                >
                  <Download className="h-3.5 w-3.5 mr-1" />
                  Instalar
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismiss}
                className="text-xs text-muted-foreground h-8"
              >
                Agora não
              </Button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
