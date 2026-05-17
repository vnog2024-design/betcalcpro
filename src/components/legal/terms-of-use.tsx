'use client'

import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Scale, Shield, Ban, RefreshCw, Gavel, Mail } from 'lucide-react'

export function TermsOfUse() {
  const { setCurrentPage } = useAppStore()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => setCurrentPage('home')} className="text-muted-foreground hover:text-neon">
          <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
        </Button>
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
              Ao acessar e utilizar o site <strong className="text-foreground">BetCalc Pro</strong> (betcalcpro.com), você declara que leu,
              compreendeu e concorda em cumprir integralmente estes Termos de Uso. Se você não concordar com qualquer
              parte destes termos, solicitamos que não utilize nosso site.
            </p>
            <p>
              O uso continuado do site após a publicação de alterações nestes termos constitui sua aceitação das mesmas.
            </p>
          </section>

          {/* Descrição do Serviço */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">2. Descrição do Serviço</h2>
            </div>
            <p>
              O BetCalc Pro é uma plataforma que oferece ferramentas educacionais de cálculo e simulação voltadas para
              apostadores que desejam gerenciar suas bancas de forma responsável. Nossos serviços incluem:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Calculadoras de estratégias (Martingale, Fibonacci, Soros, Masaniello, etc.);</li>
              <li>Simuladores de cenários (Crash, Double, Probabilidades);</li>
              <li>Geradores de estratégias personalizadas;</li>
              <li>Conteúdo educacional sobre gestão de banca;</li>
              <li>Analisadores de sequências e padrões.</li>
            </ul>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-500 mb-1">AVISO IMPORTANTE</p>
                  <p>
                    O BetCalc Pro NÃO é um site de apostas, NÃO opera jogos de azar, NÃO aceita apostas e NÃO funciona
                    como plataforma de gambling. Todas as ferramentas são exclusivamente educacionais e destinadas a
                    auxiliar na gestão responsável de bancas. Os resultados apresentados são simulações e não representam
                    resultados reais de apostas.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Restrição de Idade */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">3. Restrição de Idade</h2>
            <p>
              O uso do BetCalc Pro é <strong className="text-foreground">estritamente proibido para menores de 18 anos</strong>.
              Ao acessar nosso site, você declara ter pelo menos 18 anos de idade. Implementamos medidas razoáveis para
              evitar o acesso de menores, incluindo avisos claros de restrição etária em todo o site.
            </p>
            <p>
              Caso tomemos conhecimento de que um menor de 18 anos está utilizando nossos serviços, sua conta será
              encerrada imediatamente e todos os dados associados serão eliminados.
            </p>
          </section>

          {/* Sem Garantia de Lucros */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">4. Sem Garantia de Lucros</h2>
            </div>
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
              <p>
                <strong className="text-foreground">O BetCalc Pro NÃO garante lucros ou retornos financeiros de qualquer natureza.</strong>{' '}
                Nossas ferramentas são baseadas em cálculos matemáticos e simulações teóricas. Resultados passados e
                simulações não são indicadores confiáveis de resultados futuros. As ferramentas não eliminam o risco
                inerente a qualquer forma de aposta.
              </p>
            </div>
            <p>
              Você reconhece que: (a) as ferramentas são de caráter educacional; (b) os resultados simulados podem
              diferir significativamente de resultados reais; (c) apostas envolvem risco financeiro real; (d) você é
              o único responsável por suas decisões de aposta e gestão financeira.
            </p>
          </section>

          {/* Limitação de Responsabilidade */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">5. Limitação de Responsabilidade</h2>
            </div>
            <p>
              Na máxima extensão permitida pela lei brasileira, o BetCalc Pro NÃO será responsável por:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Perdas financeiras diretas ou indiretas resultantes do uso de nossas ferramentas;</li>
              <li>Decisões de aposta tomadas com base nos resultados de nossas calculadoras ou simuladores;</li>
              <li>Erros, imprecisões ou falhas nas ferramentas de cálculo ou simulação;</li>
              <li>Interrupções, indisponibilidade ou mau funcionamento do site;</li>
              <li>Conteúdo de terceiros, incluindo anúncios exibidos pelo Google AdSense;</li>
              <li>Danos resultantes de acesso não autorizado a sua conta;</li>
              <li>Qualquer dano direto, indireto, incidental, especial ou consequencial decorrente do uso do site.</li>
            </ul>
            <p>
              As ferramentas são fornecidas &quot;como estão&quot; (as is), sem garantias de qualquer tipo, expressas ou
              implícitas, incluindo, mas não se limitando a, garantias de comercialização, adequação a um propósito
              específico e não violação.
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
              imagens, clipes de áudio, código-fonte, design, layout e compilação de dados, é de propriedade exclusiva
              do BetCalc Pro ou de seus licenciadores e é protegido pelas leis brasileiras de direitos autorais e
              propriedade intelectual.
            </p>
            <p>
              É proibida a reprodução, distribuição, modificação, exibição pública ou qualquer outro uso do conteúdo
              do site sem autorização prévia e expressa por escrito.
            </p>
          </section>

          {/* Usos Proibidos */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Ban className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">7. Usos Proibidos</h2>
            </div>
            <p>É estritamente proibido utilizar o BetCalc Pro para:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Qualquer finalidade ilegal ou não autorizada;</li>
              <li>Operar ou facilitar jogos de azar ou apostas não regulamentadas;</li>
              <li>Enganar ou induzir terceiros a acreditar que as ferramentas garantem lucros;</li>
              <li>Tentar acessar áreas restritas do site ou comprometer sua segurança;</li>
              <li>Coletar informações de outros usuários sem autorização;</li>
              <li>Utilizar robôs, scrapers ou ferramentas automatizadas para acessar o site;</li>
              <li>Interferir no funcionamento adequado do site ou de seus serviços;</li>
              <li>Violar quaisquer leis ou regulamentos aplicáveis;</li>
              <li>Menores de 18 anos utilizarem o site sob qualquer circunstância.</li>
            </ul>
          </section>

          {/* Modificações */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">8. Modificações nos Termos</h2>
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
              <h2 className="text-lg font-semibold text-foreground">9. Lei Aplicável e Foro</h2>
            </div>
            <p>
              Estes Termos de Uso são regidos e interpretados de acordo com as leis da República Federativa do Brasil.
              Qualquer disputa relacionada a estes termos será submetida ao foro da comarca do domicílio do usuário,
              conforme o Código de Defesa do Consumidor (Lei nº 8.078/1990).
            </p>
            <p>
              O BetCalc Pro opera em conformidade com a legislação brasileira, incluindo a Lei Geral de Proteção de Dados
              (LGPD - Lei nº 13.709/2018), o Marco Civil da Internet (Lei nº 12.965/2014) e o Código de Defesa do Consumidor.
            </p>
          </section>

          {/* Contato */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">10. Contato</h2>
            </div>
            <p>
              Para dúvidas, sugestões ou reclamações sobre estes Termos de Uso, entre em contato:
            </p>
            <ul className="space-y-1 ml-2">
              <li><strong className="text-foreground">E-mail:</strong> <a href="mailto:contato@betcalcpro.com" className="text-neon underline hover:no-underline">contato@betcalcpro.com</a></li>
              <li><strong className="text-foreground">Prazo de resposta:</strong> Até 48 horas úteis</li>
            </ul>
          </section>

          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground italic">
              Ao utilizar o BetCalc Pro, você reconhece que leu e compreendeu estes Termos de Uso e concorda em cumpri-los
              integralmente. O BetCalc Pro é uma ferramenta educacional e não se responsabiliza por decisões financeiras
              tomadas com base em seus cálculos e simulações.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
