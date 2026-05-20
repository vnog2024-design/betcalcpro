'use client'

import { ToolPageLayout } from '@/components/shared/tool-page-layout'
import { BankrollCalculator } from '@/components/tools/bankroll-calculator'

export function PageClient() {
  return (
    <ToolPageLayout>
      <BankrollCalculator />
    </ToolPageLayout>
  )
}
