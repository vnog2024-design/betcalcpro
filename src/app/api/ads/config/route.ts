import { NextResponse } from 'next/server'
import { AdsStore } from '@/lib/store'

/**
 * Public endpoint — returns all ad slot configs for the frontend.
 * Format: { [position]: { widgetId, enabled, label } }
 *
 * The value field in AdsStore contains the MGID widget ID for widget slots,
 * or HTML code for system slots (header_code).
 */
export async function GET() {
  try {
    const ads = await AdsStore.getAll()

    const result: Record<string, { widgetId: string; enabled: boolean; label: string }> = {}

    for (const ad of ads) {
      result[ad.key] = {
        widgetId: ad.value,
        enabled: ad.enabled,
        label: ad.label,
      }
    }

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({})
  }
}