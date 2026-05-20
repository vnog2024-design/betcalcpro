'use client'

import { ToolPageLayout } from '@/components/shared/tool-page-layout'
import { SorosCalculator } from '@/components/tools/soros-calculator'

export function PageClient() {
  return (
    <ToolPageLayout>
      <SorosCalculator />
    </ToolPageLayout>
  )
}
