import { NextRequest, NextResponse } from 'next/server'

/**
 * Admin API para anúncios — funciona no Vercel sem banco.
 * Usa o data/admin_ads.json como storage (deploy junto com o código).
 */

const DEFAULT_ADS: Record<string, { value: string; enabled: boolean; label: string }> = {
  header_banner:  { value: '2056709', enabled: true,  label: 'Widget do Cabeçalho' },
  sidebar:        { value: '2056711', enabled: true,  label: 'Widget da Barra Lateral' },
  below_article:  { value: '2056706', enabled: true,  label: 'Widget Embaixo do Artigo' },
  in_article:     { value: '2056707', enabled: true,  label: 'Widget no Artigo' },
  feed:           { value: '2056705', enabled: true,  label: 'Feed' },
  notification:   { value: '2056713', enabled: true,  label: 'Notificação no Site' },
  exit_popup:     { value: '2056714', enabled: true,  label: 'Sair do Pop-up' },
}

async function requireAuth(): Promise<boolean> {
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token) return false
  const { verifyToken } = await import('@/lib/auth')
  return !!(await verifyToken(token))
}

/** Lê os dados salvos (merge com defaults) */
async function loadAds(): Promise<Record<string, { value: string; enabled: boolean; label: string }>> {
  try {
    const { AdsStore } = await import('@/lib/store')
    const all = await AdsStore.getAll()
    const result: Record<string, { value: string; enabled: boolean; label: string }> = {}
    for (const ad of all) {
      result[ad.key] = { value: ad.value, enabled: ad.enabled, label: ad.label }
    }
    return result
  } catch {
    return { ...DEFAULT_ADS }
  }
}

/** GET /api/admin/ads */
export async function GET() {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const ads = await loadAds()
    return NextResponse.json(ads)
  } catch (error) {
    console.error('Ads GET error:', error)
    return NextResponse.json({ error: 'Erro ao buscar anúncios' }, { status: 500 })
  }
}

/** PUT /api/admin/ads — bulk upsert */
export async function PUT(request: NextRequest) {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const updates: Array<{ key: string; value?: string; enabled?: boolean; label?: string }> = await request.json()
    if (!Array.isArray(updates)) {
      return NextResponse.json({ error: 'Formato inválido: esperado array' }, { status: 400 })
    }

    const { AdsStore } = await import('@/lib/store')
    await AdsStore.upsertMany(updates)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Ads PUT error:', error)
    return NextResponse.json({ error: 'Erro ao salvar anúncios' }, { status: 500 })
  }
}

/** DELETE /api/admin/ads?key=xxx */
export async function DELETE(request: NextRequest) {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const key = request.nextUrl.searchParams.get('key')
    if (!key) {
      return NextResponse.json({ error: 'Parâmetro "key" é obrigatório' }, { status: 400 })
    }

    const { AdsStore } = await import('@/lib/store')
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