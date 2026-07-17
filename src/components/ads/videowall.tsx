'use client'

import { useEffect, useState, useCallback } from 'react'
import { X, Timer } from 'lucide-react'

const VIDEOWALL_KEY = 'betcalc_videowall_dismissed'
const VIDEOWALL_EXPIRY_MS = 24 * 60 * 60 * 1000 // 24h

export function Videowall() {
  const [code, setCode] = useState('')
  const [visible, setVisible] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const checkAndShow = useCallback(async () => {
    try {
      const dismissed = localStorage.getItem(VIDEOWALL_KEY)
      if (dismissed) {
        const ts = parseInt(dismissed, 10)
        if (Date.now() - ts < VIDEOWALL_EXPIRY_MS) return
      }

      const res = await fetch('/api/ads/public')
      if (res.ok) {
        const data = await res.json()
        if (data.videowall) {
          setCode(data.videowall)
          setCountdown(5)
          setVisible(true)
        }
      }
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    // Small delay to let page render first
    const timer = setTimeout(checkAndShow, 800)
    return () => clearTimeout(timer)
  }, [checkAndShow])

  useEffect(() => {
    if (!visible || countdown <= 0) return
    const interval = setInterval(() => {
      setCountdown((c) => c - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [visible, countdown])

  const handleClose = () => {
    localStorage.setItem(VIDEOWALL_KEY, Date.now().toString())
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex flex-col">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/50 shrink-0">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Timer className="w-4 h-4" />
          <span>Anúncio</span>
        </div>
        {countdown > 0 ? (
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <span>Fechar em</span>
            <span className="bg-gray-800 text-white px-2.5 py-0.5 rounded-md font-mono font-bold">
              {countdown}s
            </span>
          </div>
        ) : (
          <button
            onClick={handleClose}
            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
          >
            <X className="w-4 h-4" />
            Fechar Anúncio
          </button>
        )}
      </div>

      {/* Ad content area */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-4">
        <div
          className="w-full max-w-5xl aspect-video"
          dangerouslySetInnerHTML={{ __html: code }}
        />
      </div>
    </div>
  )
}