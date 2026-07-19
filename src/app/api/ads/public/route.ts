import { NextResponse } from 'next/server'
import { AdsStore } from '@/lib/store'

// Hardcoded Adskeeper fallback — guaranteed to work even if all storage fails
const AK_SITE_ID = '1104734'
const AK_WIDGET_ID = '2056131'
const AK_PRELOADER = '<script src="https://jsc.adskeeper.com/site/' + AK_SITE_ID + '.js" async></' + 'script>'
const AK_PLACEMENT = '<div data-type="_mgwidget" data-widget-id="' + AK_WIDGET_ID + '"></div><script>(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");</' + 'script>'

// Google policy: max 3 ads per page. Selected positions per page type:
// - Tool pages:     banner_top + sidebar_ad = 2 ads
// - Article pages:   banner_top + in_article + sidebar_ad = 3 ads
// - Articles list:   banner_top + in_feed + sidebar_ad = 3 ads
// - Landing:         banner_top + sidebar_ad = 2 ads
// DISABLED: videowall (blocks site), banner_middle, banner_bottom, in_content
const FALLBACK_ADS: Record<string, string> = {
  header_code: AK_PRELOADER,
  banner_top: AK_PLACEMENT,
  sidebar_ad: AK_PLACEMENT,
  in_article: AK_PLACEMENT,
  in_feed: AK_PLACEMENT,
}

export async function GET() {
  let ads: Record<string, string> = {}

  // Try loading from store
  try {
    ads = await AdsStore.getEnabled()
  } catch { /* store unavailable */ }

  // If store returned nothing, use hardcoded Adskeeper fallback
  if (Object.keys(ads).length === 0) {
    ads = FALLBACK_ADS
  }

  const result: Record<string, string> = { ...ads }

  // Collect all enabled videowall entries and pick one randomly
  const videowallKeys = Object.keys(ads).filter(k => k === 'videowall_code' || k.startsWith('videowall_'))
  if (videowallKeys.length > 0) {
    // Remove all videowall entries from the flat response
    for (const vk of videowallKeys) {
      delete result[vk]
    }
    // Pick a random one and set it as 'videowall'
    const randomKey = videowallKeys[Math.floor(Math.random() * videowallKeys.length)]
    result['videowall'] = ads[randomKey]
  }

  return NextResponse.json(result)
}