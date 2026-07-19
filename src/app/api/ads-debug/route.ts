import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const AK_SITE_ID = '1104734'
const AK_WIDGET_ID = '2056131'

export async function GET() {
  return NextResponse.json({
    _debug: true,
    _deploy_hash: '87d2482',
    _timestamp: Date.now(),
    site_id: AK_SITE_ID,
    widget_id: AK_WIDGET_ID,
    has_fallback: true,
    message: 'If you see this, the new code is deployed',
  })
}