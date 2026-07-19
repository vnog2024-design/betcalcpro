'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Fetches header_code from the ad API and injects it into <head>.
 * Properly handles <script> tags by parsing HTML and appending child elements.
 */
export function DynamicHeaderCode() {
  const [code, setCode] = useState('')
  const addedElements = useRef<HTMLElement[]>([])

  useEffect(() => {
    fetch('/api/ads/public')
      .then((r) => r.json())
      .then((data) => {
        if (data.header_code) setCode(data.header_code)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!code) return

    // Parse the HTML string and append all elements to <head>
    const container = document.createElement('div')
    container.innerHTML = code
    const children = Array.from(container.children) as HTMLElement[]
    addedElements.current = children

    for (const child of children) {
      document.head.appendChild(child)
    }

    return () => {
      for (const child of addedElements.current) {
        if (child.parentNode === document.head) {
          document.head.removeChild(child)
        }
      }
      addedElements.current = []
    }
  }, [code])

  return null
}