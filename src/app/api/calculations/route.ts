import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const userId = url.searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 })
    }

    const calculations = await db.calculation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 100,
    })

    return NextResponse.json(calculations)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch calculations' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, tool, params, result } = body

    if (!userId || !tool) {
      return NextResponse.json({ error: 'userId and tool required' }, { status: 400 })
    }

    const calculation = await db.calculation.create({
      data: {
        userId,
        tool,
        params: JSON.stringify(params),
        result: JSON.stringify(result),
      },
    })

    // Update tool usage count
    await db.toolUsage.upsert({
      where: { toolId: tool },
      update: { count: { increment: 1 } },
      create: { toolId: tool, count: 1 },
    })

    return NextResponse.json(calculation)
  } catch {
    return NextResponse.json({ error: 'Failed to save calculation' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const userId = url.searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 })
    }

    await db.calculation.deleteMany({ where: { userId } })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to clear calculations' }, { status: 500 })
  }
}
