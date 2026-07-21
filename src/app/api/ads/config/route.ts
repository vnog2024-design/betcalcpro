import { NextResponse } from 'next/server'

/** Public endpoint — retorna configs com IDs reais do Adskeeper */
export async function GET() {
  const defaults: Record<string, { widgetId: string; enabled: boolean; label: string }> = {
    header_banner: { widgetId: '2056709', enabled: true,  label: 'Widget do Cabeçalho' },
    sidebar:       { widgetId: '2056711', enabled: true,  label: 'Widget da Barra Lateral' },
    below_article: { widgetId: '2056706', enabled: true,  label: 'Widget Embaixo do Artigo' },
    in_article:    { widgetId: '2056707', enabled: true,  label: 'Widget no Artigo' },
    feed:          { widgetId: '2056705', enabled: true,  label: 'Feed' },
    notification:  { widgetId: '2056713', enabled: true,  label: 'Notificação no Site' },
    exit_popup:    { widgetId: '2056714', enabled: true,  label: 'Sair do Pop-up' },
  }

  return NextResponse.json(defaults, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' }
  })
}