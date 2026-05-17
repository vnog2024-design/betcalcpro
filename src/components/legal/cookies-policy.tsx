'use client'

import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Cookie, Settings, BarChart3, Megaphone, Globe, Lock, CheckCircle } from 'lucide-react'

export function CookiesPolicy() {
  const { setCurrentPage } = useAppStore()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => setCurrentPage('home')} className="text-muted-foreground hover:text-neon">
          <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
        </Button>
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
              de forma mais eficiente, além de fornecer informações aos proprietários do site.
            </p>
            <p>
              Os cookies permitem que um site reconheça o seu dispositivo e lembre informações sobre sua visita, como
              suas preferências e configurações. Eles podem ser &quot;primários&quot; (definidos pelo site que você está
              visitando) ou &quot;terceiros&quot; (definidos por um domínio diferente do site que você está visitando).
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
                Estes cookies são necessários para o funcionamento básico do site e não podem ser desativados. Eles
                permitem que você navegue pelo site e utilize funcionalidades essenciais, como áreas seguras e
                preferências de acesso.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Cookie</th>
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Finalidade</th>
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Duração</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-1">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">betcalc-storage</td>
                      <td className="py-2 pr-4">Armazena preferências do usuário, histórico de cálculos e configurações do site</td>
                      <td className="py-2 pr-4">Persistente (até limpeza manual)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">cookie_consent</td>
                      <td className="py-2 pr-4">Registra sua preferência de consentimento de cookies</td>
                      <td className="py-2 pr-4">12 meses</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Analytics */}
            <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-400" />
                <h3 className="font-semibold text-foreground">2.2 Cookies de Analytics</h3>
              </div>
              <p>
                Estes cookies nos permitem contar visitas e fontes de tráfego para que possamos medir e melhorar o
                desempenho do nosso site. Eles nos ajudam a saber quais páginas são mais e menos populares e a
                entender como os visitantes navegam pelo site.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Cookie</th>
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Finalidade</th>
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Duração</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">_ga</td>
                      <td className="py-2 pr-4">Cookie principal do Google Analytics — distingue usuários únicos</td>
                      <td className="py-2 pr-4">2 anos</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">_ga_[ID]</td>
                      <td className="py-2 pr-4">Mantém o estado da sessão do Google Analytics</td>
                      <td className="py-2 pr-4">2 anos</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">_gid</td>
                      <td className="py-2 pr-4">Distingue usuários do Google Analytics em um dia</td>
                      <td className="py-2 pr-4">24 horas</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">_gat</td>
                      <td className="py-2 pr-4">Limita a taxa de requisições ao Google Analytics</td>
                      <td className="py-2 pr-4">1 minuto</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono">_utm*</td>
                      <td className="py-2 pr-4">Rastreia campanhas de marketing e fontes de tráfego</td>
                      <td className="py-2 pr-4">6 meses</td>
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
                Estes cookies são usados para exibir anúncios relevantes para você. Eles também são usados para limitar
                o número de vezes que você vê um anúncio e ajudar a medir a eficácia da campanha publicitária.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Cookie</th>
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Finalidade</th>
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Duração</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">__gads</td>
                      <td className="py-2 pr-4">Cookie do Google AdSense — rastreia interações com anúncios</td>
                      <td className="py-2 pr-4">13 meses</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">__gpi</td>
                      <td className="py-2 pr-4">Cookie do Google Publisher — identifica sessões de anúncios</td>
                      <td className="py-2 pr-4">13 meses</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">IDE</td>
                      <td className="py-2 pr-4">DoubleClick (Google) — publicidade direcionada e remarketing</td>
                      <td className="py-2 pr-4">13 meses</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">DSID</td>
                      <td className="py-2 pr-4">DoubleClick — segmentação de anúncios</td>
                      <td className="py-2 pr-4">2 semanas</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">_gcl_au</td>
                      <td className="py-2 pr-4">Google Conversion Linker — rastreia conversões de anúncios</td>
                      <td className="py-2 pr-4">3 meses</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono">NID</td>
                      <td className="py-2 pr-4">Google — armazena preferências do usuário para anúncios personalizados</td>
                      <td className="py-2 pr-4">6 meses</td>
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
              <h2 className="text-lg font-semibold text-foreground">3. Cookies do Google AdSense</h2>
            </div>
            <p>
              O Google AdSense é o serviço de publicidade que utilizamos para exibir anúncios em nosso site. Quando
              você visita nosso site, o Google AdSense pode definir cookies no seu dispositivo para:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Exibir anúncios relevantes com base no seu perfil de interesses;</li>
              <li>Limitar a frequência com que você vê o mesmo anúncio;</li>
              <li>Medir a eficácia dos anúncios exibidos;</li>
              <li>Permitir o remarketing — exibir anúncios do BetCalc Pro em outros sites que você visitar;</li>
              <li>Coletar dados sobre interações com anúncios (cliques, visualizações, conversões).</li>
            </ul>
            <p>
              Os cookies do Google AdSense (incluindo DoubleClick) coletam informações como: endereço IP (anonimizado),
              tipo de navegador, idioma, resolução de tela, URL da página visitada, dados sobre interações com anúncios
              e identificador único do cookie.
            </p>
            <p>
              Para gerenciar suas preferências de publicidade do Google, visite{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                Configurações de Anúncios do Google
              </a>{' '}
              ou{' '}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                adssettings.google.com
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
              <h2 className="text-lg font-semibold text-foreground">4. Cookies do Google Analytics</h2>
            </div>
            <p>
              Utilizamos o Google Analytics para coletar informações sobre como os visitantes utilizam nosso site.
              O Google Analytics coleta informações de forma anônima, incluindo:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Número de visitantes e sessões;</li>
              <li>Páginas visitadas e tempo de permanência;</li>
              <li>Fluxo de navegação entre páginas;</li>
              <li>Dispositivo, navegador e sistema operacional;</li>
              <li>Localização geográfica aproximada (país/cidade);</li>
              <li>Fonte de tráfego (direto, orgânico, referência, redes sociais).</li>
            </ul>
            <p>
              O Google Analytics utiliza cookies primários (_ga, _gid, _gat) para definir e distinguir usuários e
              limitar a taxa de requisições. Esses dados são anonimizados antes de serem armazenados e não permitem
              a identificação pessoal de indivíduos.
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

      {/* Gerenciamento de Cookies */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">5. Como Gerenciar Cookies no Seu Navegador</h2>
            </div>
            <p>
              A maioria dos navegadores permite que você controle cookies através das configurações de preferências.
              Você pode configurar seu navegador para recusar todos os cookies, aceitar apenas alguns ou alertá-lo
              quando um cookie está sendo definido.
            </p>
            <div className="space-y-3">
              {[
                {
                  browser: 'Google Chrome',
                  instructions: 'Configurações → Privacidade e segurança → Cookies e outros dados do site',
                },
                {
                  browser: 'Mozilla Firefox',
                  instructions: 'Configurações → Privacidade e Segurança → Cookies e dados do site',
                },
                {
                  browser: 'Safari',
                  instructions: 'Preferências → Privacidade → Cookies e dados do site',
                },
                {
                  browser: 'Microsoft Edge',
                  instructions: 'Configurações → Cookies e permissões do site → Gerenciar e excluir cookies',
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
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p>
                <strong className="text-foreground">Atenção:</strong> A desativação de cookies pode afetar a
                funcionalidade do site. Cookies essenciais não podem ser desativados, pois são necessários para o
                funcionamento básico das ferramentas. Ao desativar cookies de analytics e publicidade, o site
                continuará funcionando, mas você verá anúncios menos relevantes e não poderemos melhorar o site
                com base em dados de uso.
              </p>
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
              Alguns cookies em nosso site são definidos por serviços de terceiros que aparecem em nossas páginas:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Google AdSense / DoubleClick:</strong> Para exibição de anúncios e remarketing;</li>
              <li><strong className="text-foreground">Google Analytics:</strong> Para análise de tráfego e comportamento dos usuários;</li>
              <li><strong className="text-foreground">Google (geral):</strong> Para serviços de autenticação e preferências do usuário.</li>
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
                  Como o Google usa informações de sites
                </a>
              </li>
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
              <h2 className="text-lg font-semibold text-foreground">7. Consentimento</h2>
            </div>
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (LGPD) e o Marco Civil da Internet, solicitamos
              seu consentimento antes de definir cookies não essenciais no seu dispositivo.
            </p>
            <p>
              Ao acessar nosso site pela primeira vez, você será informado sobre o uso de cookies por meio de um
              banner de consentimento. Você pode aceitar ou recusar cookies não essenciais a qualquer momento.
            </p>
            <p>
              Seu consentimento é voluntário e pode ser revogado a qualquer momento, sem comprometer a licitude do
              tratamento anterior. Para revogar o consentimento, você pode:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Limpar os cookies do seu navegador;</li>
              <li>Acessar as configurações do navegador e bloquear cookies de terceiros;</li>
              <li>Utilizar as ferramentas de opt-out do Google AdSense e Google Analytics;</li>
              <li>Entrar em contato conosco pelo e-mail contato@betcalcpro.com.</li>
            </ul>
          </section>
        </CardContent>
      </Card>

      {/* Alterações */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">8. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta Política de Cookies periodicamente para refletir alterações nos cookies que
              utilizamos ou por outras razões operacionais, legais ou regulatórias. Recomendamos que visite esta
              página regularmente para se manter informado sobre o uso de cookies.
            </p>
          </section>

          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground italic">
              Para mais informações sobre como tratamos seus dados pessoais, consulte nossa{' '}
              <button onClick={() => setCurrentPage('privacy')} className="text-neon underline hover:no-underline">
                Política de Privacidade
              </button>.
              Em caso de dúvidas sobre cookies, entre em contato: <a href="mailto:contato@betcalcpro.com" className="text-neon underline hover:no-underline">contato@betcalcpro.com</a>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
