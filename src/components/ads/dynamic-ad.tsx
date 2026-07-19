'use client'

import { useEffect, useState, useRef, memo, useCallback } from 'react'

interface DynamicAdProps {
  position: string
  className?: string
  fallback?: React.ReactNode
  /** Altura mínima do container (px) — evita CLS */
  minH?: number
}

/**
 * Executa todos os <script> filhos de um elemento container.
 * Necessário porque dangerouslySetInnerHTML / innerHTML NÃO executam scripts.
 */
function executeScripts(container: HTMLElement) {
  const scripts = container.querySelectorAll('script')
  scripts.forEach((oldScript) => {
    const newScript = document.createElement('script')
    // Copiar atributos (src, async, type, etc.)
    for (const attr of Array.from(oldScript.attributes)) {
      newScript.setAttribute(attr.name, attr.value)
    }
    // Copiar conteúdo inline
    newScript.textContent = oldScript.textContent
    // Substituir o script antigo pelo novo (que o browser vai executar)
    oldScript.parentNode?.replaceChild(newScript, oldScript)
  })
}

/**
 * DynamicAd — Carrega código de anúncio dinâmico do admin store.
 *
 * Otimizações:
 * - Lazy loading com IntersectionObserver (só fetcha quando visível)
 * - Altura mínima para evitar CLS
 * - Tentativa única de fetch (não retria em caso de erro)
 * - Memoizado para evitar re-renders desnecessários
 * - Executa scripts do HTML injetado (necessário para Adskeeper etc.)
 */
export const DynamicAd = memo(function DynamicAd({
  position,
  className = '',
  fallback = null,
  minH = 90,
}: DynamicAdProps) {
  const [visible, setVisible] = useState(false)
  const [fetched, setFetched] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const placeholderRef = useRef<HTMLDivElement>(null)
  const adRef = useRef<HTMLDivElement>(null)

  // IntersectionObserver — só busca o ad quando o container fica visível
  useEffect(() => {
    if (fetched) return

    const el = placeholderRef.current
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

  // Fetch do código do anúncio quando visível e injeta no DOM executando scripts
  const injectAd = useCallback(async () => {
    if (!adRef.current) return

    try {
      const res = await fetch('/api/ads/public')
      const data = await res.json()
      const html = data[position]

      if (html && adRef.current) {
        adRef.current.innerHTML = html
        // CRÍTICO: Executar scripts injetados (dangerouslySetInnerHTML não faz isso)
        executeScripts(adRef.current)
        setLoaded(true)
      }
    } catch {
      /* silencioso */
    }
  }, [position])

  useEffect(() => {
    if (!visible || fetched) return

    let cancelled = false
    setFetched(true)

    if (!cancelled) {
      injectAd()
    }

    return () => { cancelled = true }
  }, [visible, fetched, injectAd])

  return (
    <div
      ref={loaded ? undefined : placeholderRef}
      className={`w-full flex justify-center ${className}`}
      style={{ minHeight: loaded ? undefined : minH }}
    >
      {visible || loaded ? (
        <div ref={adRef} className="w-full max-w-4xl" />
      ) : (
        fallback
      )}
    </div>
  )
})