'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * AdskeeperWidget — creates the MGID widget marker div with lazy loading.
 *
 * The widget div is only created when the container enters the viewport
 * (IntersectionObserver). This prevents MGID from processing below-the-fold
 * widgets until they're actually visible, improving performance.
 */
export function AdskeeperWidget({
  widgetId,
  className = '',
  minH = 90,
  lazy = true,
}: {
  widgetId: string
  className?: string
  minH?: number
  /** Set to false to always render immediately (e.g. above-the-fold ads) */
  lazy?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(!lazy)
  const mountedRef = useRef(false)

  // IntersectionObserver for lazy loading
  useEffect(() => {
    if (!lazy || !containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px' } // Start loading 200px before entering viewport
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [lazy])

  // Create the MGID widget div when in view
  useEffect(() => {
    if (!inView || !widgetRef.current || mountedRef.current) return
    mountedRef.current = true

    const widgetDiv = document.createElement('div')
    widgetDiv.setAttribute('data-type', '_mgwidget')
    widgetDiv.setAttribute('data-widget-id', widgetId)
    widgetRef.current.appendChild(widgetDiv)
  }, [inView, widgetId])

  return (
    <div
      ref={containerRef}
      className={`mgid-ad-container ${className}`}
      style={{ minHeight: minH }}
    >
      <div ref={widgetRef} />
    </div>
  )
}
