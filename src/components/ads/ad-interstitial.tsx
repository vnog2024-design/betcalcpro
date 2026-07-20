'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { X, Clock } from 'lucide-react'
import { useAdConfig, triggerAdskeeperScan } from './ad-config-provider'

/**
 * Interstitial — tela cheia entre páginas.
 * Mostra 1x por sessão, com countdown de 5s.
 */
export function AdInterstitial() {
  const slot = useAdConfig('interstitial')
  const [visible, setVisible] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [canClose, setCanClose] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!slot) return
    if (sessionStorage.getItem('betcalc_ad_interstitial_shown')) return
    const showTimer = setTimeout(() => {
      setVisible(true)
      sessionStorage.setItem('betcalc_ad_interstitial_shown', '1')
    }, 3000)
    return () => clearTimeout(showTimer)
  }, [slot])

  useEffect(() => {
    if (!visible) return
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanClose(true)
          if (timerRef.current) clearInterval(timerRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [visible])

  useEffect(() => {
    if (!visible || !slot) return
    triggerAdskeeperScan()
    const t = setTimeout(triggerAdskeeperScan, 1000)
    return () => clearTimeout(t)
  }, [visible, slot?.widgetId])

  const close = useCallback(() => {
    if (!canClose) return
    setVisible(false)
  }, [canClose])

  useEffect(() => {
    if (!visible || !canClose) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [visible, canClose, close])

  if (!visible || !slot) return null

  return (
    <div
      className="fixed inset-0 z-[9800] flex items-center justify-center bg-black/85 animate-in fade-in duration-200"
      onClick={canClose ? close : undefined}
    >
      <div
        className="relative w-full max-w-3xl mx-4 bg-card rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-3 right-3 z-10">
          {canClose ? (
            <button
              onClick={close}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white text-sm font-medium transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
              Fechar
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 text-white/70 text-sm">
              <Clock className="h-4 w-4" />
              {countdown}s
            </div>
          )}
        </div>

        <div className="min-h-[350px] sm:min-h-[450px] flex items-center justify-center">
          <div data-type="_mgwidget" data-widget-id={slot.widgetId} />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");`,
            }}
          />
        </div>
      </div>
    </div>
  )
}