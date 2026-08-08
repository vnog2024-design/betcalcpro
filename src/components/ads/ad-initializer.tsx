'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * AdInitializer — centralized ad loading with consent, adblock detection, and single trigger.
 *
 * 1. Checks cookie consent before loading Adskeeper
 * 2. Loads the Adskeeper preloader dynamically (not in <head>)
 * 3. Fires _mgc.load exactly ONCE for all visible widgets
 * 4. Provides triggerMgcLoad() for late-appearing widgets (notification, exit popup)
 * 5. Detects adblockers and exposes status
 */

let globalTriggered = false
let preloadPromise: Promise<void> | null = null
let adblockDetected = false

/** Check if user has accepted ad consent (LGPD) */
function hasAdConsent(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const raw = localStorage.getItem('cookie-consent')
    if (!raw) return false
    const data = JSON.parse(raw)
    return data.accepted === true
  } catch {
    return false
  }
}

/** Load the Adskeeper preloader script (only once) */
function loadPreloader(): Promise<void> {
  if (preloadPromise) return preloadPromise

  preloadPromise = new Promise((resolve) => {
    // Check if already loaded
    if ((window as Record<string, unknown>)._mgc) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://jsc.adskeeper.com/site/1104734.js'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      adblockDetected = true
      resolve()
    }
    document.head.appendChild(script)

    // Timeout: if script doesn't load in 8s, assume blocked
    setTimeout(() => {
      if (!(window as Record<string, unknown>)._mgc) {
        adblockDetected = true
      }
      resolve()
    }, 8000)
  })

  return preloadPromise
}

/** Fire _mgc.load — the single trigger that makes MGID scan and render widgets */
async function triggerMgcLoad(): Promise<void> {
  if (typeof window === 'undefined') return
  if (!(window as Record<string, unknown>)._mgc) return

  const script = document.createElement('script')
  script.textContent = `(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");`
  document.body.appendChild(script)
}

export function useAdConsent() {
  const [consent, setConsent] = useState(false)
  useEffect(() => {
    setConsent(hasAdConsent())

    // Listen for consent changes (cookie banner sets localStorage)
    const handler = () => setConsent(hasAdConsent())
    window.addEventListener('storage', handler)
    const interval = setInterval(() => setConsent(hasAdConsent()), 2000)
    return () => {
      window.removeEventListener('storage', handler)
      clearInterval(interval)
    }
  }, [])
  return consent
}

export function isAdblocked(): boolean {
  return adblockDetected
}

export function AdInitializer() {
  const triggeredRef = useRef(false)

  useEffect(() => {
    if (triggeredRef.current) return

    if (!hasAdConsent()) return

    triggeredRef.current = true

    const init = async () => {
      await loadPreloader()

      // Wait a bit for React to finish rendering widget divs
      await new Promise(r => setTimeout(r, 500))

      if (!globalTriggered) {
        globalTriggered = true
        await triggerMgcLoad()
      }
    }

    init()
  }, [])

  return null
}

/** Trigger _mgc.load for late-appearing widgets (notification, exit popup, lazy-loaded) */
export async function triggerLateLoad() {
  await loadPreloader()
  // Small delay to ensure the widget div is in the DOM
  await new Promise(r => setTimeout(r, 300))
  if (!globalTriggered) {
    globalTriggered = true
  }
  await triggerMgcLoad()
}
