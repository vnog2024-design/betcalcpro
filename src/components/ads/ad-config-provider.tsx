'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface AdSlot {
  widgetId: string
  enabled: boolean
  label: string
}

/**
 * Configuração padrão com os IDs REAIS do painel Adskeeper.
 *
 * Widgets criados no Adskeeper (verificados no dashboard):
 *   feed (2056705) / article-bottom (2056706) / article (2056707)
 *   header (2056709) / sidebar (2056711) / notification (2056713)
 *   pop-up-exit (2056714)
 */
const DEFAULT_CONFIG: Record<string, AdSlot> = {
  header_banner:  { widgetId: '2056709', enabled: true,  label: 'Widget do Cabeçalho' },
  sidebar:        { widgetId: '2056711', enabled: true,  label: 'Widget da Barra Lateral' },
  below_article:  { widgetId: '2056706', enabled: true,  label: 'Widget Embaixo do Artigo' },
  in_article:     { widgetId: '2056707', enabled: true,  label: 'Widget no Artigo' },
  feed:           { widgetId: '2056705', enabled: true,  label: 'Feed' },
  notification:   { widgetId: '2056713', enabled: true,  label: 'Notificação no Site' },
  exit_popup:     { widgetId: '2056714', enabled: true,  label: 'Sair do Pop-up' },
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