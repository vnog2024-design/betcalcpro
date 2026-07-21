'use client'

import { useEffect, useState, useRef } from 'react'
import { X } from 'lucide-react'
import { useAdConfig } from './ad-config-provider'

/**
 * Notificacao no Site — barra fixa na parte inferior da tela.
 * Cria o div MGID mas o trigger e chamado pelo AdInitializer.
 */
export function AdNotification() {
  const slot = useAdConfig('notification')
  const [visible, setVisible] = useState(false)
  const [height, setHeight] = useState(0)
  const barRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<HTMLDivElement>(null)
  const mountedRef = useRef(false)

  useEffect(() => {
    if (!slot) return
    if (sessionStorage.getItem('betcalc_ad_notif_dismissed')) return
    const t = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(t)
  }, [slot])

  useEffect(() => {
    if (!visible || !barRef.current) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height)
      }
    })
    observer.observe(barRef.current.firstElementChild || barRef.current)
    return () => observer.disconnect()
  }, [visible])

  // Cria o div do widget MGID quando visivel
  useEffect(() => {
    if (!visible || !slot || !widgetRef.current || mountedRef.current) return
    mountedRef.current = true

    const widgetDiv = document.createElement('div')
    widgetDiv.setAttribute('data-type', '_mgwidget')
    widgetDiv.setAttribute('data-widget-id', slot.widgetId)
    widgetRef.current.appendChild(widgetDiv)

    // Dispara load extra para este widget que apareceu depois
    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as Record<string, unknown>)._mgc) {
        const script = document.createElement('script')
        script.textContent = `(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");`
        document.body.appendChild(script)
      }
    }, 500)
  }, [visible, slot])

  if (!visible || !slot) return null

  const close = () => {
    sessionStorage.setItem('betcalc_ad_notif_dismissed', '1')
    setVisible(false)
  }

  return (
    <div
      ref={barRef}
      className="fixed bottom-0 left-0 right-0 z-[9000] bg-card border-t border-border/50 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom duration-300"
      style={{ minHeight: height || 60 }}
    >
      <button
        onClick={close}
        className="absolute top-1 right-2 p-1 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors cursor-pointer z-10"
        aria-label="Fechar notificacao"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="max-w-5xl mx-auto px-4 py-2">
        <div ref={widgetRef} />
      </div>
    </div>
  )
}