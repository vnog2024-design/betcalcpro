'use client'

/**
 * Adskeeper widget — Client Component ultra-simple
 *
 * O preloader (1104734.js) carrega no <head> e escaneia o DOM automaticamente
 * procurando por <div data-type="_mgwidget">. Não precisa de IntersectionObserver,
 * polling, nem executeScripts. Apenas renderiza o div.
 *
 * Cada posição usa um widget ID diferente para maximizar fill rate.
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

  if (!widgetId) return null

  return (
    <div className={`w-full flex justify-center ${className}`} style={{ minHeight: minH }}>
      <div data-type="_mgwidget" data-widget-id={widgetId} />
    </div>
  )
}