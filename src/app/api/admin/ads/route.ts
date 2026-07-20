import { NextRequest, NextResponse } from 'next/server'
import { AdsStore } from '@/lib/store'

async function requireAuth(): Promise<boolean> {
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token) return false

  const { verifyToken } = await import('@/lib/auth')
  return !!(await verifyToken(token))
}

/** GET /api/admin/ads — returns Record<string, AdConfigItem> */
export async function GET() {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const ads = await AdsStore.getAll()
    // Convert array to Record keyed by ad key (as the admin page expects)
    const record: Record<string, { value: string; enabled: boolean; label: string; position?: string }> = {}
    for (const ad of ads) {
      record[ad.key] = {
        value: ad.value,
        enabled: ad.enabled,
        label: ad.label,
      }
    }
    return NextResponse.json(record)
  } catch (error) {
    console.error('Ads GET error:', error)
    return NextResponse.json({ error: 'Erro ao buscar anúncios' }, { status: 500 })
  }
}

/** PUT /api/admin/ads — bulk upsert ad configs */
export async function PUT(request: NextRequest) {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const updates: Array<{ key: string; value?: string; enabled?: boolean; label?: string; position?: string }> = await request.json()
    if (!Array.isArray(updates)) {
      return NextResponse.json({ error: 'Formato inválido: esperado array' }, { status: 400 })
    }

    await AdsStore.upsertMany(updates)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Ads PUT error:', error)
    return NextResponse.json({ error: 'Erro ao salvar anúncios' }, { status: 500 })
  }
}

/** DELETE /api/admin/ads?key=xxx — delete a single ad config */
export async function DELETE(request: NextRequest) {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const key = request.nextUrl.searchParams.get('key')
    if (!key) {
      return NextResponse.json({ error: 'Parâmetro "key" é obrigatório' }, { status: 400 })
    }

    const deleted = await AdsStore.delete(key)
    if (!deleted) {
      return NextResponse.json({ error: 'Anúncio não encontrado' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Ads DELETE error:', error)
    return NextResponse.json({ error: 'Erro ao deletar anúncio' }, { status: 500 })
  }
}