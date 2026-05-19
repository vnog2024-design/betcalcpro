'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowLeft,
  Shield,
  Eye,
  Database,
  Lock,
  Users,
  Clock,
  Mail,
  FileText,
  Globe,
  AlertTriangle,
} from 'lucide-react'

export function PrivacyPolicy() {
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
        <Shield className="h-6 w-6 text-neon" />
        <h1 className="text-2xl font-bold">Política de Privacidade</h1>
      </div>

      <p className="text-xs text-muted-foreground">Última atualização: Março de 2025</p>

      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          {/* Introdução */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">1. Introdução</h2>
            </div>
            <p>
              O <strong className="text-foreground">BetCalc Pro</strong> (&quot;nós&quot;, &quot;nosso&quot; ou &quot;empresa&quot;) valoriza a privacidade
              e a proteção dos dados pessoais de seus usuários. Esta Política de Privacidade descreve como coletamos,
              utilizamos, armazenamos, compartilhamos e protegemos as informações dos visitantes e usuários do nosso
              site (betcalcpro.com.br), em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018
              — LGPD), o Marco Civil da Internet (Lei nº 12.965/2014) e demais normas aplicáveis.
            </p>
            <p>
              Ao acessar e utilizar nosso site, você declara estar ciente e de acordo com as práticas descritas nesta
              Política de Privacidade. Caso não concorde com qualquer disposição aqui apresentada, solicitamos que não
              utilize nossos serviços.
            </p>
            <p>
              O BetCalc Pro é uma plataforma exclusivamente educacional, dedicada a fornecer ferramentas de cálculo,
              simulação e análise de probabilidade e gestão de risco. Não operamos nenhuma plataforma de transações financeiras,
              não aceitamos depósitos ou saques, e não processamos pagamentos de qualquer natureza.
            </p>
          </section>

          {/* Quem Somos - Controlador */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">2. Controlador dos Dados</h2>
            </div>
            <p>
              O controlador dos dados pessoais coletados neste site é o BetCalc Pro, com as seguintes informações de
              contato:
            </p>
            <ul className="space-y-1 ml-2">
              <li><strong className="text-foreground">E-mail:</strong> <a href="mailto:contato@betcalcpro.com.br" className="text-neon underline hover:no-underline">contato@betcalcpro.com.br</a></li>
              <li><strong className="text-foreground">E-mail para privacidade (Encarregado):</strong> <a href="mailto:privacidade@betcalcpro.com.br" className="text-neon underline hover:no-underline">privacidade@betcalcpro.com.br</a></li>
              <li><strong className="text-foreground">Endereço:</strong> [Endereço completo — a preencher]</li>
              <li><strong className="text-foreground">CNPJ:</strong> [CNPJ — a preencher]</li>
            </ul>
            <p>
              Para exercer seus direitos como titular de dados ou esclarecer dúvidas sobre esta política, entre em
              contato com nosso Encarregado de Proteção de Dados (DPO) pelo e-mail{' '}
              <a href="mailto:privacidade@betcalcpro.com.br" className="text-neon underline hover:no-underline">privacidade@betcalcpro.com.br</a>.
            </p>
          </section>

          {/* Dados que Coletamos */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">3. Dados que Coletamos</h2>
            </div>
            <p>
              Coletamos diferentes categorias de dados pessoais para proporcionar uma melhor experiência em nosso site,
              sempre com base legal adequada e respeitando os princípios de finalidade, adequação e necessidade previstos
              na LGPD:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Dados de navegação e uso:</strong> Informações sobre como você utiliza nossas ferramentas, incluindo páginas visitadas, tempo de permanência, funcionalidades acessadas, data e hora de acesso, URL de referência e de saída. Base legal: legítimo interesse (Art. 7º, IX, LGPD).</li>
              <li><strong className="text-foreground">Dados de cálculo e simulação:</strong> Os valores inseridos em nossas calculadoras são processados localmente no seu navegador e não são armazenados em nossos servidores, a menos que você opte por salvá-los em seu histórico pessoal (armazenado exclusivamente no seu dispositivo).</li>
              <li><strong className="text-foreground">Cookies e tecnologias similares:</strong> Utilizamos cookies essenciais para o funcionamento do site, cookies de analytics para melhoria dos serviços e cookies de publicidade para veiculação de anúncios relevantes. Detalhes completos estão disponíveis em nossa <Link href="/cookies" className="text-neon underline hover:no-underline">Política de Cookies</Link>. Base legal: consentimento (Art. 7º, I, LGPD) para cookies não essenciais.</li>
              <li><strong className="text-foreground">Dados de analytics:</strong> Coletamos dados anonimizados sobre o tráfego do site por meio do Google Analytics, incluindo endereço IP (anonimizado), tipo de navegador, sistema operacional, resolução de tela, páginas visitadas e fluxo de navegação. Base legal: legítimo interesse (Art. 7º, IX, LGPD).</li>
              <li><strong className="text-foreground">Dados de cadastro (opcional):</strong> Se você optar por criar uma conta, coletamos nome e endereço de e-mail para personalizar sua experiência e enviar comunicações relacionadas ao serviço. Base legal: consentimento e execução de contrato (Art. 7º, I e V, LGPD).</li>
              <li><strong className="text-foreground">Dados de contato:</strong> Quando você nos envia uma mensagem pelo formulário de contato, coletamos nome, e-mail, assunto e conteúdo da mensagem. Base legal: consentimento e legítimo interesse (Art. 7º, I e IX, LGPD).</li>
            </ul>
          </section>

          {/* Como Utilizamos os Dados */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">4. Como Utilizamos os Dados</h2>
            </div>
            <p>Os dados coletados são utilizados exclusivamente para as seguintes finalidades, sempre em conformidade com os princípios de finalidade e adequação da LGPD:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Prover, manter e melhorar nossos serviços e ferramentas educacionais;</li>
              <li>Personalizar a experiência do usuário no site, adaptando conteúdos e funcionalidades;</li>
              <li>Exibir anúncios relevantes por meio do Google AdSense, de forma a sustentar a gratuidade das ferramentas;</li>
              <li>Analisar o tráfego e o comportamento dos usuários para aprimorar o conteúdo e a usabilidade do site;</li>
              <li>Garantir a segurança, a integridade e o funcionamento adequado do site;</li>
              <li>Responder a solicitações de contato, dúvidas e reclamações dos usuários;</li>
              <li>Enviar comunicações relacionadas ao serviço, como atualizações e novidades (quando autorizado pelo usuário);</li>
              <li>Cumprir obrigações legais e regulatórias, incluindo as previstas na LGPD e no Marco Civil da Internet;</li>
              <li>Exercer regularmente direitos em processos judiciais, administrativos ou arbitrais.</li>
            </ul>
            <p>
              Não utilizamos seus dados pessoais para finalidades distintas daquelas descritas nesta política sem
              obter seu consentimento prévio e expresso.
            </p>
          </section>

          {/* Compartilhamento de Dados */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">5. Compartilhamento de Dados</h2>
            </div>
            <p>
              O BetCalc Pro não vende, aluga ou comercializa seus dados pessoais com terceiros. Podemos compartilhar
              informações apenas nas seguintes situações:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Google (AdSense e Analytics):</strong> Compartilhamos dados de navegação e uso com o Google para fins de exibição de anúncios personalizados e análise de tráfego, conforme detalhado nas seções 6 e 7;</li>
              <li><strong className="text-foreground">Obrigação legal:</strong> Quando exigido por lei, ordem judicial ou requisição de autoridade competente;</li>
              <li><strong className="text-foreground">Proteção de direitos:</strong> Para proteger os direitos, a segurança e a propriedade do BetCalc Pro, de nossos usuários ou de terceiros;</li>
              <li><strong className="text-foreground">Provedores de serviço:</strong> Com prestadores de serviços que atuam em nosso nome (hospedagem, análise de dados), sempre sob contratos que garantam a proteção adequada dos dados.</li>
            </ul>
          </section>

          {/* Google AdSense */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">6. Google AdSense e Publicidade Personalizada</h2>
            </div>
            <p>
              Utilizamos o <strong className="text-foreground">Google AdSense</strong> para exibir anúncios em nosso site.
              O Google AdSense é um serviço de publicidade fornecido pela Google LLC (1600 Amphitheatre Parkway, Mountain
              View, CA 94043, EUA) que utiliza cookies e web beacons para exibir anúncios baseados em visitas anteriores
              a este e a outros sites na internet.
            </p>
            <p>
              O uso de cookies de publicidade pelo Google permite que o Google e seus parceiros exibam anúncios
              personalizados com base no seu perfil de navegação. Os cookies do Google AdSense podem coletar as
              seguintes informações:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Endereço IP (anonimizado);</li>
              <li>Dados de navegação e histórico de visitas;</li>
              <li>Informações sobre o dispositivo e navegador utilizados;</li>
              <li>Dados de localização aproximada (cidade/região);</li>
              <li>Histórico de interações com anúncios (cliques, visualizações, conversões);</li>
              <li>Dados demográficos estimados (faixa etária, gênero, interesses);</li>
              <li>Identificadores únicos de cookie e publicidade.</li>
            </ul>
            <p>
              Esses dados são utilizados pelo Google para segmentação de anúncios, medição de eficácia publicitária
              e remarketing. O Google pode compartilhar esses dados com seus parceiros de publicidade conforme suas
              próprias políticas de privacidade.
            </p>
            <p>
              Você pode desativar a publicidade personalizada e gerenciar suas preferências de publicidade visitando:
            </p>
            <ul className="space-y-1 ml-4">
              <li>
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                  Configurações de Anúncios do Google
                </a>
              </li>
              <li>
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                  Configurações de Anúncios (adssettings.google.com)
                </a>
              </li>
              <li>
                <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                  Network Advertising Initiative — Opt-out
                </a>
              </li>
            </ul>
          </section>

          {/* Google Analytics */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">7. Google Analytics</h2>
            </div>
            <p>
              Utilizamos o <strong className="text-foreground">Google Analytics</strong> para analisar o tráfego do site e
              compreender como os usuários interagem com nosso conteúdo. O Google Analytics é um serviço de análise web
              fornecido pela Google LLC que coleta e processa dados de forma anonimizada, incluindo:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Número de visitantes e sessões;</li>
              <li>Páginas visitadas e tempo de permanência em cada uma;</li>
              <li>Fluxo de navegação entre páginas;</li>
              <li>Informações do dispositivo, navegador e sistema operacional;</li>
              <li>Localização geográfica aproximada (país e cidade);</li>
              <li>Fonte de tráfego (direto, orgânico, referência, redes sociais);</li>
              <li>Taxa de rejeição e eventos de interação.</li>
            </ul>
            <p>
              Os dados do Google Analytics são anonimizados antes de serem armazenados e não permitem a identificação
              pessoal individual. O endereço IP é truncado/anonizado no momento da coleta. Para mais informações,
              consulte a{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                Política de Privacidade do Google
              </a>{' '}
              e a{' '}
              <a href="https://marketingplatform.google.com/about/analytics/terms/br/" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                Termos de Serviço do Google Analytics
              </a>.
            </p>
            <p>
              Você pode optar por não participar do rastreamento do Google Analytics instalando o{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                Complemento de desativação do Google Analytics
              </a>{' '}
              para o seu navegador.
            </p>
          </section>

          {/* Direitos do Usuário - LGPD */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">8. Seus Direitos sob a LGPD</h2>
            </div>
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD), você possui os seguintes
              direitos em relação aos seus dados pessoais tratados pelo BetCalc Pro:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Confirmação e acesso (Art. 18, II):</strong> Confirmar a existência de tratamento e acessar seus dados pessoais, podendo obter cópia dos dados tratados;</li>
              <li><strong className="text-foreground">Correção (Art. 18, III):</strong> Solicitar a correção de dados pessoais incompletos, inexatos ou desatualizados;</li>
              <li><strong className="text-foreground">Anonimização, bloqueio ou eliminação (Art. 18, IV):</strong> Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD;</li>
              <li><strong className="text-foreground">Portabilidade (Art. 18, V):</strong> Solicitar a portabilidade dos seus dados a outro fornecedor de serviço ou produto, mediante requisição expressa;</li>
              <li><strong className="text-foreground">Eliminação (Art. 18, VI):</strong> Solicitar a eliminação dos dados pessoais tratados com base no seu consentimento;</li>
              <li><strong className="text-foreground">Informação sobre compartilhamento (Art. 18, VII):</strong> Obter informações sobre as entidades públicas e privadas com as quais seus dados são compartilhados;</li>
              <li><strong className="text-foreground">Revogação do consentimento (Art. 18, IX):</strong> Revogar o consentimento a qualquer momento, sem comprometer a licitude do tratamento anterior;</li>
              <li><strong className="text-foreground">Oposição (Art. 18, IV):</strong> Opor-se ao tratamento de dados quando realizado em descumprimento à LGPD;</li>
              <li><strong className="text-foreground">Reclamação à ANPD:</strong> Apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD) caso entenda que seus direitos foram violados.</li>
            </ul>
            <p>
              Para exercer qualquer um desses direitos, entre em contato com nosso Encarregado de Proteção de Dados
              através do e-mail{' '}
              <a href="mailto:privacidade@betcalcpro.com.br" className="text-neon underline hover:no-underline">privacidade@betcalcpro.com.br</a>.
              Responderemos sua solicitação no prazo de até 15 dias úteis, conforme previsto no Art. 18, § 5º da LGPD.
            </p>
          </section>

          {/* Retenção de Dados */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">9. Retenção de Dados</h2>
            </div>
            <p>
              Seus dados pessoais serão mantidos apenas pelo tempo necessário para cumprir as finalidades para as quais
              foram coletados, incluindo obrigações legais, contábeis ou de relatórios. Aplicamos os seguintes períodos
              de retenção:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Dados de cadastro:</strong> Mantidos enquanto sua conta estiver ativa ou conforme necessário para cumprir obrigações legais. Após o encerramento da conta, os dados serão eliminados em até 30 dias, salvo retenção obrigatória por lei;</li>
              <li><strong className="text-foreground">Dados de uso e analytics:</strong> Anonimizados após 26 meses (período padrão de retenção do Google Analytics). Dados brutos não identificáveis podem ser mantidos por até 50 meses para fins de análise histórica;</li>
              <li><strong className="text-foreground">Cookies:</strong> Conforme a vida útil de cada cookie, variando de cookies de sessão (eliminados ao fechar o navegador) até 13 meses para cookies de publicidade;</li>
              <li><strong className="text-foreground">Histórico de cálculos:</strong> Armazenado exclusivamente no seu dispositivo (localStorage) e pode ser excluído a qualquer momento por você;</li>
              <li><strong className="text-foreground">Dados de publicidade:</strong> Retidos pelos serviços do Google conforme suas próprias políticas de retenção;</li>
              <li><strong className="text-foreground">Dados de contato (formulário):</strong> Mantidos por até 12 meses após a resolução da solicitação, para fins de histórico e acompanhamento;</li>
              <li><strong className="text-foreground">Registros de consentimento:</strong> Mantidos pelo período exigido pela legislação aplicável (mínimo de 5 anos, conforme Art. 8º, § 5º da LGPD).</li>
            </ul>
            <p>
              Após o período de retenção, os dados serão eliminados de forma segura ou anonimizados de forma irreversível,
              sem possibilidade de posterior reidentificação.
            </p>
          </section>

          {/* Segurança */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">10. Segurança dos Dados</h2>
            </div>
            <p>
              Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado,
              destruição, perda, alteração ou qualquer forma de tratamento inadequado ou ilícito. Estas medidas incluem:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Criptografia de dados em trânsito (HTTPS/TLS 1.3) e em repouso quando aplicável;</li>
              <li>Controle de acesso restrito e baseado em princípios de menor privilégio;</li>
              <li>Monitoramento contínuo de segurança e detecção de intrusão;</li>
              <li>Processamento local de dados sensíveis (cálculos realizados no navegador do usuário);</li>
              <li>Backups regulares com criptografia e controle de acesso;</li>
              <li>Políticas internas de segurança da informação e treinamento da equipe;</li>
              <li>Plano de resposta a incidentes de segurança com notificação aos titulares e à ANPD quando aplicável.</li>
            </ul>
            <p>
              Embora adotemos medidas robustas de segurança, nenhum sistema é completamente inviolável. Em caso de
              incidente de segurança que possa acarretar risco ou dano relevante aos titulares, comunicaremos a
              ocorrência à Autoridade Nacional de Proteção de Dados (ANPD) e aos titulares afetados, conforme
              previsto no Art. 48 da LGPD.
            </p>
          </section>

          {/* Transferência Internacional */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">11. Transferência Internacional de Dados</h2>
            <p>
              Ao utilizar serviços do Google (AdSense e Analytics), seus dados podem ser transferidos para servidores
              localizados fora do Brasil, predominantemente nos Estados Unidos. Essas transferências são realizadas
              em conformidade com as salvaguardas adequadas previstas na LGPD (Art. 33), incluindo:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Transferência para países ou organismos internacionais que proporcionem grau de proteção adequado;</li>
              <li>Utilização de cláusulas contratuais padrão aprovadas pela ANPD;</li>
              <li>Adesão do Google a frameworks internacionais de proteção de dados.</li>
            </ul>
            <p>
              O Google está certificado sob o EU-U.S. Data Privacy Framework e o Swiss-U.S. Data Privacy Framework,
              que proporcionam salvaguardas adicionais para transferências de dados pessoais.
            </p>
          </section>

          {/* Menores de Idade */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">12. Menores de Idade</h2>
            <p>
              Nosso site é destinado exclusivamente a maiores de 18 anos. Não coletamos intencionalmente dados pessoais de
              menores de idade. Caso tomemos conhecimento de que coletamos dados de um menor de 18 anos, esses dados serão
              eliminados imediatamente e de forma segura, sem necessidade de solicitação prévia.
            </p>
            <p>
              Implementamos medidas razoáveis para verificar a idade dos usuários no processo de cadastro e exibimos
              avisos claros de restrição etária em todo o site.
            </p>
          </section>

          {/* Alterações */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">13. Alterações nesta Política</h2>
            <p>
              Reservamo-nos o direito de atualizar esta Política de Privacidade a qualquer momento. Quaisquer alterações
              significativas serão comunicadas por meio de aviso destacado em nosso site e, quando aplicável, por e-mail
              para usuários cadastrados. A data da última atualização será sempre indicada no topo desta página.
            </p>
            <p>
              Recomendamos que você revise esta política periodicamente para se manter informado sobre como protegemos
              seus dados. O uso continuado do site após a publicação de alterações constitui aceitação das mesmas.
            </p>
          </section>

          {/* Contato */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">14. Contato</h2>
            </div>
            <p>
              Se você tiver dúvidas, preocupações ou solicitações relacionadas a esta Política de Privacidade ou ao
              tratamento de seus dados pessoais, entre em contato conosco:
            </p>
            <ul className="space-y-2 ml-2">
              <li><strong className="text-foreground">E-mail geral:</strong> <a href="mailto:contato@betcalcpro.com.br" className="text-neon underline hover:no-underline">contato@betcalcpro.com.br</a></li>
              <li><strong className="text-foreground">Encarregado de Proteção de Dados (DPO):</strong> <a href="mailto:privacidade@betcalcpro.com.br" className="text-neon underline hover:no-underline">privacidade@betcalcpro.com.br</a></li>
              <li><strong className="text-foreground">Prazo de resposta:</strong> Até 15 dias úteis (conforme Art. 18, § 5º da LGPD)</li>
              <li><strong className="text-foreground">Formulário de contato:</strong> <Link href="/contact" className="text-neon underline hover:no-underline">Página de Contato</Link></li>
            </ul>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-500 mb-1">Autoridade Nacional de Proteção de Dados (ANPD)</p>
                  <p>
                    Caso entenda que o tratamento dos seus dados pessoais viola a LGPD, você pode apresentar reclamação
                    à ANPD — Autoridade Nacional de Proteção de Dados, órgão da Administração Pública Federal responsável
                    por zelar pela implementação da LGPD. Mais informações em{' '}
                    <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">
                      www.gov.br/anpd
                    </a>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground italic">
              Esta Política de Privacidade é válida para todos os usuários do site BetCalc Pro e está em conformidade com a
              Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018), o Marco Civil da Internet (Lei nº 12.965/2014)
              e com os requisitos do Google AdSense. Para informações sobre cookies, consulte nossa{' '}
              <Link href="/cookies" className="text-neon underline hover:no-underline">Política de Cookies</Link>.
              Para informações sobre os termos de uso, consulte nossos{' '}
              <Link href="/terms" className="text-neon underline hover:no-underline">Termos de Uso</Link>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
