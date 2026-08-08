import { NextRequest, NextResponse } from 'next/server'
import { AdsStore } from '@/lib/store'

/**
 * Admin API para anuncios — Prisma-backed.
 */

async function requireAuth(): Promise<boolean> {
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token) return false
  const { verifyToken } = await import('@/lib/auth')
  return !!(await verifyToken(token))
}

/** GET /api/admin/ads */
export async function GET() {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })

  try {
    const ads = await AdsStore.getAll()
    return NextResponse.json(ads)
  } catch (error) {
    console.error('Ads GET error:', error)
    return NextResponse.json({ error: 'Erro ao buscar anuncios' }, { status: 500 })
  }
}

/** PUT /api/admin/ads — bulk upsert */
export async function PUT(request: NextRequest) {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })

  try {
    const updates: Array<{ key: string; value?: string; enabled?: boolean; label?: string }> = await request.json()
    if (!Array.isArray(updates)) {
      return NextResponse.json({ error: 'Formato invalido: esperado array' }, { status: 400 })
    }

    await AdsStore.upsertMany(updates)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Ads PUT error:', error)
    return NextResponse.json({ error: 'Erro ao salvar anuncios' }, { status: 500 })
  }
}

/** DELETE /api/admin/ads?key=xxx */
export async function DELETE(request: NextRequest) {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })

  try {
    const key = request.nextUrl.searchParams.get('key')
    if (!key) {
      return NextResponse.json({ error: 'Parametro "key" e obrigatorio' }, { status: 400 })
    }

    const deleted = await AdsStore.delete(key)
    if (!deleted) {
      return NextResponse.json({ error: 'Anuncio nao encontrado' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Ads DELETE error:', error)
    return NextResponse.json({ error: 'Erro ao deletar anuncio' }, { status: 500 })
  }
}