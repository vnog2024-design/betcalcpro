'use client'

import { ToolPageLayout } from '@/components/shared/tool-page-layout'
import { CyclesCalculator } from '@/components/tools/cycles-calculator'

export function PageClient() {
  return (
    <ToolPageLayout>
      <CyclesCalculator />
    </ToolPageLayout>
  )
}
