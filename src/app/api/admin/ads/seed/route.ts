import { NextResponse } from 'next/server'
import { AdsStore } from '@/lib/store'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

/**
 * POST /api/admin/ads/seed
 * 
 * Configura todas as posições de anúncio de uma vez com códigos Adskeeper.
 * Pode ser chamado uma única vez para setup inicial, ou para resetar.
 */
async function requireAuth(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token) return false
  const payload = await verifyToken(token)
  return !!payload
}

export async function POST(request: Request) {
  if (!await requireAuth()) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const body = await request.json()

    // Aceita um objeto com chaves = position e valores = { value, enabled }
    // Se body tiver `adskeeper_site_id`, gera os códigos automaticamente
    const siteId = body.adskeeper_site_id || ''
    const customAds = body.ads || {}

    const updates: Array<{ key: string; value: string; enabled: boolean; label?: string }> = []

    // Se tem site ID do Adskeeper, gera códigos para todas as posições
    if (siteId) {
      // Header: preloader do SimpleJS
      updates.push({
        key: 'header_code',
        value: `<script type="text/javascript" data-cfasync="false">\n(function(W,D,s){Wadx=Wadx||[];var j=D.createElement(s),f=D.getElementsByTagName(s)[0];j.async=1;j.src='https://jsc.adskeeper.com/site/${siteId}.js';f.parentNode.insertBefore(j,f);})(window,document,'script');\n</script>`,
        enabled: true,
      })

      // Banner Top
      updates.push({
        key: 'banner_top',
        value: `<div style="text-align:center;margin:0 auto;max-width:728px;"><div class="adskeeper-native" data-ad-siteid="${siteId}" data-ad-zoneid="ZONE_TOP"></div></div>`,
        enabled: true,
      })

      // Banner Middle
      updates.push({
        key: 'banner_middle',
        value: `<div style="text-align:center;margin:0 auto;max-width:728px;"><div class="adskeeper-native" data-ad-siteid="${siteId}" data-ad-zoneid="ZONE_MIDDLE"></div></div>`,
        enabled: true,
      })

      // Banner Bottom
      updates.push({
        key: 'banner_bottom',
        value: `<div style="text-align:center;margin:0 auto;max-width:728px;"><div class="adskeeper-native" data-ad-siteid="${siteId}" data-ad-zoneid="ZONE_BOTTOM"></div></div>`,
        enabled: true,
      })

      // In-Content
      updates.push({
        key: 'in_content',
        value: `<div style="margin:16px auto;max-width:728px;"><div class="adskeeper-native" data-ad-siteid="${siteId}" data-ad-zoneid="ZONE_CONTENT"></div></div>`,
        enabled: true,
      })

      // In-Article
      updates.push({
        key: 'in_article',
        value: `<div style="margin:16px auto;max-width:640px;"><div class="adskeeper-native" data-ad-siteid="${siteId}" data-ad-zoneid="ZONE_ARTICLE"></div></div>`,
        enabled: true,
      })

      // Sidebar
      updates.push({
        key: 'sidebar_ad',
        value: `<div style="max-width:300px;margin:0 auto;"><div class="adskeeper-native" data-ad-siteid="${siteId}" data-ad-zoneid="ZONE_SIDEBAR"></div></div>`,
        enabled: true,
      })

      // In-Feed
      updates.push({
        key: 'in_feed',
        value: `<div style="margin:12px auto;max-width:728px;"><div class="adskeeper-native" data-ad-siteid="${siteId}" data-ad-zoneid="ZONE_FEED"></div></div>`,
        enabled: true,
      })

      // Ads.txt
      updates.push({
        key: 'ads_txt',
        value: `google.com, pub-3765222786344373, DIRECT, f08c47fec0942fa0\nadskeeper.co.uk, ${siteId}, DIRECT, f08c47fec0942fa0`,
        enabled: true,
      })
    }

    // Aplica configs customizadas (sobrescreve as geradas)
    for (const [key, config] of Object.entries(customAds)) {
      const cfg = config as { value?: string; enabled?: boolean }
      updates.push({
        key,
        value: cfg.value || '',
        enabled: cfg.enabled ?? false,
      })
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'Envie adskeeper_site_id ou ads com as posições' }, { status: 400 })
    }

    await AdsStore.upsertMany(updates)

    return NextResponse.json({
      success: true,
      configured: updates.map(u => u.key),
      note: siteId
        ? `Códigos gerados com site_id=${siteId}. Os ZONE_* devem ser substituídos pelos zone IDs reais do painel Adskeeper.`
        : 'Configurações aplicadas.',
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro ao configurar'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}