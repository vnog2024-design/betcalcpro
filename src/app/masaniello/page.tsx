import { Metadata } from 'next'
import { PageClient } from './client'
import { generateToolMetadata, generateToolJsonLd, generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = generateToolMetadata({
  title: 'Calculadora Masaniello',
  description: 'Calculadora Masaniello para gestão avançada de capital. Calcule cenários de alocação combinando probabilidade de sucesso e objetivo de lucro.',
  path: '/masaniello',
})

const toolJsonLd = generateToolJsonLd({
  title: 'Calculadora Masaniello',
  description: 'Calculadora Masaniello para gestão avançada de capital. Calcule cenários de alocação combinando probabilidade de sucesso e objetivo de lucro.',
  path: '/masaniello',
})

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Calculadora Masaniello', url: 'https://betcalcpro.com.br/masaniello' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: 'Calculadora Masaniello',
  description: 'Calculadora Masaniello para gestão avançada de capital. Calcule cenários de alocação combinando probabilidade de sucesso e objetivo de lucro.',
  url: 'https://betcalcpro.com.br/masaniello',
})

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <PageClient />
    </>
  )
}
