'use client'

import { useEffect, useState, useRef, memo } from 'react'

interface DynamicAdProps {
  position: string
  className?: string
  fallback?: React.ReactNode
  /** Altura mínima do container (px) — evita CLS */
  minH?: number
}

/**
 * DynamicAd — Carrega código de anúncio dinâmico do admin store.
 * 
 * Otimizações:
 * - Lazy loading com IntersectionObserver (só fetcha quando visível)
 * - Altura mínima para evitar CLS
 * - Tentativa única de fetch (não retria em caso de erro)
 * - Memoizado para evitar re-renders desnecessários
 */
export const DynamicAd = memo(function DynamicAd({
  position,
  className = '',
  fallback = null,
  minH = 90,
}: DynamicAdProps) {
  const [code, setCode] = useState('')
  const [visible, setVisible] = useState(false)
  const [fetched, setFetched] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // IntersectionObserver — só busca o ad quando o container fica visível
  useEffect(() => {
    if (fetched) return

    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px', threshold: 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [fetched])

  // Fetch do código do anúncio quando visível
  useEffect(() => {
    if (!visible || fetched) return

    let cancelled = false
    fetch('/api/ads/public')
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data[position]) {
          setCode(data[position])
        }
      })
      .catch(() => { /* silencioso */ })
      .finally(() => {
        if (!cancelled) setFetched(true)
      })

    return () => { cancelled = true }
  }, [visible, fetched, position])

  return (
    <div
      ref={containerRef}
      className={`w-full flex justify-center ${className}`}
      style={{ minHeight: code ? undefined : minH }}
    >
      {code ? (
        <div
          className="w-full max-w-4xl"
          dangerouslySetInnerHTML={{ __html: code }}
        />
      ) : (
        fallback
      )}
    </div>
  )
})