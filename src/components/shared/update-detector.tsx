'use client'

import { useEffect, useState } from 'react'
import { RefreshCw, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * UpdateDetector checks if the current page has stale content by comparing
 * the page's build hash. When a new version is detected (e.g. after a deploy),
 * it shows a banner prompting the user to refresh.
 *
 * In development, it also helps ensure the latest code is always visible.
 */
export function UpdateDetector() {
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return

    // In development: listen for HMR errors and auto-recover
    const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

    if (isDev) {
      // In dev mode, listen for SW updates that might have been left over
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(regs => {
          // If there are still any SWs registered in dev, clear them
          if (regs.length > 0) {
            regs.forEach(reg => reg.unregister())
            if ('caches' in window) {
              caches.keys().then(names => names.forEach(name => caches.delete(name)))
            }
          }
        })
      }
      return // No need for update detection in dev - HMR handles it
    }

    // Production: detect when a new SW is waiting
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'UPDATE_DONE') {
          window.location.reload()
        }
      })

      // Check for waiting SW
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.waiting) {
          setUpdateAvailable(true)
        }

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New version available
                setUpdateAvailable(true)
              }
            })
          }
        })
      })
    }

    // Also check via version endpoint periodically
    let currentVersion = document.querySelector('meta[name="betcalc-version"]')?.getAttribute('content')
    const checkInterval = setInterval(async () => {
      try {
        const response = await fetch('/api/version?' + Date.now())
        if (response.ok) {
          const data = await response.json()
          if (currentVersion && data.version && data.version !== currentVersion) {
            setUpdateAvailable(true)
          }
        }
      } catch {
        // Silently fail - not critical
      }
    }, 60000) // Check every minute

    return () => clearInterval(checkInterval)
  }, [])

  const handleUpdate = () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      // Tell SW to force update
      navigator.serviceWorker.controller.postMessage({ type: 'FORCE_UPDATE' })
    } else {
      window.location.reload()
    }
  }

  if (!updateAvailable || dismissed) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto z-[100] animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-primary text-primary-foreground rounded-lg shadow-lg p-3 flex items-center gap-3 sm:min-w-[320px]">
        <RefreshCw className="h-5 w-5 shrink-0 animate-spin" style={{ animationDuration: '3s' }} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">Nova versão disponível!</p>
          <p className="text-xs opacity-80">Atualize para a versão mais recente</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleUpdate}
            className="h-7 text-xs font-semibold"
          >
            Atualizar
          </Button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded hover:bg-primary-foreground/20 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
