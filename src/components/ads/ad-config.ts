/**
 * Configuração centralizada dos slots de anúncio do Google AdSense.
 *
 * ANTES da aprovação: use "0000000000" (placeholder).
 * DEPOIS da aprovação: substitua cada slot pelo ID real criado no painel do AdSense.
 *
 * Como obter os IDs reais:
 * 1. Acesse https://www.google.com/adsense/
 * 2. Vá em Anúncios → Por unidade de anúncio
 * 3. Crie unidades de anúncio para cada posição abaixo
 * 4. Copie o data-ad-slot de cada uma e cole aqui
 */
export const AD_SLOTS = {
  /** Banner horizontal — topo das páginas */
  BANNER_TOP: '0000000000',
  /** Banner horizontal — meio das páginas (entre seções) */
  BANNER_MIDDLE: '0000000000',
  /** Banner horizontal — rodapé das páginas */
  BANNER_BOTTOM: '0000000000',
  /** Anúncio in-content — formato fluido dentro do conteúdo */
  IN_CONTENT: '0000000000',
  /** Anúncio in-article — dentro de artigos */
  IN_ARTICLE: '0000000000',
  /** Anúncio sidebar — formato vertical */
  SIDEBAR: '0000000000',
  /** Anúncio in-feed — formato fluido em listas */
  IN_FEED: '0000000000',
} as const

/** Publisher ID do AdSense — não precisa alterar */
export const AD_CLIENT = 'ca-pub-3765222786344373'
