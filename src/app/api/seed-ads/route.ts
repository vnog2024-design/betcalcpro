import { NextResponse } from 'next/server'

/**
 * One-time seed endpoint for Adskeeper ad configuration.
 * Call GET /api/seed-ads after deployment to populate all 9 ad positions.
 * Can be called multiple times safely (idempotent upsert).
 *
 * Adskeeper widget format:
 * - Preloader (in header_code): <script src="https://jsc.adskeeper.com/site/1104734.js" async></script>
 * - Placement (per position): <div data-type="_mgwidget" data-widget-id="2056131"></div><script>(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");</script>
 */

const SITE_ID = '1104734'
const WIDGET_ID = '2056131'

const PRELOADER = `<script src="https://jsc.adskeeper.com/site/${SITE_ID}.js" async><\/script>`

const PLACEMENT = `<div data-type="_mgwidget" data-widget-id="${WIDGET_ID}"></div><script>(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");<\/script>`

const AD_CONFIGS = [
  {
    key: 'header_code',
    value: PRELOADER,
    label: 'Codigo no Header (<head>) — Adskeeper preloader script',
    enabled: true,
  },
  {
    key: 'banner_top',
    value: PLACEMENT,
    label: 'Banner Topo — Adskeeper widget',
    enabled: true,
  },
  {
    key: 'banner_middle',
    value: PLACEMENT,
    label: 'Banner Meio — Adskeeper widget',
    enabled: true,
  },
  {
    key: 'banner_bottom',
    value: PLACEMENT,
    label: 'Banner Rodape — Adskeeper widget',
    enabled: true,
  },
  {
    key: 'in_content',
    value: PLACEMENT,
    label: 'In-Content — Adskeeper widget',
    enabled: true,
  },
  {
    key: 'in_article',
    value: PLACEMENT,
    label: 'In-Article — Adskeeper widget',
    enabled: true,
  },
  {
    key: 'sidebar_ad',
    value: PLACEMENT,
    label: 'Sidebar — Adskeeper widget',
    enabled: true,
  },
  {
    key: 'in_feed',
    value: PLACEMENT,
    label: 'In-Feed — Adskeeper widget',
    enabled: true,
  },
  {
    key: 'videowall_code',
    value: PLACEMENT,
    label: 'Videowall (Tela Cheia) — Adskeeper widget',
    enabled: true,
  },
]

export async function GET() {
  try {
    const { AdsStore } = await import('@/lib/store')

    const updates = AD_CONFIGS.map((c) => ({
      key: c.key,
      value: c.value,
      enabled: c.enabled,
      label: c.label,
    }))

    await AdsStore.upsertMany(updates)

    // Verify by reading back
    const all = await AdsStore.getAll()
    const enabled = await AdsStore.getEnabled()
    const enabledKeys = Object.keys(enabled)

    return NextResponse.json({
      success: true,
      message: 'All 9 Adskeeper positions seeded successfully',
      enabled_positions: enabledKeys,
      total_configured: all.length,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ success: false, error: msg }, { status: 500 })
  }
}