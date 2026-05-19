'use client'

import { ToolPageLayout } from '@/components/shared/tool-page-layout'
import { SequenceAnalyzer } from '@/components/tools/sequence-analyzer'

export function PageClient() {
  return (
    <ToolPageLayout>
      <SequenceAnalyzer />
    </ToolPageLayout>
  )
}
