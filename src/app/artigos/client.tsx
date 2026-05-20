'use client'

import { ToolPageLayout } from '@/components/shared/tool-page-layout'
import { ArticlesList } from '@/components/content/articles-list'

export function ArticlesPageClient() {
  return (
    <ToolPageLayout>
      <ArticlesList />
    </ToolPageLayout>
  )
}
