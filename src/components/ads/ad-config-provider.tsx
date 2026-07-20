'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

export interface AdSlot {
  widgetId: string
  enabled: boolean
  label: string
}

/** Defaults hardcoded — garante que os widgets renderizem na primeira paint */
const DEFAULT_CONFIG: Record<string, AdSlot> = {
  header_banner:  { widgetId: '2056714', enabled: true,  label: 'Widget do Cabeçalho' },
  sidebar:        { widgetId: '2056714', enabled: true,  label: 'Widget da Barra Lateral' },
  below_article:  { widgetId: '2056714', enabled: true,  label: 'Widget Embaixo do Artigo' },
  feed:           { widgetId: '2056714', enabled: true,  label: 'Feed' },
  standard_block: { widgetId: '2056714', enabled: true,  label: 'Bloco de Anúncios Padrão' },
  mobile_widget:  { widgetId: '2056714', enabled: true,  label: 'Widget de Site para Celular' },
  notification:   { widgetId: '2056714', enabled: false, label: 'Notificação no Site' },
  exit_popup:     { widgetId: '2056714', enabled: false, label: 'Sair do Pop-up' },
  interstitial:   { widgetId: '2056714', enabled: false, label: 'Interstitial' },
  videowall:      { widgetId: '2056714', enabled: false, label: 'Videowall' },
}

/** Contexto global com as configurações de anúncios vindas do store */
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

  // Trigger MGID scan on every mount/navigation
  useEffect(() => {
    triggerAdskeeperScan()
    const t1 = setTimeout(triggerAdskeeperScan, 1000)
    const t2 = setTimeout(triggerAdskeeperScan, 3000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
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

/** Dispara o scan do Adskeeper */
export function triggerAdskeeperScan() {
  const w = window as any
  if (!w._mgq) w._mgq = []
  w._mgq.push(['_mgc.load'])
  if (w._mgc && typeof w._mgc.load === 'function') {
    w._mgc.load()
  }
}