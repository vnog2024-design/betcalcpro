import { NextResponse } from 'next/server'

/**
 * Public endpoint — returns ad slot configs for the frontend.
 * Uses defaults directly (no slow storage lookup) for fast response.
 * Format: { [position]: { widgetId, enabled, label } }
 */
export async function GET() {
  const preloader = '<script src="https://jsc.adskeeper.com/site/1104734.js" async></' + 'script>'

  const defaults = [
    { key: 'header_code',    label: 'Código no Header',             value: preloader,  enabled: true },
    { key: 'header_banner',  label: 'Widget do Cabeçalho',          value: '2056714',  enabled: true },
    { key: 'sidebar',        label: 'Widget da Barra Lateral',      value: '2056714',  enabled: true },
    { key: 'below_article',  label: 'Widget Embaixo do Artigo',    value: '2056714',  enabled: true },
    { key: 'feed',           label: 'Feed',                         value: '2056714',  enabled: true },
    { key: 'standard_block', label: 'Bloco de Anúncios Padrão',    value: '2056714',  enabled: true },
    { key: 'mobile_widget',  label: 'Widget de Site para Celular', value: '2056714',  enabled: true },
    { key: 'notification',   label: 'Notificação no Site',          value: '2056714',  enabled: false },
    { key: 'exit_popup',     label: 'Sair do Pop-up',              value: '2056714',  enabled: false },
    { key: 'interstitial',   label: 'Interstitial',                 value: '2056714',  enabled: false },
    { key: 'videowall',      label: 'Videowall',                    value: '2056714',  enabled: false },
  ]

  const result: Record<string, { widgetId: string; enabled: boolean; label: string }> = {}
  for (const ad of defaults) {
    result[ad.key] = {
      widgetId: ad.value,
      enabled: ad.enabled,
      label: ad.label,
    }
  }

  return NextResponse.json(result, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' }
  })
}