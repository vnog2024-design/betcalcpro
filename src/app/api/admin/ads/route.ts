import { NextRequest, NextResponse } from 'next/server'
import { AdsStore } from '@/lib/store'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

async function requireAuth(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token) return false
  const payload = await verifyToken(token)
  return !!payload
}

export async function GET() {
  if (!await requireAuth()) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    await AdsStore.initDefaults()
    const ads = await AdsStore.getAll()
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
  if (!await requireAuth()) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const body = await request.json()
    const updates: Array<{ key: string; value?: string; enabled?: boolean; label?: string }> = Array.isArray(body) ? body : [body]
    await AdsStore.upsertMany(updates)
    return NextResponse.json({ success: true })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro ao salvar'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}