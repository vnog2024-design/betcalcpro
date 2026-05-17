'use client'

import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Shield, Eye, Database, Lock, Users, Clock, Mail } from 'lucide-react'

export function PrivacyPolicy() {
  const { setCurrentPage } = useAppStore()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => setCurrentPage('home')} className="text-muted-foreground hover:text-neon">
          <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <Shield className="h-6 w-6 text-neon" />
        <h1 className="text-2xl font-bold">Política de Privacidade</h1>
      </div>

      <p className="text-xs text-muted-foreground">Última atualização: Março de 2025</p>

      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          {/* Quem Somos */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">1. Quem Somos</h2>
            </div>
            <p>
              O <strong className="text-foreground">BetCalc Pro</strong> é um site de ferramentas educacionais voltado para
              apostadores que desejam gerenciar suas bancas de forma responsável. Oferecemos calculadoras, simuladores e
              conteúdo educativo para auxiliar na tomada de decisões informadas.
            </p>
            <p>
              <strong className="text-foreground">Importante:</strong> O BetCalc Pro NÃO opera jogos de azar, NÃO aceita apostas
              e NÃO funciona como plataforma de gambling. Somos exclusivamente um provedor de ferramentas educacionais de cálculo
              e simulação.
            </p>
          </section>

          {/* Dados que Coletamos */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">2. Dados que Coletamos</h2>
            </div>
            <p>Coletamos os seguintes tipos de dados para proporcionar uma melhor experiência em nosso site:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Dados de uso:</strong> Informações sobre como você utiliza nossas ferramentas, incluindo páginas visitadas, tempo de permanência e funcionalidades acessadas.</li>
              <li><strong className="text-foreground">Dados de cálculo:</strong> Os valores inseridos em nossas calculadoras são processados localmente no seu navegador e não são armazenados em nossos servidores, a menos que você opte por salvá-los em seu histórico pessoal.</li>
              <li><strong className="text-foreground">Cookies e tecnologias similares:</strong> Utilizamos cookies para melhorar a funcionalidade do site, analisar o tráfego e exibir anúncios relevantes.</li>
              <li><strong className="text-foreground">Dados de analytics:</strong> Coletamos dados anonimizados sobre o tráfego do site, como endereço IP (anonimizado), tipo de navegador, sistema operacional e páginas visitadas.</li>
              <li><strong className="text-foreground">Dados de cadastro (opcional):</strong> Se você optar por criar uma conta, coletamos nome e e-mail para personalizar sua experiência.</li>
            </ul>
          </section>

          {/* Como Utilizamos os Dados */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">3. Como Utilizamos os Dados</h2>
            </div>
            <p>Os dados coletados são utilizados para as seguintes finalidades:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Melhorar e otimizar nossos serviços e ferramentas educacionais;</li>
              <li>Personalizar a experiência do usuário no site;</li>
              <li>Exibir anúncios relevantes por meio do Google AdSense;</li>
              <li>Analisar o tráfego e o comportamento dos usuários para aprimorar o conteúdo;</li>
              <li>Garantir a segurança e o funcionamento adequado do site;</li>
              <li>Enviar comunicações relacionadas ao serviço (quando autorizado pelo usuário);</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
          </section>

          {/* Serviços de Terceiros */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">4. Serviços de Terceiros</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">4.1 Google AdSense</h3>
                <p>
                  Utilizamos o Google AdSense para exibir anúncios em nosso site. O Google AdSense pode utilizar cookies e web beacons
                  para exibir anúncios com base em visitas anteriores a este e a outros sites na internet. O uso de cookies de publicidade
                  pelo Google permite que o Google e seus parceiros exibam anúncios baseados em visitas ao nosso site e/ou a outros sites
                  na internet.
                </p>
                <p>
                  Os cookies do Google AdSense podem coletar: endereço IP, dados de navegação, informações sobre o dispositivo,
                  dados de localização (aproximada), histórico de interações com anúncios e dados demográficos estimados.
                </p>
                <p>
                  Você pode desativar a publicidade personalizada visitando as{' '}
                  <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                    Configurações de Anúncios do Google
                  </a>.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">4.2 Google Analytics</h3>
                <p>
                  Utilizamos o Google Analytics para analisar o tráfego do site e compreender como os usuários interagem
                  com nosso conteúdo. O Google Analytics coleta dados anonimizados, incluindo:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Páginas visitadas e tempo de permanência;</li>
                  <li>Fluxo de navegação no site;</li>
                  <li>Informações do dispositivo e navegador;</li>
                  <li>Localização geográfica aproximada;</li>
                  <li>Fonte de tráfego (direto, orgânico, referência).</li>
                </ul>
                <p>
                  Os dados do Google Analytics são anonimizados e não permitem a identificação pessoal individual.
                  Para mais informações, consulte a{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                    Política de Privacidade do Google
                  </a>.
                </p>
              </div>
            </div>
          </section>

          {/* Direitos do Usuário - LGPD */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">5. Seus Direitos sob a LGPD</h2>
            </div>
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD), você possui os seguintes
              direitos em relação aos seus dados pessoais:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Confirmação e acesso:</strong> Confirmar a existência de tratamento e acessar seus dados pessoais;</li>
              <li><strong className="text-foreground">Correção:</strong> Solicitar a correção de dados incompletos, inexatos ou desatualizados;</li>
              <li><strong className="text-foreground">Anonimização, bloqueio ou eliminação:</strong> Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
              <li><strong className="text-foreground">Portabilidade:</strong> Solicitar a portabilidade dos seus dados a outro fornecedor de serviço;</li>
              <li><strong className="text-foreground">Eliminação:</strong> Solicitar a eliminação dos dados pessoais tratados com base no seu consentimento;</li>
              <li><strong className="text-foreground">Informação sobre compartilhamento:</strong> Obter informações sobre as entidades com as quais seus dados são compartilhados;</li>
              <li><strong className="text-foreground">Revogação do consentimento:</strong> Revogar o consentimento a qualquer momento, sem comprometer a licitude do tratamento anterior;</li>
              <li><strong className="text-foreground">Oposição:</strong> Opor-se ao tratamento de dados quando realizado em descumprimento à LGPD.</li>
            </ul>
            <p>
              Para exercer qualquer um desses direitos, entre em contato conosco através do e-mail{' '}
              <a href="mailto:contato@betcalcpro.com" className="text-neon underline hover:no-underline">contato@betcalcpro.com</a>.
              Responderemos sua solicitação no prazo de até 15 dias úteis, conforme previsto na LGPD.
            </p>
          </section>

          {/* Retenção de Dados */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">6. Retenção de Dados</h2>
            </div>
            <p>
              Seus dados pessoais serão mantidos apenas pelo tempo necessário para cumprir as finalidades para as quais
              foram coletados, incluindo obrigações legais, contábeis ou de relatórios. Especificamente:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Dados de cadastro:</strong> Mantidos enquanto sua conta estiver ativa ou conforme necessário para cumprir obrigações legais;</li>
              <li><strong className="text-foreground">Dados de uso e analytics:</strong> Anonimizados após 26 meses (período padrão de retenção do Google Analytics);</li>
              <li><strong className="text-foreground">Cookies:</strong> Conforme a vida útil de cada cookie, podendo variar de sessão até 13 meses;</li>
              <li><strong className="text-foreground">Histórico de cálculos:</strong> Armazenado localmente no seu navegador e pode ser excluído a qualquer momento por você;</li>
              <li><strong className="text-foreground">Dados de publicidade:</strong> Retidos pelos serviços do Google conforme suas próprias políticas de retenção.</li>
            </ul>
            <p>
              Após o período de retenção, os dados serão eliminados de forma segura ou anonimizados de forma irreversível.
            </p>
          </section>

          {/* Segurança */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">7. Segurança dos Dados</h2>
            </div>
            <p>
              Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado,
              destruição, perda, alteração ou tratamento indevido. Estas medidas incluem:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Criptografia de dados em trânsito (HTTPS/SSL);</li>
              <li>Controle de acesso restrito aos dados pessoais;</li>
              <li>Monitoramento contínuo de segurança;</li>
              <li>Processamento local de dados sensíveis (cálculos realizados no navegador do usuário).</li>
            </ul>
          </section>

          {/* Menores de Idade */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">8. Menores de Idade</h2>
            <p>
              Nosso site é destinado exclusivamente a maiores de 18 anos. Não coletamos intencionalmente dados pessoais de
              menores de idade. Caso tomemos conhecimento de que coletamos dados de um menor de 18 anos, esses dados serão
              eliminados imediatamente.
            </p>
          </section>

          {/* Alterações */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">9. Alterações nesta Política</h2>
            <p>
              Reservamo-nos o direito de atualizar esta Política de Privacidade a qualquer momento. Quaisquer alterações
              significativas serão comunicadas por meio de aviso em nosso site. Recomendamos que você revise esta política
              periodicamente para se manter informado sobre como protegemos seus dados.
            </p>
          </section>

          {/* Contato */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">10. Contato</h2>
            </div>
            <p>
              Se você tiver dúvidas, preocupações ou solicitações relacionadas a esta Política de Privacidade ou ao
              tratamento de seus dados pessoais, entre em contato conosco:
            </p>
            <ul className="space-y-1 ml-2">
              <li><strong className="text-foreground">E-mail:</strong> <a href="mailto:contato@betcalcpro.com" className="text-neon underline hover:no-underline">contato@betcalcpro.com</a></li>
              <li><strong className="text-foreground">Prazo de resposta:</strong> Até 15 dias úteis (conforme LGPD)</li>
            </ul>
          </section>

          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground italic">
              Esta Política de Privacidade é válida para todos os usuários do site BetCalc Pro e está em conformidade com a
              Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e com os requisitos do Google AdSense.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
