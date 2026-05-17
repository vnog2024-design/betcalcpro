import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const usage = await db.toolUsage.findMany({
      orderBy: { count: 'desc' },
    })

    return NextResponse.json(usage)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch tool usage' }, { status: 500 })
  }
}
