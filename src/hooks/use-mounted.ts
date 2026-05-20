import { useSyncExternalStore } from 'react'

// useSyncExternalStore is the React 19 lint-safe way to detect client-side mounting.
// - Server: returns false (SSR renders the loading shell)
// - Client: returns true (hydrated, renders full interactive content)
// This prevents hydration mismatches from Zustand persist, localStorage, etc.

const emptySubscribe = () => () => {}

export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,   // client snapshot
    () => false   // server snapshot
  )
}
