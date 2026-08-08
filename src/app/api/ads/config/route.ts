import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

/** Public endpoint — reads ad config from database (admin-managed). */
export async function GET() {
  try {
    const configs = await db.adConfig.findMany()
    const result: Record<string, { widgetId: string; enabled: boolean; label: string }> = {}
    for (const c of configs) {
      result[c.key] = {
        widgetId: c.value,
        enabled: c.enabled,
        label: c.label,
      }
    }
    // If DB is empty, return empty object (frontend uses its own defaults)
    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' }
    })
  } catch {
    // DB unavailable — return empty (frontend falls back to hardcoded defaults)
    return NextResponse.json({}, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' }
    })
  }
}