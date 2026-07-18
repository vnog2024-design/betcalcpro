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
      // Default ads.txt (antes da configuracao)
      return new NextResponse(
        '# BetCalc Pro - ads.txt\n# Configure no painel admin: betcalcpro.com.br/admin/anuncios\n',
        {
          status: 200,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
          },
        }
      )
    }

    return new NextResponse(adsTxt, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('[ads.txt] Error:', msg)
    return new NextResponse(`# Error: ${msg}\n`, {
      status: 200, // Return 200 to avoid Google crawl errors
      headers: { 'Content-Type': 'text/plain' },
    })
  }
}