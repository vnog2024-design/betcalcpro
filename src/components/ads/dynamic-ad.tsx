'use client'

import { useEffect } from 'react'

/**
 * Adskeeper widget — Client Component
 *
 * Como a pagina usa useMounted() que delaya o conteudo apos hidratacao,
 * o preloader escaneia o DOM antes dos widgets existirem.
 * Apos a montagem, usamos _mgq (fila de comandos do Adskeeper)
 * e _mgc.load() para forcar o re-scan do DOM.
 */

const WIDGET_MAP: Record<string, string> = {
  banner_top:    '2056131',
  banner_bottom: '2056209',
  in_content:    '2056235',
  in_article:    '2056236',
  in_feed:       '2056237',
  sidebar_ad:    '2056238',
}

/** Dispara o scan do Adskeeper de todas as formas possiveis */
function triggerAdskeeperScan() {
  const w = window as any
  // Metodo 1: _mgq queue (API padrao do Adskeeper)
  w._mgq = w._mgq || []
  w._mgq.push(['_mgc.load'])
  // Metodo 2: chamar _mgc.load diretamente
  if (w._mgc && typeof w._mgc.load === 'function') {
    w._mgc.load()
  }
}

interface DynamicAdProps {
  position: string
  className?: string
  minH?: number
}

export function DynamicAd({ position, className = '', minH = 90 }: DynamicAdProps) {
  const widgetId = WIDGET_MAP[position]

  useEffect(() => {
    // Tentar em varios momentos pois o preloader pode carregar em qualquer hora
    triggerAdskeeperScan()
    const t1 = setTimeout(triggerAdskeeperScan, 500)
    const t2 = setTimeout(triggerAdskeeperScan, 1500)
    const t3 = setTimeout(triggerAdskeeperScan, 3000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  if (!widgetId) return null

  return (
    <div className={`w-full flex justify-center ${className}`} style={{ minHeight: minH, maxHeight: 300, overflow: 'hidden' }}>
      <div data-type="_mgwidget" data-widget-id={widgetId} />
    </div>
  )
}