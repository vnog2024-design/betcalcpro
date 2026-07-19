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
// O preloader (1104734.js) já carrega server-side no layout.tsx
// Aqui só precisamos do div + placement script para cada posição.
// ═══════════════════════════════════════════════════════════════════

const AK_SITE_ID = '1104734'

// Widgets mapeados por posição — usar o mesmo widget em múltiplas
// posições é PERMITIDO pelo Adskeeper (eles fazem fill diferenciado)
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
 * DynamicAd — Renderiza anúncio Adskeeper na posição indicada.
 *
 * Funciona 100% client-side, sem depender de API route ou banco de dados.
 * O preloader do Adskeeper (1104734.js) já foi carregado no <head>
 * via next/script server-side (layout.tsx).
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

  // Injeta o HTML do anúncio quando visível
  const injectAd = useCallback(() => {
    const widgetId = WIDGET_MAP[position]
    if (!widgetId || !adRef.current) return

    const html = buildPlacementHtml(widgetId)
    adRef.current.innerHTML = html
    executeScripts(adRef.current)
    setInjected(true)
  }, [position])

  useEffect(() => {
    if (!visible || injected) return

    // Pequeno delay para garantir que o preloader carregou
    const timer = setTimeout(() => {
      injectAd()
    }, 300)

    return () => clearTimeout(timer)
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