'use client'

import { ToolPageLayout } from '@/components/shared/tool-page-layout'
import { ProbabilitySimulator } from '@/components/tools/probability-simulator'

export function PageClient() {
  return (
    <ToolPageLayout>
      <ProbabilitySimulator />
    </ToolPageLayout>
  )
}
