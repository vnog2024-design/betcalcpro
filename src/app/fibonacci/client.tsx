'use client'

import { ToolPageLayout } from '@/components/shared/tool-page-layout'
import { FibonacciCalculator } from '@/components/tools/fibonacci-calculator'

export function PageClient() {
  return (
    <ToolPageLayout>
      <FibonacciCalculator />
    </ToolPageLayout>
  )
}
