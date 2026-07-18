'use client'

import { useEffect, useState } from 'react'

interface DynamicAdProps {
  position: string
  className?: string
  fallback?: React.ReactNode
}

export function DynamicAd({ position, className = '', fallback = null }: DynamicAdProps) {
  const [code, setCode] = useState('')

  useEffect(() => {
    fetch('/api/ads/public')
      .then((r) => r.json())
      .then((data) => {
        if (data[position]) setCode(data[position])
      })
      .catch(() => {})
  }, [position])

  if (!code) return <>{fallback}</>

  return (
    <div className={`w-full flex justify-center min-h-[90px] ${className}`}>
      <div dangerouslySetInnerHTML={{ __html: code }} />
    </div>
  )
}