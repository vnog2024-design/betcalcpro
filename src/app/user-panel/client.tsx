'use client'

import { ToolPageLayout } from '@/components/shared/tool-page-layout'
import { UserPanel } from '@/components/tools/user-panel'

export function UserPanelClient() {
  return (
    <ToolPageLayout>
      <UserPanel />
    </ToolPageLayout>
  )
}
