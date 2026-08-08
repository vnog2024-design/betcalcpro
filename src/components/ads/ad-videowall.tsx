'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { X } from 'lucide-react'
import { triggerLateLoad } from './ad-initializer'

/**
 * AdVideowall — tela cheia com countdown de 5s antes de poder fechar.
 * Aparece APENAS UMA VEZ por sessao (sessionStorage).
 *
 * Widget ID: 2057343
 */

const WIDGET_ID = '2057343'
const COUNTDOWN_SECONDS = 5
const SESSION_KEY = 'betcalc_videowall_shown'

export function AdVideowall() {
  const [visible, setVisible] = useState(false)
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS)
  const [canClose, setCanClose] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)
  const mountedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const close = useCallback(() => {
    if (!canClose) return
    setVisible(false)
    setCanClose(false)
    setCountdown(COUNTDOWN_SECONDS)
    if (widgetRef.current) {
      widgetRef.current.innerHTML = ''
      mountedRef.current = false
    }
  }, [canClose])

  // Show only once per session, after initial page load
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return

    const t = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1')
      setVisible(true)
    }, 3000)
    return () => clearTimeout(t)
  }, [])

  // Countdown timer
  useEffect(() => {
    if (!visible) return

    setCountdown(COUNTDOWN_SECONDS)
    setCanClose(false)

    const startTime = Date.now()

    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      const remaining = COUNTDOWN_SECONDS - elapsed

      if (remaining <= 0) {
        setCountdown(0)
        setCanClose(true)
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
      } else {
        setCountdown(remaining)
      }
    }, 200)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [visible])

  // Create the MGID widget when visible
  useEffect(() => {
    if (!visible || !widgetRef.current || mountedRef.current) return
    mountedRef.current = true

    const widgetDiv = document.createElement('div')
    widgetDiv.setAttribute('data-type', '_mgwidget')
    widgetDiv.setAttribute('data-widget-id', WIDGET_ID)
    widgetRef.current.appendChild(widgetDiv)

    // Use centralized trigger instead of inline script
    setTimeout(() => triggerLateLoad(), 300)
  }, [visible])

  // ESC key
  useEffect(() => {
    if (!visible) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [visible, close])

  // Lock body scroll
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
      onClick={canClose ? close : undefined}
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          close()
        }}
        disabled={!canClose}
        className={`
          fixed top-4 right-4 z-[10000] flex items-center justify-center
          rounded-full transition-all duration-300 cursor-pointer
          ${canClose
            ? 'bg-white/20 hover:bg-white/30 text-white hover:scale-110'
            : 'bg-white/10 text-white/40 cursor-not-allowed'
          }
        `}
        style={{
          width: canClose ? '48px' : '56px',
          height: canClose ? '48px' : '56px',
        }}
        aria-label={canClose ? 'Fechar anuncio' : `Aguarde ${countdown}s`}
      >
        {canClose ? (
          <X className="h-6 w-6" strokeWidth={2.5} />
        ) : (
          <span className="text-lg font-bold tabular-nums">{countdown}</span>
        )}
      </button>

      <div
        className="w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={widgetRef} className="w-full max-w-5xl" />
      </div>
    </div>
  )
}