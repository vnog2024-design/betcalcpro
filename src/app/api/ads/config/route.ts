import { NextResponse } from 'next/server'

/**
 * Public endpoint — retorna configs de ad slots para o frontend.
 * Usa os IDs reais do painel Adskeeper com widgetType.
 */
export async function GET() {
  const defaults: Record<string, { widgetId: string; widgetType: string; enabled: boolean; label: string }> = {
    header_banner: { widgetId: '2056709', widgetType: 'header',         enabled: true,  label: 'Widget do Cabeçalho' },
    sidebar:       { widgetId: '2056711', widgetType: 'sidebar',       enabled: true,  label: 'Widget da Barra Lateral' },
    below_article: { widgetId: '2056706', widgetType: 'article-bottom', enabled: true,  label: 'Widget Embaixo do Artigo' },
    in_article:    { widgetId: '2056707', widgetType: 'article',       enabled: true,  label: 'Widget no Artigo' },
    feed:          { widgetId: '2056705', widgetType: 'feed',          enabled: true,  label: 'Feed' },
    notification:  { widgetId: '2056713', widgetType: 'notification',  enabled: true,  label: 'Notificação no Site' },
    exit_popup:    { widgetId: '2056714', widgetType: 'pop-up-exit',   enabled: true,  label: 'Sair do Pop-up' },
  }

  return NextResponse.json(defaults, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' }
  })
}