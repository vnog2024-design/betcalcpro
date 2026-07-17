import { NextResponse } from 'next/server'
import { AdsStore } from '@/lib/store'

export async function GET() {
  try {
    const ads = await AdsStore.getEnabled()
    const result: Record<string, string> = { ...ads }

    // Collect all enabled videowall entries and pick one randomly
    const videowallKeys = Object.keys(ads).filter(k => k === 'videowall_code' || k.startsWith('videowall_'))
    if (videowallKeys.length > 0) {
      // Remove all videowall entries from the flat response
      for (const vk of videowallKeys) {
        delete result[vk]
      }
      // Pick a random one and set it as 'videowall'
      const randomKey = videowallKeys[Math.floor(Math.random() * videowallKeys.length)]
      result['videowall'] = ads[randomKey]
    }

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({}, { status: 200 })
  }
}