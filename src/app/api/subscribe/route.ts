import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, source } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const subscriber = await db.emailSubscriber.upsert({
      where: { email },
      update: {},
      create: { email, source: source || 'popup' },
    })

    return NextResponse.json({ success: true, id: subscriber.id })
  } catch {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
