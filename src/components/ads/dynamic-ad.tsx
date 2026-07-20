'use client'

import { useEffect } from 'react'
import { useAdConfig, triggerAdskeeperScan } from './ad-config-provider'

interface DynamicAdProps {
  position: string
  className?: string
  minH?: number
  /** Limita a altura (para feed ads que podem crescer demais) */
  limitHeight?: number
  /** Mostra apenas em mobile */
  mobileOnly?: boolean
}

/**
 * Componente de anúncio dinâmico — lê config do AdConfigProvider.
 * Se o slot estiver habilitado e tiver widgetId, renderiza o widget MGID.
 */
export function DynamicAd({
  position,
  className = '',
  minH = 90,
  limitHeight,
  mobileOnly = false,
}: DynamicAdProps) {
  const slot = useAdConfig(position)

  useEffect(() => {
    if (!slot) return
    // Scan em vários momentos para garantir que o preloader encontrou o widget
    triggerAdskeeperScan()
    const t1 = setTimeout(triggerAdskeeperScan, 500)
    const t2 = setTimeout(triggerAdskeeperScan, 1500)
    const t3 = setTimeout(triggerAdskeeperScan, 3000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [slot?.widgetId])

  if (!slot) return null

  const style: React.CSSProperties = { minHeight: minH }
  if (limitHeight) {
    style.maxHeight = limitHeight
    style.overflow = 'hidden'
  }

  return (
    <div
      className={`w-full flex justify-center ${className} ${mobileOnly ? 'lg:hidden' : ''}`}
      style={style}
    >
      <div data-type="_mgwidget" data-widget-id={slot.widgetId} />
    </div>
  )
}