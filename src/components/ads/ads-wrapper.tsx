'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { AdInitializer } from '@/components/ads/ad-initializer'
import { AdNotification } from '@/components/ads/ad-notification'
import { AdExitPopup } from '@/components/ads/ad-exit-popup'
import { AdVideowall } from '@/components/ads/ad-videowall'

/**
 * AdsWrapper — renderiza todos os componentes de anuncio EXCETO nas rotas de admin.
 * O admin layout do Next.js aninha dentro do root layout, entao precisamos
 * verificar o pathname para decidir se mostra anuncios ou nao.
 */
export function AdsWrapper({ children }: { children?: ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return null
  }

  return (
    <>
      <AdVideowall />
      <AdInitializer />
      <AdNotification />
      <AdExitPopup />
    </>
  )
}