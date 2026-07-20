'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { X, Clock } from 'lucide-react'

interface VideowallOverlayProps {
  /** If true, skip the API call and never show */
  disabled?: boolean
}

const SESSION_KEY = 'betcalc_videowall_shown'
const COUNTDOWN_SECONDS = 5

export function VideowallOverlay({ disabled = false }: VideowallOverlayProps) {
  const [visible, setVisible] = useState(false)
  const [code, setCode] = useState('')
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS)
  const [canClose, setCanClose] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Fetch videowall config from public API
  useEffect(() => {
    if (disabled) return

    // Don't show if already shown this session
    if (sessionStorage.getItem(SESSION_KEY)) return

    fetch('/api/ads/videowall')
      .then((res) => res.json())
      .then((data) => {
        if (data.enabled && data.code) {
          setCode(data.code)
          setVisible(true)
        }
      })
      .catch(() => { /* silently fail */ })
  }, [disabled])

  // Countdown timer
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

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [visible])

  const close = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, '1')
    setVisible(false)
  }, [])

  // Close on Escape key
  useEffect(() => {
    if (!visible || !canClose) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [visible, canClose, close])

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={canClose ? close : undefined}
    >
      {/* Ad content */}
      <div
        className="relative w-full max-w-4xl mx-4 bg-background rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button area */}
        <div className="absolute top-3 right-3 z-10">
          {canClose ? (
            <button
              onClick={close}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white text-sm font-medium transition-colors cursor-pointer"
              aria-label="Fechar anúncio"
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

        {/* Ad code rendered here */}
        <div
          className="min-h-[300px] sm:min-h-[400px] flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: code }}
        />
      </div>
    </div>
  )
}