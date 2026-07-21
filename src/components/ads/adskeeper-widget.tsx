'use client'

import { useEffect, useRef } from 'react'

/**
 * AdskeeperWidget — carrega um widget do Adskeeper usando o script individual.
 *
 * PADRÃO OFICIAL ADSKEEPER (do painel do editor):
 *   <div id="adskeeper-{type}-{id}"></div>
 *   <script src="https://widget.adskeeper.com.br/{type}.js?id={id}"></script>
 *
 * Usa useEffect + document.createElement('script') porque React NÃO executa
 * <script> tags inseridas via dangerouslySetInnerHTML em componentes client.
 */
export function AdskeeperWidget({
  widgetType,
  widgetId,
  className = '',
  minH = 90,
}: {
  widgetType: string
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

    // Cria o div container do widget
    const widgetDiv = document.createElement('div')
    widgetDiv.id = `adskeeper-${widgetType}-${widgetId}`
    container.appendChild(widgetDiv)

    // Cria e insere o script — ESTE sim executa no navegador
    const script = document.createElement('script')
    script.src = `https://widget.adskeeper.com.br/${widgetType}.js?id=${widgetId}`
    script.async = true
    container.appendChild(script)
  }, [widgetType, widgetId])

  return (
    <div
      ref={containerRef}
      className={`adskeeper-ad-container ${className}`}
      style={{ minHeight: minH }}
    />
  )
}