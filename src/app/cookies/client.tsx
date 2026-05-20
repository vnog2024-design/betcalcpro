'use client'

import { ToolPageLayout } from '@/components/shared/tool-page-layout'
import { CookiesPolicy } from '@/components/legal/cookies-policy'

export function PageClient() {
  return (
    <ToolPageLayout>
      <CookiesPolicy />
    </ToolPageLayout>
  )
}
