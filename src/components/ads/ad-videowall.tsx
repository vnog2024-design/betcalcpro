'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

/**
 * AdVideowall — tela cheia com countdown de 5s antes de poder fechar.
 * Aparece em toda navegacao (inclusive entre paginas via Next.js router).
 *
 * Widget ID: 2057343
 * Pattern: div data-type="_mgwidget" + _mgc.load trigger via createElement
 */

const WIDGET_ID = '2057343'
const COUNTDOWN_SECONDS = 5

export function AdVideowall() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS)
  const [canClose, setCanClose] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)
  const mountedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prevPathRef = useRef<string>('')

  const close = useCallback(() => {
    if (!canClose) return
    setVisible(false)
    setCanClose(false)
    setCountdown(COUNTDOWN_SECONDS)
    // Limpa o widget para recriar na proxima navegacao
    if (widgetRef.current) {
      widgetRef.current.innerHTML = ''
      mountedRef.current = false
    }
  }, [canClose])

  // Detecta mudanca de rota para mostrar o videowall
  useEffect(() => {
    // Na primeira carga, prevPathRef esta vazio — mostra
    // Em navegacoes subsequentes, mostra quando pathname muda
    if (prevPathRef.current === '') {
      prevPathRef.current = pathname
      // Pequeno delay para garantir que o preloader MGID carregou
      const t = setTimeout(() => setVisible(true), 2500)
      return () => clearTimeout(t)
    }

    if (pathname !== prevPathRef.current) {
      prevPathRef.current = pathname
      // Reseta estado para nova exibicao
      mountedRef.current = false
      setCountdown(COUNTDOWN_SECONDS)
      setCanClose(false)
      // Mostra na nova pagina
      const t = setTimeout(() => setVisible(true), 500)
      return () => clearTimeout(t)
    }
  }, [pathname])

  // Countdown timer
  useEffect(() => {
    if (!visible) return

    setCountdown(COUNTDOWN_SECONDS)
    setCanClose(false)

    const startTime = Date.now()

    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      const remaining = COUNTDOWN_SECONDS - elapsed

      if (remaining <= 0) {
        setCountdown(0)
        setCanClose(true)
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
      } else {
        setCountdown(remaining)
      }
    }, 200)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [visible])

  // Cria o widget MGID quando visivel
  useEffect(() => {
    if (!visible || !widgetRef.current || mountedRef.current) return
    mountedRef.current = true

    const container = widgetRef.current

    const widgetDiv = document.createElement('div')
    widgetDiv.setAttribute('data-type', '_mgwidget')
    widgetDiv.setAttribute('data-widget-id', WIDGET_ID)
    container.appendChild(widgetDiv)

    // Trigger _mgc.load para este widget
    const script = document.createElement('script')
    script.textContent = `(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");`
    container.appendChild(script)
  }, [visible])

  // Esc key para fechar
  useEffect(() => {
    if (!visible) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [visible, close])

  // Bloqueia scroll do body quando visivel
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
      onClick={canClose ? close : undefined}
    >
      {/* Botao Fechar - canto superior direito */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          close()
        }}
        disabled={!canClose}
        className={`
          fixed top-4 right-4 z-[10000] flex items-center justify-center
          rounded-full transition-all duration-300 cursor-pointer
          ${canClose
            ? 'bg-white/20 hover:bg-white/30 text-white hover:scale-110'
            : 'bg-white/10 text-white/40 cursor-not-allowed'
          }
        `}
        style={{
          width: canClose ? '48px' : '56px',
          height: canClose ? '48px' : '56px',
        }}
        aria-label={canClose ? 'Fechar anuncio' : `Aguarde ${countdown}s`}
      >
        {canClose ? (
          <X className="h-6 w-6" strokeWidth={2.5} />
        ) : (
          <span className="text-lg font-bold tabular-nums">{countdown}</span>
        )}
      </button>

      {/* Container do widget */}
      <div
        className="w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={widgetRef} className="w-full max-w-5xl" />
      </div>
    </div>
  )
}