import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdminApi } from '@/lib/admin-auth'

export async function GET() {
  const auth = await requireAdminApi()
  if (auth instanceof Response) return auth

  try {
    const ads = await db.adConfig.findMany({
      orderBy: { key: 'asc' },
    })
    const config: Record<string, { value: string; enabled: boolean; label: string }> = {}
    for (const ad of ads) {
      config[ad.key] = { value: ad.value, enabled: ad.enabled, label: ad.label }
    }
    return NextResponse.json(config)
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar configurações' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdminApi()
  if (auth instanceof Response) return auth

  try {
    const body = await request.json()
    const updates: { key: string; value: string; enabled: boolean; label?: string }[] = Array.isArray(body) ? body : [body]

    for (const update of updates) {
      const data: Record<string, unknown> = {
        value: update.value ?? '',
        enabled: update.enabled ?? false,
      }
      if (update.label !== undefined) {
        data.label = update.label
      }
      await db.adConfig.upsert({
        where: { key: update.key },
        update: data,
        create: {
          key: update.key,
          value: update.value ?? '',
          label: update.label || update.key,
          enabled: update.enabled ?? false,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro ao salvar'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}