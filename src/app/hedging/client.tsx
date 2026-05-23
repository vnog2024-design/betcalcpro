'use client'

import { ToolPageLayout } from '@/components/shared/tool-page-layout'
import { HedgingCalculator } from '@/components/tools/hedging-calculator'

export function HedgingPageClient() {
  return (
    <ToolPageLayout>
      <HedgingCalculator />
    </ToolPageLayout>
  )
}
