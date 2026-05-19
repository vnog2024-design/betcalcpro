'use client'

import { ToolPageLayout } from '@/components/shared/tool-page-layout'
import { MasanielloCalculator } from '@/components/tools/masaniello-calculator'

export function PageClient() {
  return (
    <ToolPageLayout>
      <MasanielloCalculator />
    </ToolPageLayout>
  )
}
