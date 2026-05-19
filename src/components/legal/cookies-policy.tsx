'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowLeft,
  Cookie,
  Settings,
  BarChart3,
  Megaphone,
  Globe,
  Lock,
  CheckCircle,
  AlertTriangle,
  Mail,
  Shield,
} from 'lucide-react'

export function CookiesPolicy() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-neon">
            <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <Cookie className="h-6 w-6 text-neon" />
        <h1 className="text-2xl font-bold">Política de Cookies</h1>
      </div>

      <p className="text-xs text-muted-foreground">Última atualização: Março de 2025</p>

      {/* O Que São Cookies */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">1. O Que São Cookies</h2>
            </div>
            <p>
              Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo (computador, tablet ou
              smartphone) quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem
              de forma mais eficiente, além de fornecer informações aos proprietários do site sobre como os visitantes
              interagem com o conteúdo.
            </p>
            <p>
              Os cookies permitem que um site reconheça o seu dispositivo e lembre informações sobre sua visita, como
              suas preferências e configurações. Eles podem ser classificados de diferentes formas:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Cookies primários:</strong> Definidos pelo site que você está visitando (betcalcpro.com.br);</li>
              <li><strong className="text-foreground">Cookies de terceiros:</strong> Definidos por um domínio diferente do site que você está visitando (ex.: Google, DoubleClick);</li>
              <li><strong className="text-foreground">Cookies de sessão:</strong> Temporários, excluídos quando você fecha o navegador;</li>
              <li><strong className="text-foreground">Cookies persistentes:</strong> Permanecem no seu dispositivo por um período determinado ou até serem excluídos manualmente.</li>
            </ul>
            <p>
              Além dos cookies, podemos utilizar tecnologias similares como web beacons (pixels invisíveis), armazenamento
              local (localStorage e sessionStorage) e identificadores de dispositivo para os mesmos fins descritos nesta política.
            </p>
          </section>
        </CardContent>
      </Card>

      {/* Tipos de Cookies */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">2. Tipos de Cookies que Utilizamos</h2>
            </div>

            {/* Essenciais */}
            <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-green-500" />
                <h3 className="font-semibold text-foreground">2.1 Cookies Essenciais</h3>
              </div>
              <p>
                Estes cookies são estritamente necessários para o funcionamento básico do site e não podem ser desativados.
                Eles permitem que você navegue pelo site e utilize funcionalidades essenciais, como áreas seguras,
                preferências de acesso e armazenamento de cálculos. Sem esses cookies, o site não funcionaria corretamente.
              </p>
              <p>
                <strong className="text-foreground">Base legal:</strong> Execução de contrato e interesse legítimo (Art. 7º, V e IX, LGPD).
                Estes cookies não requerem consentimento prévio.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Cookie</th>
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Finalidade</th>
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Duração</th>
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Tipo</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-1">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">betcalc-storage</td>
                      <td className="py-2 pr-4">Armazena preferências do usuário, histórico de cálculos e configurações do site (localStorage)</td>
                      <td className="py-2 pr-4">Persistente (até limpeza manual)</td>
                      <td className="py-2 pr-4">Primário</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">cookie_consent</td>
                      <td className="py-2 pr-4">Registra sua preferência de consentimento de cookies</td>
                      <td className="py-2 pr-4">12 meses</td>
                      <td className="py-2 pr-4">Primário</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">theme_preference</td>
                      <td className="py-2 pr-4">Armazena preferência de tema (claro/escuro)</td>
                      <td className="py-2 pr-4">Persistente</td>
                      <td className="py-2 pr-4">Primário</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono">color_theme</td>
                      <td className="py-2 pr-4">Armazena preferência de esquema de cores</td>
                      <td className="py-2 pr-4">Persistente</td>
                      <td className="py-2 pr-4">Primário</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Analytics */}
            <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-400" />
                <h3 className="font-semibold text-foreground">2.2 Cookies de Analytics (Desempenho)</h3>
              </div>
              <p>
                Estes cookies nos permitem contar visitas e fontes de tráfego para que possamos medir e melhorar o
                desempenho do nosso site. Eles nos ajudam a saber quais páginas são mais e menos populares e a
                entender como os visitantes navegam pelo site. Todos os dados coletados são anonimizados.
              </p>
              <p>
                <strong className="text-foreground">Base legal:</strong> Consentimento (Art. 7º, I, LGPD). Estes cookies só são
                ativados após seu consentimento expresso.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Cookie</th>
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Finalidade</th>
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Duração</th>
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">_ga</td>
                      <td className="py-2 pr-4">Cookie principal do Google Analytics — distingue usuários únicos por meio de identificador aleatório</td>
                      <td className="py-2 pr-4">2 anos</td>
                      <td className="py-2 pr-4">Terceiro (Google)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">_ga_[ID]</td>
                      <td className="py-2 pr-4">Mantém o estado da sessão do Google Analytics por propriedade</td>
                      <td className="py-2 pr-4">2 anos</td>
                      <td className="py-2 pr-4">Terceiro (Google)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">_gid</td>
                      <td className="py-2 pr-4">Distingue usuários do Google Analytics em um dia</td>
                      <td className="py-2 pr-4">24 horas</td>
                      <td className="py-2 pr-4">Terceiro (Google)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">_gat</td>
                      <td className="py-2 pr-4">Limita a taxa de requisições ao Google Analytics (throttling)</td>
                      <td className="py-2 pr-4">1 minuto</td>
                      <td className="py-2 pr-4">Terceiro (Google)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono">_utm*</td>
                      <td className="py-2 pr-4">Rastreia campanhas de marketing e fontes de tráfego (UTM parameters)</td>
                      <td className="py-2 pr-4">6 meses</td>
                      <td className="py-2 pr-4">Terceiro (Google)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Publicidade */}
            <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-yellow-500" />
                <h3 className="font-semibold text-foreground">2.3 Cookies de Publicidade</h3>
              </div>
              <p>
                Estes cookies são usados para exibir anúncios relevantes para você, limitar o número de vezes que
                você vê um anúncio e ajudar a medir a eficácia da campanha publicitária. Eles são definidos
                principalmente pelo Google AdSense e DoubleClick e podem rastrear sua navegação em diferentes sites.
              </p>
              <p>
                <strong className="text-foreground">Base legal:</strong> Consentimento (Art. 7º, I, LGPD). Estes cookies só são
                ativados após seu consentimento expresso.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Cookie</th>
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Finalidade</th>
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Duração</th>
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">__gads</td>
                      <td className="py-2 pr-4">Cookie do Google AdSense — rastreia interações com anúncios e preferências do usuário</td>
                      <td className="py-2 pr-4">13 meses</td>
                      <td className="py-2 pr-4">Terceiro (Google/DoubleClick)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">__gpi</td>
                      <td className="py-2 pr-4">Cookie do Google Publisher — identifica sessões de anúncios e informações do publisher</td>
                      <td className="py-2 pr-4">13 meses</td>
                      <td className="py-2 pr-4">Terceiro (Google)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">IDE</td>
                      <td className="py-2 pr-4">DoubleClick (Google) — publicidade direcionada, remarketing e segmentação por interesses</td>
                      <td className="py-2 pr-4">13 meses</td>
                      <td className="py-2 pr-4">Terceiro (Google/DoubleClick)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">DSID</td>
                      <td className="py-2 pr-4">DoubleClick — segmentação de anúncios e identificação de sessão</td>
                      <td className="py-2 pr-4">2 semanas</td>
                      <td className="py-2 pr-4">Terceiro (Google/DoubleClick)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">_gcl_au</td>
                      <td className="py-2 pr-4">Google Conversion Linker — rastreia conversões de anúncios e eficácia de campanhas</td>
                      <td className="py-2 pr-4">3 meses</td>
                      <td className="py-2 pr-4">Terceiro (Google)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">NID</td>
                      <td className="py-2 pr-4">Google — armazena preferências do usuário para anúncios personalizados e idioma</td>
                      <td className="py-2 pr-4">6 meses</td>
                      <td className="py-2 pr-4">Terceiro (Google)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono">FLC</td>
                      <td className="py-2 pr-4">DoubleClick — rastreamento de conversão e frequência de anúncios</td>
                      <td className="py-2 pr-4">1 dia</td>
                      <td className="py-2 pr-4">Terceiro (Google/DoubleClick)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Google AdSense Cookies */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">3. Detalhamento dos Cookies do Google AdSense</h2>
            </div>
            <p>
              O Google AdSense é o serviço de publicidade que utilizamos para exibir anúncios em nosso site, permitindo
              que nossas ferramentas permaneçam gratuitas. Quando você visita nosso site, o Google AdSense pode definir
              cookies no seu dispositivo para as seguintes finalidades:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Segmentação:</strong> Exibir anúncios relevantes com base no seu perfil de interesses e histórico de navegação;</li>
              <li><strong className="text-foreground">Frequência:</strong> Limitar o número de vezes que você vê o mesmo anúncio (frequency capping);</li>
              <li><strong className="text-foreground">Medição:</strong> Medir a eficácia dos anúncios exibidos (impressões, cliques, conversões);</li>
              <li><strong className="text-foreground">Remarketing:</strong> Permitir a exibição de anúncios relacionados ao BetCalc Pro em outros sites que você visitar;</li>
              <li><strong className="text-foreground">Coleta de dados:</strong> Coletar dados sobre interações com anúncios, como cliques, visualizações e tempo de visualização;</li>
              <li><strong className="text-foreground">Relatórios:</strong> Fornecer relatórios de desempenho aos anunciantes e publishers.</li>
            </ul>
            <p>
              Os cookies do Google AdSense (incluindo DoubleClick) coletam informações como: endereço IP (anonimizado),
              tipo de navegador, idioma, resolução de tela, URL da página visitada, dados sobre interações com anúncios,
              identificador único do cookie e dados demográficos estimados.
            </p>
            <p>
              Essas informações são processadas pelo Google conforme sua{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                Política de Privacidade
              </a>{' '}
              e seus{' '}
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                termos de uso de publicidade
              </a>.
            </p>
          </section>
        </CardContent>
      </Card>

      {/* Google Analytics Cookies */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">4. Detalhamento dos Cookies do Google Analytics</h2>
            </div>
            <p>
              Utilizamos o Google Analytics para coletar informações sobre como os visitantes utilizam nosso site,
              permitindo-nos melhorar continuamente a experiência do usuário e o conteúdo oferecido. O Google Analytics
              coleta informações de forma anônima, incluindo:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Número total de visitantes e sessões;</li>
              <li>Páginas visitadas e tempo de permanência em cada uma;</li>
              <li>Fluxo de navegação entre páginas (comportamento do usuário);</li>
              <li>Dispositivo, navegador e sistema operacional utilizados;</li>
              <li>Localização geográfica aproximada (país e cidade, sem precisão de endereço);</li>
              <li>Fonte de tráfego (direto, orgânico, referência, redes sociais, campanhas);</li>
              <li>Taxa de rejeição (bounce rate) e eventos de interação;</li>
              <li>Velocidade de carregamento das páginas.</li>
            </ul>
            <p>
              O Google Analytics utiliza cookies primários (_ga, _gid, _gat) para definir e distinguir usuários e
              limitar a taxa de requisições. O endereço IP é anonimizado no momento da coleta por meio da função
              &quot;anonymizeIp&quot;, garantindo que não seja possível identificar indivíduos. Os dados são agregados
              e processados de forma estatística.
            </p>
            <p>
              Para mais informações sobre cookies do Google Analytics, consulte a{' '}
              <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                documentação oficial de uso de cookies do Google Analytics
              </a>.
            </p>
          </section>
        </CardContent>
      </Card>

      {/* Opt-out Instructions */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">5. Como Desativar e Gerenciar Cookies</h2>
            </div>
            <p>
              Você tem o direito de decidir se aceita ou não cookies. A maioria dos navegadores permite que você
              controle cookies através das configurações de preferências. Abaixo estão as instruções para os
              navegadores mais utilizados:
            </p>
            <div className="space-y-3">
              {[
                {
                  browser: 'Google Chrome',
                  instructions: 'Configurações → Privacidade e segurança → Cookies e outros dados do site → Gerenciar todos os dados do site',
                },
                {
                  browser: 'Mozilla Firefox',
                  instructions: 'Configurações → Privacidade e Segurança → Cookies e dados do site → Gerenciar dados',
                },
                {
                  browser: 'Safari (macOS)',
                  instructions: 'Preferências → Privacidade → Cookies e dados do site → Gerenciar dados do site',
                },
                {
                  browser: 'Safari (iOS)',
                  instructions: 'Ajustes → Safari → Avançado → Dados do site → Remover todos os dados',
                },
                {
                  browser: 'Microsoft Edge',
                  instructions: 'Configurações → Cookies e permissões do site → Gerenciar e excluir cookies e dados do site',
                },
                {
                  browser: 'Opera',
                  instructions: 'Configurações → Privacidade e segurança → Cookies e outros dados do site',
                },
              ].map((item) => (
                <div key={item.browser} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neon/20 text-neon text-xs font-bold">
                    {item.browser[0]}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{item.browser}</p>
                    <p className="text-xs">{item.instructions}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 mt-4">
              <h3 className="font-semibold text-foreground">Ferramentas de opt-out do Google</h3>
              <p>
                Além das configurações do navegador, você pode desativar especificamente os cookies do Google:
              </p>
              <ul className="space-y-1 ml-4">
                <li>
                  <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                    Configurações de Anúncios do Google
                  </a>{' '}
                  — desativar anúncios personalizados
                </li>
                <li>
                  <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                    adssettings.google.com
                  </a>{' '}
                  — gerenciar preferências de publicidade
                </li>
                <li>
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                    Complemento de desativação do Google Analytics
                  </a>{' '}
                  — opt-out do rastreamento do Analytics
                </li>
                <li>
                  <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                    Network Advertising Initiative
                  </a>{' '}
                  — opt-out de cookies de publicidade de múltiplas redes
                </li>
                <li>
                  <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                    Digital Advertising Alliance
                  </a>{' '}
                  — opt-out de publicidade comportamental
                </li>
                <li>
                  <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                    Your Online Choices (Europa)
                  </a>{' '}
                  — gerenciar preferências de cookies de publicidade
                </li>
              </ul>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-500 mb-1">Atenção</p>
                  <p>
                    A desativação de cookies pode afetar a funcionalidade do site. Cookies essenciais não podem ser
                    desativados, pois são necessários para o funcionamento básico das ferramentas. Ao desativar cookies
                    de analytics e publicidade, o site continuará funcionando, mas: (a) você verá anúncios menos
                    relevantes; (b) não poderemos melhorar o site com base em dados de uso; (c) algumas funcionalidades
                    de personalização não estarão disponíveis.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Cookies de Terceiros */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">6. Cookies de Terceiros</h2>
            <p>
              Alguns cookies em nosso site são definidos por serviços de terceiros que aparecem em nossas páginas.
              Estes terceiros são responsáveis por seus próprios cookies e práticas de privacidade:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Google AdSense / DoubleClick:</strong> Para exibição de anúncios, remarketing e medição de eficácia publicitária;</li>
              <li><strong className="text-foreground">Google Analytics:</strong> Para análise de tráfego, comportamento dos usuários e melhoria contínua do site;</li>
              <li><strong className="text-foreground">Google (geral):</strong> Para serviços de autenticação, preferências do usuário e infraestrutura técnica.</li>
            </ul>
            <p>
              Não temos controle sobre os cookies definidos por esses serviços de terceiros. Recomendamos que você
              consulte as políticas de privacidade desses provedores para obter mais informações sobre seus cookies
              e como gerenciá-los:
            </p>
            <ul className="space-y-1 ml-4">
              <li>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                  Política de Privacidade do Google
                </a>
              </li>
              <li>
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                  Como o Google usa informações de sites ou apps que usam nossos serviços
                </a>
              </li>
              <li>
                <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                  Como o Google usa cookies
                </a>
              </li>
            </ul>
          </section>
        </CardContent>
      </Card>

      {/* LGPD e Consentimento */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">7. LGPD e Consentimento de Cookies</h2>
            </div>
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018) e o Marco Civil da
              Internet (Lei nº 12.965/2014), solicitamos seu consentimento antes de definir cookies não essenciais
              no seu dispositivo. Nosso mecanismo de consentimento funciona da seguinte forma:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Banner de consentimento:</strong> Ao acessar nosso site pela primeira vez, você será informado sobre o uso de cookies por meio de um banner de consentimento. Você pode aceitar todos os cookies, rejeitar cookies não essenciais ou personalizar suas preferências;</li>
              <li><strong className="text-foreground">Consentimento granular:</strong> Você pode optar por aceitar ou rejeitar categorias específicas de cookies (analytics, publicidade), mantendo os cookies essenciais sempre ativos;</li>
              <li><strong className="text-foreground">Revogação:</strong> Seu consentimento é voluntário e pode ser revogado a qualquer momento, sem comprometer a licitude do tratamento anterior. Para revogar o consentimento, você pode limpar os cookies do navegador (o que exibirá o banner novamente) ou entrar em contato conosco;</li>
              <li><strong className="text-foreground">Registro:</strong> Mantemos um registro do seu consentimento (data, hora e preferências) em conformidade com o Art. 8º, § 5º da LGPD;</li>
              <li><strong className="text-foreground">Renovação:</strong> O consentimento é renovado automaticamente a cada 12 meses, quando um novo banner será exibido.</li>
            </ul>
          </section>
        </CardContent>
      </Card>

      {/* Consentimento */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">8. Seus Direitos</h2>
            </div>
            <p>
              Em conformidade com a LGPD, você tem os seguintes direitos em relação aos cookies e dados coletados:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Direito de acesso:</strong> Saber quais cookies estão definidos no seu dispositivo e quais dados eles contêm;</li>
              <li><strong className="text-foreground">Direito de retificação:</strong> Solicitar a correção de dados imprecisos armazenados em cookies;</li>
              <li><strong className="text-foreground">Direito de eliminação:</strong> Solicitar a eliminação de dados pessoais armazenados em cookies;</li>
              <li><strong className="text-foreground">Direito de revogação:</strong> Revogar o consentimento para cookies não essenciais a qualquer momento;</li>
              <li><strong className="text-foreground">Direito de reclamação:</strong> Apresentar reclamação à ANPD caso entenda que seus direitos foram violados.</li>
            </ul>
            <p>
              Para exercer qualquer direito, entre em contato com nosso Encarregado de Proteção de Dados pelo e-mail{' '}
              <a href="mailto:privacidade@betcalcpro.com.br" className="text-neon underline hover:no-underline">privacidade@betcalcpro.com.br</a>.
            </p>
          </section>
        </CardContent>
      </Card>

      {/* Alterações */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">9. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta Política de Cookies periodicamente para refletir alterações nos cookies que
              utilizamos ou por outras razões operacionais, legais ou regulatórias. Quaisquer alterações significativas
              serão comunicadas por meio de aviso em nosso site. Recomendamos que visite esta página regularmente para
              se manter informado sobre o uso de cookies.
            </p>
          </section>

          <div className="pt-4 border-t border-border/50 space-y-2">
            <p className="text-xs text-muted-foreground italic">
              Para mais informações sobre como tratamos seus dados pessoais, consulte nossa{' '}
              <Link href="/privacy" className="text-neon underline hover:no-underline">
                Política de Privacidade
              </Link>{' '}
              e nossos{' '}
              <Link href="/terms" className="text-neon underline hover:no-underline">
                Termos de Uso
              </Link>.
            </p>
            <p className="text-xs text-muted-foreground italic">
              Em caso de dúvidas sobre cookies, entre em contato:{' '}
              <a href="mailto:contato@betcalcpro.com.br" className="text-neon underline hover:no-underline">contato@betcalcpro.com.br</a>{' '}
              ou{' '}
              <a href="mailto:privacidade@betcalcpro.com.br" className="text-neon underline hover:no-underline">privacidade@betcalcpro.com.br</a>{' '}
              (Encarregado de Proteção de Dados).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
