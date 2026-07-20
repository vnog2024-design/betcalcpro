'use client'

import { useEffect, useState, useRef } from 'react'
import { X } from 'lucide-react'
import { useAdConfig, triggerAdskeeperScan } from './ad-config-provider'

/**
 * Notificação no Site — barra fixa na parte inferior da tela.
 * Pode ser fechada pelo usuário (salva em sessionStorage).
 */
export function AdNotification() {
  const slot = useAdConfig('notification')
  const [visible, setVisible] = useState(false)
  const [height, setHeight] = useState(0)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!slot) return
    if (sessionStorage.getItem('betcalc_ad_notif_dismissed')) return

    // Delay de 2s para não atrapalhar o carregamento
    const t = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(t)
  }, [slot])

  useEffect(() => {
    if (!visible || !barRef.current) return
    // Observa a altura do conteúdo do anúncio
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height)
      }
    })
    observer.observe(barRef.current.firstElementChild || barRef.current)
    return () => observer.disconnect()
  }, [visible])

  useEffect(() => {
    if (!visible || !slot) return
    triggerAdskeeperScan()
    const t = setTimeout(triggerAdskeeperScan, 1000)
    return () => clearTimeout(t)
  }, [visible, slot?.widgetId])

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
        aria-label="Fechar notificação"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="max-w-5xl mx-auto px-4 py-2">
        <div data-type="_mgwidget" data-widget-id={slot.widgetId} />
      </div>
    </div>
  )
}