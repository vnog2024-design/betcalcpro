'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowLeft,
  FileText,
  CheckCircle,
  AlertTriangle,
  Scale,
  Shield,
  Ban,
  RefreshCw,
  Gavel,
  Mail,
  Users,
  BookOpen,
  Eye,
} from 'lucide-react'
import { AdBanner } from '@/components/shared/ad-banner'

export function TermsOfUse() {
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
        <FileText className="h-6 w-6 text-neon" />
        <h1 className="text-2xl font-bold">Termos de Uso</h1>
      </div>

      <p className="text-xs text-muted-foreground">Última atualização: Março de 2025</p>

      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          {/* Aceitação */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">1. Aceitação dos Termos</h2>
            </div>
            <p>
              Ao acessar e utilizar o site <strong className="text-foreground">BetCalc Pro</strong> (betcalcpro.com.br),
              você declara que leu, compreendeu e concorda em cumprir integralmente estes Termos de Uso, bem como nossa{' '}
              <Link href="/privacy" className="text-neon underline hover:no-underline">Política de Privacidade</Link> e{' '}
              <Link href="/cookies" className="text-neon underline hover:no-underline">Política de Cookies</Link>.
              Se você não concordar com qualquer parte destes termos, solicitamos que não utilize nosso site.
            </p>
            <p>
              O uso continuado do site após a publicação de alterações nestes termos constitui sua aceitação das mesmas.
              É responsabilidade do usuário verificar periodicamente os termos atualizados.
            </p>
          </section>

          {/* Descrição do Serviço */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">2. Descrição do Serviço</h2>
            </div>
            <p>
              O BetCalc Pro é uma plataforma exclusivamente educacional que oferece ferramentas de cálculo, simulação
              e análise voltadas para o estudo de probabilidade, estatística e gestão de risco. Nossos serviços incluem:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Calculadoras de modelos matemáticos (Martingale, Fibonacci, Soros, Masaniello, etc.);</li>
              <li>Simuladores de cenários probabilísticos e análise de risco;</li>
              <li>Geradores de estratégias personalizadas para fins educacionais;</li>
              <li>Conteúdo educacional sobre probabilidade, estatística e gestão de risco;</li>
              <li>Analisadores de sequências e padrões estatísticos;</li>
              <li>Ferramentas de planejamento financeiro e gestão de capital.</li>
            </ul>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-500 mb-1">AVISO IMPORTANTE — NATUREZA EDUCACIONAL</p>
                  <p>
                    O BetCalc Pro é uma plataforma <strong className="text-foreground">exclusivamente educacional</strong>.
                    NÃO operamos nenhuma plataforma de transações financeiras, NÃO aceitamos depósitos ou pagamentos, NÃO processamos
                    transações de qualquer natureza e NÃO funcionamos como intermediário para qualquer atividade financeira. Todas as
                    ferramentas são de caráter exclusivamente educacional e os resultados apresentados são simulações teóricas
                    que não representam resultados reais. As ferramentas não devem ser utilizadas como única base para decisões
                    financeiras ou de qualquer outra natureza.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Restrição de Idade */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">3. Restrição de Idade</h2>
            </div>
            <p>
              O uso do BetCalc Pro é <strong className="text-foreground">estritamente proibido para menores de 18 anos</strong>.
              Ao acessar nosso site, você declara ter pelo menos 18 anos de idade. Implementamos medidas razoáveis para
              evitar o acesso de menores, incluindo avisos claros de restrição etária em todo o site e verificação de idade
              no processo de cadastro.
            </p>
            <p>
              Caso tomemos conhecimento de que um menor de 18 anos está utilizando nossos serviços, sua conta será
              encerrada imediatamente e todos os dados associados serão eliminados, em conformidade com a LGPD e o
              Estatuto da Criança e do Adolescente (ECA).
            </p>
          </section>

          {/* Disclaimer Educacional */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">4. Isenção de Responsabilidade — Natureza Educacional</h2>
            </div>
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 space-y-3">
              <p>
                <strong className="text-foreground">O BetCalc Pro NÃO garante lucros, retornos financeiros ou resultados de qualquer natureza.</strong>{' '}
                Nossas ferramentas são baseadas em cálculos matemáticos e simulações teóricas destinadas exclusivamente
                a fins educacionais. Resultados passados e simulações não são indicadores confiáveis de resultados futuros.
              </p>
              <p>
                Os modelos matemáticos utilizados são simplificações da realidade e não consideram todas as variáveis
                que podem influenciar resultados práticos. As ferramentas não eliminam o risco inerente a qualquer
                decisão baseada em probabilidades.
              </p>
            </div>
            <p>
              Você reconhece expressamente que: (a) as ferramentas são de caráter exclusivamente educacional; (b) os
              resultados simulados podem diferir significativamente de resultados reais; (c) qualquer decisão que envolva
              risco financeiro é de responsabilidade exclusiva do usuário; (d) você deve sempre consultar profissionais
              habilitados antes de tomar decisões que envolvam recursos financeiros; (e) o BetCalc Pro não fornece
              aconselhamento financeiro, fiscal ou de investimento.
            </p>
          </section>

          {/* Limitação de Responsabilidade */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">5. Limitação de Responsabilidade</h2>
            </div>
            <p>
              Na máxima extensão permitida pela legislação brasileira, o BetCalc Pro e seu responsável NÃO serão responsáveis por:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Perdas financeiras diretas ou indiretas resultantes do uso de nossas ferramentas educacionais;</li>
              <li>Decisões tomadas com base nos resultados de nossas calculadoras ou simuladores;</li>
              <li>Erros, imprecisões ou falhas nas ferramentas de cálculo ou simulação;</li>
              <li>Interrupções, indisponibilidade ou mau funcionamento do site, inclusive por motivos de força maior;</li>
              <li>Conteúdo de terceiros, incluindo anúncios exibidos pelo Google AdSense;</li>
              <li>Danos resultantes de acesso não autorizado a sua conta ou dados;</li>
              <li>Qualquer dano direto, indireto, incidental, especial ou consequencial decorrente do uso ou impossibilidade
              de uso do site;</li>
              <li>Decisões baseadas exclusivamente nas informações e resultados fornecidos pelas ferramentas;</li>
              <li>Interpretações incorretas dos resultados das simulações e cálculos.</li>
            </ul>
            <p>
              As ferramentas são fornecidas &quot;como estão&quot; (as is), sem garantias de qualquer tipo, expressas ou
              implícitas, incluindo, mas não se limitando a, garantias de comercialização, adequação a um propósito
              específico, precisão absoluta e não violação. O BetCalc Pro não garante que o site estará disponível
              de forma ininterrupta ou livre de erros.
            </p>
          </section>

          {/* Propriedade Intelectual */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">6. Propriedade Intelectual</h2>
            </div>
            <p>
              Todo o conteúdo do site BetCalc Pro, incluindo mas não se limitando a textos, gráficos, logotipos, ícones,
              imagens, clipes de áudio, código-fonte, design, layout, compilação de dados, algoritmos, modelos matemáticos
              e documentação, é de propriedade exclusiva do BetCalc Pro ou de seus licenciadores e é protegido pelas leis
              brasileiras de direitos autorais (Lei nº 9.610/1998) e propriedade intelectual (Lei nº 9.279/1996), bem
              como por tratados internacionais aplicáveis.
            </p>
            <p>
              São reservados ao BetCalc Pro todos os direitos não expressamente concedidos nestes Termos de Uso, incluindo:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>O nome &quot;BetCalc Pro&quot;, logotipos e marcas são propriedade do BetCalc Pro e estão protegidos pelas leis de marca;</li>
              <li>É proibida a reprodução, distribuição, modificação, exibição pública ou qualquer outro uso do conteúdo
              do site sem autorização prévia e expressa por escrito;</li>
              <li>A engenharia reversa, descompilação ou desmontagem de qualquer parte do site é expressamente proibida;</li>
              <li>A utilização de qualquer ferramenta de extração de dados (scraping, crawling) para coletar informações
              do site em escala automatizada é proibida sem autorização prévia;</li>
              <li>O usuário não adquire nenhum direito de propriedade intelectual sobre o conteúdo do site pelo simples
              fato de utilizá-lo.</li>
            </ul>
          </section>

          {/* Conduta do Usuário */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">7. Conduta do Usuário</h2>
            </div>
            <p>
              Ao utilizar o BetCalc Pro, você se compromete a manter uma conduta responsável e ética, concordando em:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Utilizar o site apenas para fins educacionais e lícitos;</li>
              <li>Fornecer informações verdadeiras e atualizadas quando solicitado;</li>
              <li>Não utilizar o site de forma que possa danificar, desabilitar, sobrecarregar ou prejudicar o funcionamento do mesmo;</li>
              <li>Não tentar acessar áreas restritas do site, sistemas ou redes conectadas ao site sem autorização;</li>
              <li>Não coletar ou armazenar dados pessoais de outros usuários sem autorização;</li>
              <li>Não utilizar robôs, scrapers, spiders ou ferramentas automatizadas para acessar o site sem autorização prévia;</li>
              <li>Não interferir no funcionamento adequado do site ou de seus serviços;</li>
              <li>Não utilizar o site para enviar conteúdo ilegal, prejudicial, ameaçador, abusivo, difamatório ou obsceno;</li>
              <li>Não representar falsamente sua afiliação com qualquer pessoa ou entidade;</li>
              <li>Não criar múltiplas contas para contornar restrições ou sanções;</li>
              <li>Respeitar os direitos de propriedade intelectual do BetCalc Pro e de terceiros;</li>
              <li>Cumprir integralmente a legislação brasileira aplicável.</li>
            </ul>
          </section>

          {/* Usos Proibidos */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Ban className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">8. Usos Proibidos</h2>
            </div>
            <p>É estritamente proibido utilizar o BetCalc Pro para:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Qualquer finalidade ilegal, fraudulenta ou não autorizada;</li>
              <li>Operar ou facilitar qualquer atividade financeira não regulamentada;</li>
              <li>Enganar ou induzir terceiros a acreditar que as ferramentas garantem resultados financeiros;</li>
              <li>Comercializar, vender ou revender acesso às ferramentas do site;</li>
              <li>Modificar, adaptar ou criar obras derivadas do conteúdo do site;</li>
              <li>Tentar acessar áreas restritas do site ou comprometer sua segurança;</li>
              <li>Interferir no funcionamento do site ou de seus servidores;</li>
              <li>Violar quaisquer leis, regulamentos ou direitos de terceiros;</li>
              <li>Permitir que menores de 18 anos utilizem o site sob qualquer circunstância;</li>
              <li>Utilizar as ferramentas para fins que violem a legislação brasileira vigente.</li>
            </ul>
          </section>

          {/* Modificações */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">9. Modificações nos Termos</h2>
            </div>
            <p>
              O BetCalc Pro reserva-se o direito de modificar estes Termos de Uso a qualquer momento, sem aviso prévio.
              As alterações entrarão em vigor imediatamente após sua publicação no site. É responsabilidade do usuário
              verificar periodicamente os termos atualizados.
            </p>
            <p>
              O uso continuado do site após a publicação de alterações constitui aceitação dos novos termos. Em caso de
              alterações significativas, poderemos enviar uma notificação por e-mail (para usuários cadastrados) ou
              exibir um aviso destacado no site.
            </p>
          </section>

          {/* Lei Aplicável */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Gavel className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">10. Lei Aplicável e Foro</h2>
            </div>
            <p>
              Estes Termos de Uso são regidos e interpretados de acordo com as leis da República Federativa do Brasil.
              Qualquer disputa relacionada a estes termos será submetida ao foro da comarca do domicílio do usuário,
              conforme o Código de Defesa do Consumidor (Lei nº 8.078/1990).
            </p>
            <p>
              O BetCalc Pro opera em conformidade com a legislação brasileira, incluindo:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018);</li>
              <li>Marco Civil da Internet (Lei nº 12.965/2014);</li>
              <li>Código de Defesa do Consumidor (Lei nº 8.078/1990);</li>
              <li>Lei de Direitos Autorais (Lei nº 9.610/1998);</li>
              <li>Lei de Propriedade Industrial (Lei nº 9.279/1996);</li>
              <li>Estatuto da Criança e do Adolescente (Lei nº 8.069/1990).</li>
            </ul>
          </section>

          {/* Disponibilidade */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">11. Disponibilidade do Serviço</h2>
            <p>
              O BetCalc Pro se esforça para manter o site disponível de forma contínua, mas não garante que o acesso
              ao site será ininterrupto ou livre de erros. O site pode estar temporariamente indisponível devido a:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Manutenção programada ou de emergência;</li>
              <li>Falhas de infraestrutura, hardware ou software;</li>
              <li>Problemas com provedores de serviços terceiros;</li>
              <li>Casos de força maior, incluindo desastres naturais, pandemias ou atos governamentais;</li>
              <li>Ataques cibernéticos ou incidentes de segurança.</li>
            </ul>
            <p>
              O BetCalc Pro não será responsável por quaisquer danos resultantes da indisponibilidade temporária do site.
            </p>
          </section>

          {/* Rescisão */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">12. Rescisão</h2>
            <p>
              O BetCalc Pro reserva-se o direito de suspender ou encerrar o acesso de qualquer usuário ao site, a qualquer
              momento, com ou sem motivo, mediante notificação prévia quando possível. As causas para rescisão incluem,
              mas não se limitam a:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Violação destes Termos de Uso;</li>
              <li>Conduta que possa causar danos ao BetCalc Pro, a outros usuários ou a terceiros;</li>
              <li>Determinação judicial ou administrativa;</li>
              <li>Solicitação do próprio usuário.</li>
            </ul>
            <p>
              Após a rescisão, as disposições destes Termos de Uso que, por sua natureza, devam sobreviver — incluindo
              limitação de responsabilidade, propriedade intelectual e isenções — permanecerão em vigor.
            </p>
          </section>

          {/* Disposições Gerais */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">13. Disposições Gerais</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Acordo integral:</strong> Estes Termos de Uso, em conjunto com a Política de Privacidade e a Política de Cookies, constituem o acordo integral entre você e o BetCalc Pro em relação ao uso do site;</li>
              <li><strong className="text-foreground">Severabilidade:</strong> Caso qualquer disposição destes termos seja considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor e efeito;</li>
              <li><strong className="text-foreground">Renúncia:</strong> A falha do BetCalc Pro em exercer qualquer direito previsto nestes termos não constituirá renúncia a tal direito;</li>
              <li><strong className="text-foreground">Cessão:</strong> Você não poderá ceder ou transferir seus direitos ou obrigações sob estes termos sem o consentimento prévio por escrito do BetCalc Pro;</li>
              <li><strong className="text-foreground">Acordo independente:</strong> Estes termos não criam qualquer relação de sociedade, franquia, emprego ou agência entre você e o BetCalc Pro.</li>
            </ul>
          </section>

          {/* Contato */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">14. Contato</h2>
            </div>
            <p>
              Para dúvidas, sugestões ou reclamações sobre estes Termos de Uso, entre em contato:
            </p>
            <ul className="space-y-1 ml-2">
              <li><strong className="text-foreground">E-mail:</strong> <a href="mailto:valdirnogueira2010@gmail.com" className="text-neon underline hover:no-underline">valdirnogueira2010@gmail.com</a></li>
              <li><strong className="text-foreground">Prazo de resposta:</strong> Até 48 horas úteis</li>
              <li><strong className="text-foreground">Formulário:</strong> <Link href="/contact" className="text-neon underline hover:no-underline">Página de Contato</Link></li>
            </ul>
          </section>

          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground italic">
              Ao utilizar o BetCalc Pro, você reconhece que leu e compreendeu estes Termos de Uso e concorda em cumpri-los
              integralmente. O BetCalc Pro é uma ferramenta educacional e não se responsabiliza por decisões tomadas com
              base em seus cálculos e simulações. Consulte nossos{' '}
              <Link href="/privacy" className="text-neon underline hover:no-underline">Termos de Privacidade</Link> e{' '}
              <Link href="/cookies" className="text-neon underline hover:no-underline">Política de Cookies</Link> para
              informações complementares.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Ad */}
      <AdBanner className="mt-6" />
    </div>
  )
}
