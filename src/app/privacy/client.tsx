'use client'

import { ToolPageLayout } from '@/components/shared/tool-page-layout'
import { PrivacyPolicy } from '@/components/legal/privacy-policy'

export function PageClient() {
  return (
    <ToolPageLayout>
      <PrivacyPolicy />
    </ToolPageLayout>
  )
}
