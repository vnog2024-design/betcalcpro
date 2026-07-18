import { NextResponse } from 'next/server'
import { AdsStore } from '@/lib/store'

/**
 * GET /ads.txt
 * 
 * Serve o arquivo ads.txt dinamicamente a partir do admin store.
 * O Google rastreia /ads.txt para verificar autorização de anúncios.
 */
export async function GET() {
  try {
    const ads = await AdsStore.getEnabled()
    const adsTxt = ads.ads_txt

    if (!adsTxt) {
      // Default ads.txt vazio (antes da configuração)
      return new NextResponse(
        '# BetCalc Pro - ads.txt\n# Configure no painel admin em Anúncios > Ads.txt\n',
        {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
          },
        }
      )
    }

    return new NextResponse(adsTxt, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch {
    return new NextResponse('# Error loading ads.txt\n', {
      headers: { 'Content-Type': 'text/plain' },
      status: 500,
    })
  }
}