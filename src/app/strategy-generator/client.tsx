'use client'

import { ToolPageLayout } from '@/components/shared/tool-page-layout'
import { StrategyGenerator } from '@/components/tools/strategy-generator'

export function PageClient() {
  return (
    <ToolPageLayout>
      <StrategyGenerator />
    </ToolPageLayout>
  )
}
