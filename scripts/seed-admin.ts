import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/auth'

const prisma = new PrismaClient()

async function main() {
  const username = 'admin'
  const defaultPassword = 'admin123'

  const existing = await prisma.admin.findUnique({ where: { username } })
  if (existing) {
    console.log(`Admin "${username}" already exists. Skipping.`)
  } else {
    const hashedPassword = await hashPassword(defaultPassword)
    await prisma.admin.create({
      data: { username, password: hashedPassword },
    })
    console.log(`Admin "${username}" created with password: ${defaultPassword}`)
    console.log('IMPORTANT: Change this password after first login!')
  }

  const defaultAds = [
    { key: 'header_code', label: 'Codigo no Header (<head>) — Scripts, pixels, meta tags que rodam no cabecalho do site', value: '', enabled: false },
    { key: 'ads_txt', label: 'Ads.txt — Conteudo do arquivo ads.txt para verificacao de anunciantes (Google AdSense, etc.)', value: '', enabled: false },
    { key: 'banner_top', label: 'Banner Topo — Anuncio horizontal no topo da pagina, acima do conteudo principal (logo apos o header)', value: '', enabled: false },
    { key: 'banner_middle', label: 'Banner Meio — Anuncio horizontal no meio da pagina, entre as secoes de conteudo das ferramentas', value: '', enabled: false },
    { key: 'banner_bottom', label: 'Banner Rodape — Anuncio horizontal na parte inferior, acima do rodape do site', value: '', enabled: false },
    { key: 'in_content', label: 'In-Content — Anuncio fluido dentro do conteudo de artigos, inserido entre paragrafos', value: '', enabled: false },
    { key: 'in_article', label: 'In-Article — Anuncio formatado para dentro do corpo de artigos, com estilo nativo', value: '', enabled: false },
    { key: 'sidebar_ad', label: 'Sidebar — Anuncio vertical na barra lateral, formato 300x250 recomendado', value: '', enabled: false },
    { key: 'in_feed', label: 'In-Feed — Anuncio fluido na lista de artigos, entre os cards de artigo', value: '', enabled: false },
    { key: 'videowall_code', label: 'Videowall (Tela Cheia) — Anuncio em tela cheia que aparece quando o usuario entra no site pela primeira vez. O usuario precisa fechar para continuar.', value: '', enabled: false },
  ]

  for (const ad of defaultAds) {
    await prisma.adConfig.upsert({
      where: { key: ad.key },
      update: {},
      create: ad,
    })
  }

  console.log('Default ad configurations seeded.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())