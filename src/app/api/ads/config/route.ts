import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

const REAL_DEFAULTS = [
  { key: 'header_banner',  value: '2056709', label: 'Widget do Cabecalho',          enabled: true },
  { key: 'sidebar',        value: '2056711', label: 'Widget da Barra Lateral',      enabled: true },
  { key: 'below_article',  value: '2056706', label: 'Widget Embaixo do Artigo',    enabled: true },
  { key: 'in_article',     value: '2056707', label: 'Widget no Artigo',           enabled: true },
  { key: 'feed',           value: '2056705', label: 'Feed',                         enabled: true },
  { key: 'notification',   value: '2056713', label: 'Notificacao no Site',          enabled: true },
  { key: 'exit_popup',     value: '2056714', label: 'Sair do Pop-up',              enabled: true },
  { key: 'videowall',      value: '2057343', label: 'Videowall',                   enabled: true },
]

/** Public endpoint — reads ad config from database (admin-managed).
 *  Auto-seeds if table is empty.
 */
export async function GET() {
  try {
    const configs = await db.adConfig.findMany()

    // Auto-seed if empty
    if (configs.length === 0) {
      for (const ad of REAL_DEFAULTS) {
        await db.adConfig.create({ data: ad })
      }
      const seeded = await db.adConfig.findMany()
      return NextResponse.json(toConfigMap(seeded), {
        headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' }
      })
    }

    return NextResponse.json(toConfigMap(configs), {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' }
    })
  } catch {
    // DB unavailable — return hardcoded fallback
    return NextResponse.json(toConfigMap(REAL_DEFAULTS as any), {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' }
    })
  }
}

function toConfigMap(items: Array<{ key: string; value: string; enabled: boolean; label: string }>) {
  const result: Record<string, { widgetId: string; enabled: boolean; label: string }> = {}
  for (const c of items) {
    result[c.key] = { widgetId: c.value, enabled: c.enabled, label: c.label }
  }
  return result
}