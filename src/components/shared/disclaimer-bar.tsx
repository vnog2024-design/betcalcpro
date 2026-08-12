'use client'

import { AlertTriangle, X } from 'lucide-react'
import { useSyncExternalStore } from 'react'

const DISCLAIMER_KEY = 'betcalc-disclaimer-dismissed'

function subscribeToStorage(cb: () => void) {
  window.addEventListener('storage', cb)
  return () => window.removeEventListener('storage', cb)
}

function getSnapshot() {
  return localStorage.getItem(DISCLAIMER_KEY) === 'true'
}

function getServerSnapshot() {
  return false
}

export function DisclaimerBar() {
  const dismissed = useSyncExternalStore(subscribeToStorage, getSnapshot, getServerSnapshot)

  const handleDismiss = () => {
    localStorage.setItem(DISCLAIMER_KEY, 'true')
    window.dispatchEvent(new StorageEvent('storage', { key: DISCLAIMER_KEY }))
  }

  if (dismissed) return null

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 py-1.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs text-amber-500/90">
        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
        <span>
          Ferramentas educacionais de probabilidade e gestão de risco. Não garantem resultados. +18 anos.
        </span>
        <button
          onClick={handleDismiss}
          className="ml-2 hover:text-amber-500 transition-colors"
          aria-label="Fechar aviso"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
