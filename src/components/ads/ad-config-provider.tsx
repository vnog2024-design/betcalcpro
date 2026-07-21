'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface AdSlot {
  widgetId: string
  widgetType: string
  enabled: boolean
  label: string
}

/**
 * Configuração padrão com os IDs REAIS do painel Adskeeper.
 * Cada posição tem seu próprio widget ID e tipo.
 *
 * Widgets criados no Adskeeper:
 *   feed (2056705) / article-bottom (2056706) / article (2056707)
 *   header (2056709) / sidebar (2056711) / notification (2056713)
 *   pop-up-exit (2056714)
 */
const DEFAULT_CONFIG: Record<string, AdSlot> = {
  header_banner:  { widgetId: '2056709', widgetType: 'header',         enabled: true,  label: 'Widget do Cabeçalho' },
  sidebar:        { widgetId: '2056711', widgetType: 'sidebar',       enabled: true,  label: 'Widget da Barra Lateral' },
  below_article:  { widgetId: '2056706', widgetType: 'article-bottom', enabled: true,  label: 'Widget Embaixo do Artigo' },
  in_article:     { widgetId: '2056707', widgetType: 'article',       enabled: true,  label: 'Widget no Artigo' },
  feed:           { widgetId: '2056705', widgetType: 'feed',          enabled: true,  label: 'Feed' },
  notification:   { widgetId: '2056713', widgetType: 'notification',  enabled: true,  label: 'Notificação no Site' },
  exit_popup:     { widgetId: '2056714', widgetType: 'pop-up-exit',   enabled: true,  label: 'Sair do Pop-up' },
}

const AdConfigContext = createContext<Record<string, AdSlot>>(DEFAULT_CONFIG)

export function AdConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<Record<string, AdSlot>>(DEFAULT_CONFIG)

  useEffect(() => {
    fetch('/api/ads/config')
      .then((r) => r.json())
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setConfig(data)
        }
      })
      .catch(() => { /* usa defaults */ })
  }, [])

  return (
    <AdConfigContext.Provider value={config}>
      {children}
    </AdConfigContext.Provider>
  )
}

/** Hook para ler a config de um slot específico */
export function useAdConfig(position: string): AdSlot | null {
  const config = useContext(AdConfigContext)
  const slot = config[position]
  if (!slot) return null
  if (!slot.enabled || !slot.widgetId) return null
  return slot
}