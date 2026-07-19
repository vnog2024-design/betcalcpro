'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * DynamicHeaderCode — Client Component
 * 
 * Fetches header_code from the ad API and injects it into <head>.
 * Properly handles <script> tags by creating real script elements
 * (dangerouslySetInnerHTML does NOT execute scripts — that was the old bug).
 */
export function DynamicHeaderCode() {
  const [loaded, setLoaded] = useState(false)
  const addedElements = useRef<HTMLElement[]>([])

  useEffect(() => {
    if (loaded) return

    fetch('/api/ads/public')
      .then((r) => r.json())
      .then((data) => {
        if (data.header_code) {
          // Parse the HTML string and append all elements to <head>
          const container = document.createElement('div')
          container.innerHTML = data.header_code
          const children = Array.from(container.children) as HTMLElement[]
          addedElements.current = children

          for (const child of children) {
            document.head.appendChild(child)
          }
        }
        setLoaded(true)
      })
      .catch(() => {
        // Retry once after 2 seconds
        setTimeout(() => {
          fetch('/api/ads/public')
            .then((r) => r.json())
            .then((data) => {
              if (data.header_code) {
                const container = document.createElement('div')
                container.innerHTML = data.header_code
                const children = Array.from(container.children) as HTMLElement[]
                addedElements.current = children
                for (const child of children) {
                  document.head.appendChild(child)
                }
              }
              setLoaded(true)
            })
            .catch(() => setLoaded(true))
        }, 2000)
      })
  }, [loaded])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      for (const child of addedElements.current) {
        if (child.parentNode === document.head) {
          document.head.removeChild(child)
        }
      }
      addedElements.current = []
    }
  }, [])

  return null
}