'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowLeft,
  Info,
  Target,
  Wrench,
  AlertTriangle,
  Heart,
  Eye,
  GraduationCap,
  DollarSign,
  MapPin,
  Mail,
  Users,
  Lightbulb,
  Globe,
} from 'lucide-react'

export function AboutPage() {
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
        <Info className="h-6 w-6 text-neon" />
        <h1 className="text-2xl font-bold">Sobre Nós</h1>
      </div>

      {/* Quem Somos */}
      <Card>
        <CardContent className="p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Quem Somos</h2>
            </div>
            <p>
              O <strong className="text-foreground">BetCalc Pro</strong> é uma plataforma educacional dedicada a fornecer
              ferramentas gratuitas de cálculo, simulação e análise para profissionais e estudantes que trabalham com
              probabilidade, estatística e gestão de risco. Fundado com o propósito de democratizar o acesso ao conhecimento
              matemático e estatístico, nosso projeto nasceu da convicção de que a educação é a ferramenta mais poderosa
              para a tomada de decisões conscientes e fundamentadas.
            </p>
            <p>
              Somos uma equipe de profissionais apaixonados por matemática e tecnologia, composta por desenvolvedores de
              software, matemáticos, estatísticos e especialistas em gestão de risco que trabalham incansavelmente para
              manter este projeto vivo e em constante evolução. Nosso time combina décadas de experiência em análise
              quantitativa, desenvolvimento de software educacional e pesquisa estatística para criar ferramentas que
              realmente fazem a diferença na vida dos nossos usuários.
            </p>
            <p>
              Acreditamos firmemente que o acesso ao conhecimento matemático e estatístico de qualidade não deve ser
              privilégio de poucos. Por isso, todas as nossas ferramentas são disponibilizadas gratuitamente, permitindo
              que qualquer pessoa — independentemente de sua condição socioeconômica — possa aprender, calcular e simular
              cenários de probabilidade e gestão de risco com precisão e confiabilidade.
            </p>
          </section>
        </CardContent>
      </Card>

      {/* Nossa Missão */}
      <Card>
        <CardContent className="p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Nossa Missão</h2>
            </div>
            <p>
              Nossa missão é proporcionar ferramentas educacionais gratuitas de alta qualidade que permitam a profissionais,
              estudantes e entusiastas compreenderem melhor os conceitos de probabilidade, estatística e gestão de risco.
              Buscamos capacitar nossos usuários com o conhecimento necessário para tomar decisões mais informadas e
              conscientes em qualquer área que envolva análise de incertezas e riscos.
            </p>
            <p>
              Por meio de calculadoras especializadas, simuladores interativos e conteúdo educacional detalhado, nosso
              objetivo é transformar conceitos matemáticos complexos em informações acessíveis e compreensíveis para todos.
              Cada ferramenta que desenvolvemos é pensada para ser intuitiva sem perder o rigor científico, garantindo que
              os resultados apresentados sejam confiáveis e úteis para fins educacionais.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-4 bg-muted/30 rounded-lg text-center space-y-2">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-neon/20">
                  <Eye className="h-6 w-6 text-neon" />
                </div>
                <p className="font-semibold text-foreground text-sm">Transparência</p>
                <p className="text-xs">Ferramentas claras e resultados honestos, sem falsas promessas ou informações enganosas</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center space-y-2">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-neon/20">
                  <Heart className="h-6 w-6 text-neon" />
                </div>
                <p className="font-semibold text-foreground text-sm">Responsabilidade</p>
                <p className="text-xs">Compromisso com o uso responsável das ferramentas e bem-estar dos usuários</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center space-y-2">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-neon/20">
                  <GraduationCap className="h-6 w-6 text-neon" />
                </div>
                <p className="font-semibold text-foreground text-sm">Educação</p>
                <p className="text-xs">Conhecimento como ferramenta principal para decisões melhores e mais conscientes</p>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Nossa Visão */}
      <Card>
        <CardContent className="p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Nossa Visão</h2>
            </div>
            <p>
              Democratizar o acesso ao conhecimento matemático e estatístico de qualidade no Brasil e no mundo. Queremos
              ser a principal referência em ferramentas educacionais de probabilidade e gestão de risco, reconhecida pela
              excelência dos nossos cálculos, pela clareza dos nossos conteúdos e pelo compromisso inabalável com a
              educação e a responsabilidade.
            </p>
            <p>
              Visamos um futuro em que toda pessoa tenha acesso facilitado a instrumentos de análise quantitativa,
              podendo compreender os riscos envolvidos em qualquer decisão baseada em probabilidades. Acreditamos que
              a literacia estatística é uma habilidade fundamental no mundo contemporâneo e trabalhamos para que ela
              seja acessível a todos, não apenas a especialistas.
            </p>
          </section>
        </CardContent>
      </Card>

      {/* O Que Oferecemos */}
      <Card>
        <CardContent className="p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">O Que Oferecemos</h2>
            </div>
            <p>
              O BetCalc Pro oferece uma suite completa de ferramentas educacionais gratuitas para estudo de probabilidade,
              estatística e gestão de risco:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
                <p className="font-semibold text-foreground">📊 Calculadoras</p>
                <ul className="text-xs space-y-1 ml-4 list-disc list-inside">
                  <li>Martingale — Progressão geométrica</li>
                  <li>Fibonacci — Sequência numérica aplicada</li>
                  <li>Soros — Estratégia de crescimento composto</li>
                  <li>Masaniello — Gestão avançada de posição</li>
                  <li>Gestão de Capital — Planejamento financeiro</li>
                  <li>Recuperação — Modelos de recuperação estatística</li>
                </ul>
              </div>
              <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
                <p className="font-semibold text-foreground">🔬 Simuladores</p>
                <ul className="text-xs space-y-1 ml-4 list-disc list-inside">
                  <li>Simulador Probabilístico — Análise de cenários</li>
                  <li>Analisador de Sequências — Padrões estatísticos</li>
                  <li>Gerador de Estratégias — Personalização de modelos</li>
                </ul>
              </div>
              <div className="space-y-2 p-3 bg-muted/30 rounded-lg sm:col-span-2">
                <p className="font-semibold text-foreground">📚 Conteúdo Educacional</p>
                <p className="text-xs">
                  Artigos, tutoriais e guias sobre probabilidade, estatística, gestão de risco e modelagem matemática.
                  Todo o conteúdo é desenvolvido com foco na educação e conscientização, proporcionando aos usuários
                  uma base sólida de conhecimento para interpretar resultados e tomar decisões informadas.
                </p>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Nossa Equipe */}
      <Card>
        <CardContent className="p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Nossa Equipe</h2>
            </div>
            <p>
              O BetCalc Pro é mantido por uma equipe de profissionais apaixonados por matemática e tecnologia. Nosso time
              reúne especialistas em diferentes áreas do conhecimento que compartilham um objetivo comum: tornar a educação
              matemática e estatística acessível a todos.
            </p>
            <p>
              Contamos com desenvolvedores de software experientes na criação de aplicações web de alta performance,
              matemáticos e estatísticos com profundo conhecimento em probabilidade e análise de risco, e educadores
              comprometidos com a clareza e acessibilidade do conhecimento científico.
            </p>
            <p>
              Cada ferramenta disponibilizada em nossa plataforma passa por rigorosos processos de validação matemática
              e testes de usabilidade, garantindo que nossos usuários tenham acesso a resultados precisos e a uma
              experiência de uso intuitiva e eficiente.
            </p>
          </section>
        </CardContent>
      </Card>

      {/* Disclaimers */}
      <Card>
        <CardContent className="p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Avisos Importantes</h2>
            </div>

            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 space-y-3">
              <div className="space-y-2">
                <p className="font-semibold text-foreground">⛔ Não somos uma plataforma financeira</p>
                <p>
                  O BetCalc Pro NÃO opera nenhuma plataforma de transações financeiras, NÃO aceita depósitos ou saques, NÃO
                  processa pagamentos de qualquer natureza e NÃO funciona como intermediário para qualquer
                  forma de atividade financeira ou comercial. Somos exclusivamente um provedor de ferramentas educacionais de cálculo
                  e simulação matemática.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-foreground">💰 Não oferecemos aconselhamento financeiro</p>
                <p>
                  As ferramentas e conteúdos do BetCalc Pro NÃO constituem aconselhamento financeiro, fiscal ou de
                  investimento. Não recomendamos estratégias específicas de aplicação ou gestão de recursos. As decisões
                  financeiras são de responsabilidade exclusiva do usuário, que deve sempre consultar profissionais
                  habilitados antes de tomar decisões que envolvam recursos financeiros.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-foreground">⚠️ Sem garantia de resultados</p>
                <p>
                  Nossas ferramentas são baseadas em modelos matemáticos teóricos e servem exclusivamente para fins
                  educacionais. Simulações e cálculos passados NÃO garantem resultados futuros. Os modelos probabilísticos
                  representam estimativas baseadas em premissas teóricas e não devem ser interpretados como previsões
                  definitivas de eventos reais.
                </p>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Nossos Valores */}
      <Card>
        <CardContent className="p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Nossos Valores</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neon/20">
                  <Eye className="h-4 w-4 text-neon" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Transparência</p>
                  <p>
                    Somos honestos sobre o que nossas ferramentas podem e não podem fazer. Nunca fazemos falsas
                    promessas e sempre destacamos as limitações dos modelos matemáticos utilizados, bem como os
                    riscos inerentes a qualquer análise baseada em probabilidades.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neon/20">
                  <Heart className="h-4 w-4 text-neon" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Responsabilidade</p>
                  <p>
                    Priorizamos o bem-estar dos nossos usuários acima de tudo. Promovemos ativamente o uso
                    responsável das ferramentas e fornecemos recursos para quem precisa de ajuda ou orientação.
                    Nosso compromisso é com a educação, nunca com a indução.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neon/20">
                  <GraduationCap className="h-4 w-4 text-neon" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Educação</p>
                  <p>
                    Acreditamos que o conhecimento é a melhor defesa contra decisões impulsivas e desinformadas.
                    Investimos em conteúdo educacional de qualidade para capacitar nossos usuários com ferramentas
                    intelectuais sólidas e fundamentadas em princípios matemáticos e estatísticos.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neon/20">
                  <Globe className="h-4 w-4 text-neon" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Acessibilidade</p>
                  <p>
                    Defendemos que o conhecimento matemático e estatístico de qualidade deve ser acessível a todos,
                    independentemente de condição financeira ou nível de escolaridade. Por isso, todas as nossas
                    ferramentas são gratuitas e projetadas para serem intuitivas e de fácil compreensão.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* AdSense Disclosure */}
      <Card>
        <CardContent className="p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Divulgação de Publicidade</h2>
            </div>
            <p>
              Para manter todas as nossas ferramentas gratuitas e acessíveis, o BetCalc Pro exibe anúncios fornecidos
              pelo <strong className="text-foreground">Google AdSense</strong>. Esses anúncios nos ajudam a cobrir os
              custos de manutenção do site, hospedagem, desenvolvimento contínuo de novas funcionalidades e produção
              de conteúdo educacional de qualidade.
            </p>
            <p>
              O Google AdSense utiliza cookies e tecnologias similares para exibir anúncios relevantes com base em seus
              interesses e histórico de navegação. Essa personalização é realizada pelo Google com base em seus próprios
              algoritmos e políticas de publicidade. Você pode gerenciar suas preferências de publicidade pessoal visitando
              as{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon underline hover:no-underline"
              >
                Configurações de Anúncios do Google
              </a>.
            </p>
            <p>
              A presença de anúncios não influencia o conteúdo ou os resultados de nossas ferramentas. Nossa prioridade
              é sempre a qualidade, a precisão e a integridade dos cálculos, simulações e conteúdos educacionais que
              oferecemos. O conteúdo editorial do BetCalc Pro é completamente independente da veiculação publicitária.
            </p>
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs italic">
                Para mais informações sobre como seus dados são utilizados para publicidade, consulte nossa{' '}
                <Link href="/privacy" className="text-neon underline hover:no-underline">
                  Política de Privacidade
                </Link>{' '}
                e{' '}
                <Link href="/cookies" className="text-neon underline hover:no-underline">
                  Política de Cookies
                </Link>.
              </p>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Informações de Contato */}
      <Card>
        <CardContent className="p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Informações de Contato</h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <Mail className="h-4 w-4 text-neon shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-sm">E-mail</p>
                  <a href="mailto:contato@betcalcpro.com.br" className="text-neon underline hover:no-underline">
                    contato@betcalcpro.com.br
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <MapPin className="h-4 w-4 text-neon shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Localização</p>
                  <p>[Cidade, Estado, Brasil] — a preencher</p>
                </div>
              </div>
            </div>
            <p>
              Para dúvidas, sugestões ou solicitações, entre em contato conosco através do e-mail acima ou visite
              nossa{' '}
              <Link href="/contact" className="text-neon underline hover:no-underline">
                página de contato
              </Link>.
              Responderemos sua mensagem em até 48 horas úteis.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
