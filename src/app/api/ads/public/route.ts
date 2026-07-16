import { NextResponse } from 'next/server'
import { AdsStore } from '@/lib/store'

export async function GET() {
  try {
    await AdsStore.initDefaults()
    const ads = await AdsStore.getEnabled()
    return NextResponse.json(ads)
  } catch {
    return NextResponse.json({}, { status: 200 })
  }
}