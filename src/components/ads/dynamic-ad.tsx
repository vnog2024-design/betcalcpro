'use client'

import { useEffect } from 'react'

/**
 * Adskeeper widget — Client Component
 *
 * O preloader (1104734.js) carrega no <head>. Quando o React hidrata e
 * renderiza este componente, chamamos window._mgc.load() para avisar
 * o preloader que há novos widgets no DOM para escanear.
 */

const WIDGET_MAP: Record<string, string> = {
  banner_top:    '2056131',
  banner_bottom: '2056209',
  in_content:    '2056235',
  in_article:    '2056236',
  in_feed:       '2056237',
  sidebar_ad:    '2056238',
}

interface DynamicAdProps {
  position: string
  className?: string
  minH?: number
}

export function DynamicAd({ position, className = '', minH = 90 }: DynamicAdProps) {
  const widgetId = WIDGET_MAP[position]

  useEffect(() => {
    // Avisar o preloader que há widgets novos no DOM
    const tryLoad = () => {
      const mgc = (window as any)._mgc
      if (mgc && typeof mgc.load === 'function') {
        mgc.load()
      }
    }
    // Tentar imediatamente e novamente após 1s (caso preloader ainda não carregou)
    tryLoad()
    const timer = setTimeout(tryLoad, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!widgetId) return null

  return (
    <div className={`w-full flex justify-center ${className}`} style={{ minHeight: minH }}>
      <div data-type="_mgwidget" data-widget-id={widgetId} />
    </div>
  )
}