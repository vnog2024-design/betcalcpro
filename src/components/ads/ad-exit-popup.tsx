'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { X, ExternalLink } from 'lucide-react'
import { useAdConfig } from './ad-config-provider'

/**
 * Exit Popup — aparece quando o usuário move o mouse para fora da janela.
 * Usa o padrão MGID: div data-type="_mgwidget" + _mgc.load via useEffect.
 */
export function AdExitPopup() {
  const slot = useAdConfig('exit_popup')
  const [visible, setVisible] = useState(false)
  const triggered = useRef(false)
  const widgetRef = useRef<HTMLDivElement>(null)
  const loadedRef = useRef(false)

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
    if (!visible || !slot || !widgetRef.current || loadedRef.current) return
    loadedRef.current = true

    const container = widgetRef.current

    const widgetDiv = document.createElement('div')
    widgetDiv.setAttribute('data-type', '_mgwidget')
    widgetDiv.setAttribute('data-widget-id', slot.widgetId)
    container.appendChild(widgetDiv)

    const script = document.createElement('script')
    script.textContent = `(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");`
    container.appendChild(script)
  }, [visible, slot])

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
          <div ref={widgetRef} />
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