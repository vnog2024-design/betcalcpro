'use client'

import { ToolPageLayout } from '@/components/shared/tool-page-layout'
import { RecoveryCalculator } from '@/components/tools/recovery-calculator'

export function PageClient() {
  return (
    <ToolPageLayout>
      <RecoveryCalculator />
    </ToolPageLayout>
  )
}
