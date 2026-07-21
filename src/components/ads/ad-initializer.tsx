'use client'

import { useEffect, useRef } from 'react'

/**
 * AdInitializer — chama _mgc.load UMA VEZ após tudo estar pronto.
 *
 * O MGID SDK funciona assim:
 * - O preloader (jsc.adskeeper.com/site/1104734.js) cria _mgc e _mgq
 * - Quando _mgc.load é chamado, o SDK escaneia o DOM inteiro
 *   procurando por divs com data-type="_mgwidget"
 * - Ele então renderiza os anúncios em cada div encontrado
 *
 * Por isso, o trigger deve ser chamado UMA ÚNICA VEZ, depois que:
 * 1. O preloader já carregou e inicializou _mgc
 * 2. Todos os widgets divs já estão no DOM
 *
 * Chamamos com um delay de 2s para garantir ambas as condições.
 */
export function AdInitializer() {
  const triggeredRef = useRef(false)

  useEffect(() => {
    if (triggeredRef.current) return

    // Função que dispara o load do MGID
    const triggerLoad = () => {
      if (triggeredRef.current) return
      triggeredRef.current = true

      // Verifica se o _mgc existe (preloader carregou)
      if (typeof window !== 'undefined' && (window as Record<string, unknown>)._mgc) {
        const script = document.createElement('script')
        script.textContent = `(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");`
        document.body.appendChild(script)
        console.log('[BetCalc Ads] _mgc.load triggered')
      } else {
        console.warn('[BetCalc Ads] _mgc not found, preloader may not have loaded')
      }
    }

    // Espera 2 segundos para garantir que o preloader e React terminaram
    const timer = setTimeout(triggerLoad, 2000)

    // Fallback: se depois de 5s ainda não disparou (preloader demorou), tenta de novo
    const fallback = setTimeout(() => {
      if (!triggeredRef.current) {
        triggerLoad()
      }
    }, 5000)

    return () => {
      clearTimeout(timer)
      clearTimeout(fallback)
    }
  }, [])

  return null // Componente invisível
}
