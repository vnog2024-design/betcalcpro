'use client'

import { ToolPageLayout } from '@/components/shared/tool-page-layout'
import { ArticleContent } from '@/components/content/article-content'
import { useParams } from 'next/navigation'

export function ArticlePageClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = useParams<{ slug: string }>() as { slug: string }
  return (
    <ToolPageLayout>
      <ArticleContent slug={slug} />
    </ToolPageLayout>
  )
}
