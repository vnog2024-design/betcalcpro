import { NextResponse } from 'next/server'
import { AdsStore } from '@/lib/store'

/**
 * Public endpoint — returns videowall ad config (enabled + code).
 * No auth required since this is consumed by the frontend overlay.
 */
export async function GET() {
  try {
    const ads = await AdsStore.getAll()

    // Collect all enabled videowall entries (system + custom)
    const videowalls = ads.filter(
      (ad) => (ad.key === 'videowall_code' || ad.key.startsWith('videowall_')) && ad.enabled && ad.value
    )

    if (videowalls.length === 0) {
      return NextResponse.json({ enabled: false, code: '' })
    }

    // If multiple, pick one randomly
    const picked = videowalls[Math.floor(Math.random() * videowalls.length)]

    return NextResponse.json({ enabled: true, code: picked.value })
  } catch {
    return NextResponse.json({ enabled: false, code: '' })
  }
}