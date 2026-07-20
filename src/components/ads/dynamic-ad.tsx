'use client'

import { useEffect } from 'react'
import { useAdConfig, triggerAdskeeperScan } from './ad-config-provider'

interface DynamicAdProps {
  position: string
  className?: string
  minH?: number
  /** Mostra apenas em mobile */
  mobileOnly?: boolean
}

/**
 * Componente de anúncio dinâmico — lê config do AdConfigProvider.
 * Se o slot estiver habilitado e tiver widgetId, renderiza o widget MGID.
 * NENHUM limite de altura ou overflow — o MGID controla o tamanho automaticamente.
 */
export function DynamicAd({
  position,
  className = '',
  minH = 90,
  mobileOnly = false,
}: DynamicAdProps) {
  const slot = useAdConfig(position)

  useEffect(() => {
    if (!slot) return
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

  return (
    <div
      className={`mgid-ad-container ${className} ${mobileOnly ? 'lg:hidden' : ''}`}
      style={{ minHeight: minH }}
    >
      <div data-type="_mgwidget" data-widget-id={slot.widgetId} />
    </div>
  )
}
