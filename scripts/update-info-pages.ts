import { writeFileSync } from 'fs'
import { join } from 'path'

interface PageConfig {
  path: string
  clientImport: string
  title: string
  description: string
  breadcrumbName: string
}

const pages: PageConfig[] = [
  {
    path: 'about',
    clientImport: 'AboutPageClient',
    title: 'Sobre Nós — BetCalc Pro',
    description: 'Conheça o BetCalc Pro, nossa missão de democratizar a educação matemática e os valores que guiam nossa plataforma gratuita.',
    breadcrumbName: 'Sobre Nós',
  },
  {
    path: 'contact',
    clientImport: 'ContactPageClient',
    title: 'Contato — BetCalc Pro',
    description: 'Entre em contato com a equipe BetCalc Pro. Envie dúvidas, sugestões ou reporte problemas pelo nosso formulário de contato.',
    breadcrumbName: 'Contato',
  },
  {
    path: 'privacy',
    clientImport: 'PrivacyPageClient',
    title: 'Política de Privacidade — BetCalc Pro',
    description: 'Política de Privacidade do BetCalc Pro. Saiba como tratamos seus dados, quais informações coletamos e como protegemos sua privacidade.',
    breadcrumbName: 'Privacidade',
  },
  {
    path: 'terms',
    clientImport: 'TermsPageClient',
    title: 'Termos de Uso — BetCalc Pro',
    description: 'Termos de Uso do BetCalc Pro. Conheça as condições de utilização das nossas ferramentas educacionais gratuitas.',
    breadcrumbName: 'Termos',
  },
  {
    path: 'cookies',
    clientImport: 'CookiesPageClient',
    title: 'Política de Cookies — BetCalc Pro',
    description: 'Política de Cookies do BetCalc Pro. Entenda como utilizamos cookies essenciais e de publicidade no nosso site.',
    breadcrumbName: 'Cookies',
  },
  {
    path: 'responsible-gaming',
    clientImport: 'ResponsibleGamingClient',
    title: 'Uso Responsável — BetCalc Pro',
    description: 'Compromisso do BetCalc Pro com o uso responsável. Informações sobre limites, autocontrole e responsabilidade no uso de ferramentas de probabilidade.',
    breadcrumbName: 'Uso Responsável',
  },
  {
    path: 'user-panel',
    clientImport: 'UserPanelClient',
    title: 'Meu Painel — BetCalc Pro',
    description: 'Seu dashboard pessoal com histórico de cálculos, conquistas e preferências salvas localmente no dispositivo.',
    breadcrumbName: 'Painel',
  },
]

const BASE = '/home/z/my-project/src/app'
const OG_IMAGE = 'https://betcalcpro.com.br/og-image.png'

for (const page of pages) {
  const url = `https://betcalcpro.com.br/${page.path}`
  const content = `import { Metadata } from 'next'
import { ${page.clientImport} } from './client'
import { generateBreadcrumbJsonLd, generateWebPageJsonLd } from '@/lib/seo-utils'

export const metadata: Metadata = {
  title: '${page.title}',
  description: '${page.description}',
  alternates: {
    canonical: '${url}',
  },
  openGraph: {
    title: '${page.title}',
    description: '${page.description}',
    url: '${url}',
    siteName: 'BetCalc Pro',
    images: [{ url: '${OG_IMAGE}', width: 1344, height: 768 }],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '${page.title}',
    description: '${page.description}',
    images: ['${OG_IMAGE}'],
  },
}

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: '${page.breadcrumbName}', url: '${url}' },
])

const webPageJsonLd = generateWebPageJsonLd({
  name: '${page.title}',
  description: '${page.description}',
  url: '${url}',
})

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <${page.clientImport} />
    </>
  )
}
`
  writeFileSync(join(BASE, page.path, 'page.tsx'), content)
  console.log(`✅ Updated: ${page.path}/page.tsx`)
}

console.log(`\nDone! Updated ${pages.length} pages.`)
