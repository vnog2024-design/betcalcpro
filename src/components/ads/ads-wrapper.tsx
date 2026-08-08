'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { AdInitializer } from '@/components/ads/ad-initializer'
import { AdNotification } from '@/components/ads/ad-notification'
import { AdExitPopup } from '@/components/ads/ad-exit-popup'
import { AdVideowall } from '@/components/ads/ad-videowall'

/**
 * AdsWrapper — renders all ad components.
 * - Admin routes: no ads at all
 * - Non-admin: ads only load AFTER cookie consent is given
 * - AdInitializer handles consent check and dynamic preloader loading
 */
export function AdsWrapper({ children }: { children?: ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return null
  }

  return (
    <>
      <AdInitializer />
      <AdVideowall />
      <AdNotification />
      <AdExitPopup />
    </>
  )
}
