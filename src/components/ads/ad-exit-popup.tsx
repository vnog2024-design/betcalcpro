'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { X, ExternalLink } from 'lucide-react'
import { useAdConfig, triggerAdskeeperScan } from './ad-config-provider'

/**
 * Exit Popup — aparece quando o usuário move o mouse para fora da janela (exit intent).
 * Mostra apenas 1x por sessão.
 */
export function AdExitPopup() {
  const slot = useAdConfig('exit_popup')
  const [visible, setVisible] = useState(false)
  const triggered = useRef(false)

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  useEffect(() => {
    if (!slot) return
    if (sessionStorage.getItem('betcalc_ad_exit_shown')) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered.current) {
        triggered.current = true
        setVisible(true)
        sessionStorage.setItem('betcalc_ad_exit_shown', '1')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [slot])

  useEffect(() => {
    if (!visible || !slot) return
    triggerAdskeeperScan()
    const t = setTimeout(triggerAdskeeperScan, 1000)
    return () => clearTimeout(t)
  }, [visible, slot?.widgetId])

  useEffect(() => {
    if (!visible) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [visible, close])

  if (!visible || !slot) return null

  return (
    <div
      className="fixed inset-0 z-[9500] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={close}
    >
      <div
        className="relative w-full max-w-lg mx-4 bg-card rounded-xl overflow-hidden shadow-2xl border border-border/50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-border/30 bg-muted/20">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ExternalLink className="h-3.5 w-3.5" />
            Recomendado para você
          </div>
          <button
            onClick={close}
            className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-[300px] sm:min-h-[350px] flex items-center justify-center">
          <div data-type="_mgwidget" data-widget-id={slot.widgetId} />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");`,
            }}
          />
        </div>

        <div className="px-4 py-2 border-t border-border/30 flex justify-end">
          <button
            onClick={close}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Continuar no site
          </button>
        </div>
      </div>
    </div>
  )
}