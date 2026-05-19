'use client'

import { ToolPageLayout } from '@/components/shared/tool-page-layout'
import { MartingaleCalculator } from '@/components/tools/martingale-calculator'

export function MartingalePageClient() {
  return (
    <ToolPageLayout>
      <MartingaleCalculator />
    </ToolPageLayout>
  )
}
