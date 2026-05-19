'use client'

import { ToolPageLayout } from '@/components/shared/tool-page-layout'
import { TermsOfUse } from '@/components/legal/terms-of-use'

export function PageClient() {
  return (
    <ToolPageLayout>
      <TermsOfUse />
    </ToolPageLayout>
  )
}
