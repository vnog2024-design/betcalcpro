'use client'

import { useEffect, useRef } from 'react'

/**
 * AdskeeperWidget — renderiza widget MGID/Adskeeper com trigger que EXECUTA.
 *
 * PADRÃO MGID/ADSKEEPER (verificado — preloader jsc.adskeeper.com/site/1104734.js):
 *   1. Preloader no <head> (layout.tsx) — carrega a infraestrutura MGID
 *   2. <div data-type="_mgwidget" data-widget-id="XXXX"> — marca onde o widget renderiza
 *   3. _mgc.load trigger — diz ao MGID para escanear e renderizar os widgets
 *
 * O trigger DEVE ser um <script> real no DOM (dangerouslySetInnerHTML NÃO executa
 * scripts em componentes client React). Por isso usamos useEffect + createElement.
 */
export function AdskeeperWidget({
  widgetId,
  className = '',
  minH = 90,
}: {
  widgetId: string
  className?: string
  minH?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const loadedRef = useRef(false)

  useEffect(() => {
    if (!containerRef.current || loadedRef.current) return
    loadedRef.current = true

    const container = containerRef.current

    // Cria o div do widget MGID
    const widgetDiv = document.createElement('div')
    widgetDiv.setAttribute('data-type', '_mgwidget')
    widgetDiv.setAttribute('data-widget-id', widgetId)
    container.appendChild(widgetDiv)

    // Cria o script de trigger _mgc.load — ESTE sim executa no navegador
    const script = document.createElement('script')
    script.textContent = `(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");`
    container.appendChild(script)
  }, [widgetId])

  return (
    <div
      ref={containerRef}
      className={`mgid-ad-container ${className}`}
      style={{ minHeight: minH }}
    />
  )
}