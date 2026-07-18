'use client'

import { useEffect, useState } from 'react'

export function DynamicHeaderCode() {
  const [code, setCode] = useState('')

  useEffect(() => {
    fetch('/api/ads/public')
      .then((r) => r.json())
      .then((data) => {
        if (data.header_code) setCode(data.header_code)
      })
      .catch(() => {})
  }, [])

  if (!code) return null

  return <script dangerouslySetInnerHTML={{ __html: code }} />
}