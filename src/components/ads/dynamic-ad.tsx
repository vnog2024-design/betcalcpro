'use client'

import { useEffect, useState, useRef, memo, useCallback } from 'react'

interface DynamicAdProps {
  position: string
  className?: string
  fallback?: React.ReactNode
  /** Altura mínima do container (px) — evita CLS */
  minH?: number
}

// ═══════════════════════════════════════════════════════════════════
// HARDCODED Adskeeper placements — sem depender de API/store/DB
// O preloader (1104734.js) já carrega no <head> via <script> raw.
// Aqui só precisamos do div + placement script para cada posição.
// ═══════════════════════════════════════════════════════════════════

const AK_SITE_ID = '1104734'

// Widgets mapeados por posição
const WIDGET_MAP: Record<string, string> = {
  banner_top: '2056131',
  banner_bottom: '2056131',
  in_content: '2056131',
  in_article: '2056131',
  in_feed: '2056131',
  sidebar_ad: '2056131',
}

function buildPlacementHtml(widgetId: string): string {
  return `<div data-type="_mgwidget" data-widget-id="${widgetId}"></div><script>(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");</script>`
}

/**
 * Executa todos os <script> filhos de um elemento container.
 * Necessário porque innerHTML NÃO executa scripts automaticamente.
 */
function executeScripts(container: HTMLElement) {
  const scripts = container.querySelectorAll('script')
  scripts.forEach((oldScript) => {
    const newScript = document.createElement('script')
    for (const attr of Array.from(oldScript.attributes)) {
      newScript.setAttribute(attr.name, attr.value)
    }
    newScript.textContent = oldScript.textContent
    oldScript.parentNode?.replaceChild(newScript, oldScript)
  })
}

/**
 * Espera o preloader do Adskeeper estar pronto.
 * O preloader define window._mgc quando carrega.
 * Polling a cada 200ms, timeout de 15s.
 */
function waitForPreloader(): Promise<boolean> {
  return new Promise((resolve) => {
    // Verificação imediata
    if (typeof window !== 'undefined' && (window as any)._mgc) {
      resolve(true)
      return
    }

    let elapsed = 0
    const interval = setInterval(() => {
      elapsed += 200
      if (typeof window !== 'undefined' && (window as any)._mgc) {
        clearInterval(interval)
        resolve(true)
      } else if (elapsed > 15000) {
        clearInterval(interval)
        // Mesmo sem preloader, tenta injetar (o preloader pode carregar depois)
        resolve(false)
      }
    }, 200)
  })
}

/**
 * DynamicAd — Renderiza anúncio Adskeeper na posição indicada.
 *
 * Espera o preloader do Adskeeper estar pronto antes de injetar
 * o widget, garantindo que o _mgc.load será processado.
 */
export const DynamicAd = memo(function DynamicAd({
  position,
  className = '',
  fallback = null,
  minH = 90,
}: DynamicAdProps) {
  const [visible, setVisible] = useState(false)
  const [injected, setInjected] = useState(false)
  const placeholderRef = useRef<HTMLDivElement>(null)
  const adRef = useRef<HTMLDivElement>(null)

  // IntersectionObserver — só injeta quando visível (lazy loading)
  useEffect(() => {
    if (injected) return

    const el = placeholderRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px', threshold: 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [injected])

  // Injeta o HTML do anúncio quando visível E preloader está pronto
  const injectAd = useCallback(async () => {
    const widgetId = WIDGET_MAP[position]
    if (!widgetId || !adRef.current) return

    // ESPERAR o preloader estar pronto antes de injetar o widget
    await waitForPreloader()

    if (!adRef.current) return

    const html = buildPlacementHtml(widgetId)
    adRef.current.innerHTML = html
    executeScripts(adRef.current)
    setInjected(true)
  }, [position])

  useEffect(() => {
    if (!visible || injected) return

    let cancelled = false
    const run = () => {
      if (!cancelled) injectAd()
    }

    run()
    return () => { cancelled = true }
  }, [visible, injected, injectAd])

  return (
    <div
      ref={injected ? undefined : placeholderRef}
      className={`w-full flex justify-center ${className}`}
      style={{ minHeight: injected ? undefined : minH }}
    >
      {visible || injected ? (
        <div ref={adRef} className="w-full max-w-4xl" />
      ) : (
        fallback
      )}
    </div>
  )
})