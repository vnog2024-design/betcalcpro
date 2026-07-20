'use client'

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'

export interface AdSlot {
  widgetId: string
  enabled: boolean
  label: string
}

/** Contexto global com as configurações de anúncios vindas do store */
const AdConfigContext = createContext<Record<string, AdSlot>>({})

export function AdConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<Record<string, AdSlot>>({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/ads/config')
      .then((r) => r.json())
      .then((data) => {
        setConfig(data)
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
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
  w._mgq = w._mgq || []
  w._mgq.push(['_mgc.load'])
  if (w._mgc && typeof w._mgc.load === 'function') {
    w._mgc.load()
  }
}