'use client'

import { useEffect, useRef } from 'react'

/**
 * AdskeeperWidget — cria o container do widget MGID/Adskeeper.
 *
 * PADRÃO MGID/ADSKEEPER:
 *   1. Preloader no <head> (layout.tsx) — carrega a infraestrutura MGID
 *   2. <div data-type="_mgwidget" data-widget-id="XXXX"> — marca onde o widget renderiza
 *   3. _mgc.load trigger — chamado UMA VEZ pelo AdInitializer após todos os widgets
 *
 * Cada widget apenas cria o div de marcação. O trigger global é responsável
 * por dizer ao MGID para escanear e renderizar todos os widgets de uma vez.
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
  const widgetRef = useRef<HTMLDivElement>(null)
  const mountedRef = useRef(false)

  useEffect(() => {
    if (!widgetRef.current || mountedRef.current) return
    mountedRef.current = true

    // Cria o div do widget MGID diretamente no container
    const widgetDiv = document.createElement('div')
    widgetDiv.setAttribute('data-type', '_mgwidget')
    widgetDiv.setAttribute('data-widget-id', widgetId)
    widgetRef.current.appendChild(widgetDiv)
  }, [widgetId])

  return (
    <div
      ref={widgetRef}
      className={`mgid-ad-container ${className}`}
      style={{ minHeight: minH }}
    />
  )
}