import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const ads = await db.adConfig.findMany({ where: { enabled: true } })
    const config: Record<string, string> = {}
    for (const ad of ads) {
      if (ad.value) {
        config[ad.key] = ad.value
      }
    }
    return NextResponse.json(config)
  } catch {
    return NextResponse.json({}, { status: 200 })
  }
}