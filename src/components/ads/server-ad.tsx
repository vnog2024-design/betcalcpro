import { Fragment } from 'react'

// ═══════════════════════════════════════════════════════════════════
// Server Component — Renderiza widget Adskeeper diretamente no HTML SSR.
// 
// PROBLEMA RESOLVIDO: O preloader (1104734.js) carrega no <head> e escaneia
// o DOM por widgets QUANDO INICIALIZA. Se o widget div não existe ainda,
// ele NÃO configura o interceptor de _mgq.push.
// 
// SOLUÇÃO: Renderizar o widget div via SSR para que ele já esteja no DOM
// quando o preloader inicializar. O placement script (_mgc.load) é 
// executado pelo preloader automaticamente quando ele encontra o widget.
// 
// NOTA: O <script> inline no widget div NÃO executa via SSR (React não
// executa scripts de dangerouslySetInnerHTML). MAS o preloader do Adskeeper
// escaneia o DOM por divs com data-type="_mgwidget" e processa-os
// automaticamente — NÃO depende do script inline executar.
// ═══════════════════════════════════════════════════════════════════

const AK_SITE_ID = '1104734'

const WIDGET_MAP: Record<string, string> = {
  banner_top: '2056131',
  banner_bottom: '2056131',
  in_content: '2056131',
  in_article: '2056131',
  in_feed: '2056131',
  sidebar_ad: '2056131',
}

interface ServerAdProps {
  position: string
  className?: string
  minH?: number
}

export function ServerAd({ position, className = '', minH = 90 }: ServerAdProps) {
  const widgetId = WIDGET_MAP[position]
  if (!widgetId) return null

  // O preloader escaneia o DOM por data-type="_mgwidget" e os processa.
  // O script inline serve como fallback caso o scan falhe, MAS como
  // SSR não executa scripts inline, o scan do preloader é o mecanismo principal.
  const html = `<div data-type="_mgwidget" data-widget-id="${widgetId}"></div>`

  return (
    <div
      className={`w-full flex justify-center ${className}`}
      style={{ minHeight: minH }}
    >
      <div className="w-full max-w-4xl" dangerouslySetInnerHTML={{ __html }} />
    </div>
  )
}