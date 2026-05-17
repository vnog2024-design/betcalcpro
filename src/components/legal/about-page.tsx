'use client'

import { useAppStore } from '@/store/app-store'
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
} from 'lucide-react'

export function AboutPage() {
  const { setCurrentPage } = useAppStore()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => setCurrentPage('home')} className="text-muted-foreground hover:text-neon">
          <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
        </Button>
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
              O <strong className="text-foreground">BetCalc Pro</strong> nasceu da paixão de um grupo de entusiastas
              por matemática, probabilidade e gestão financeira. Somos uma equipe de profissionais dedicados a criar
              ferramentas gratuitas que ajudam apostadores a tomar decisões mais conscientes e responsáveis.
            </p>
            <p>
              Acreditamos que a educação é a melhor ferramenta contra decisões impulsivas. Por isso, investimos nosso
              tempo e recursos no desenvolvimento de calculadoras, simuladores e conteúdo educativo de qualidade,
              acessíveis gratuitamente a todos.
            </p>
            <p>
              Nosso time é composto por desenvolvedores, matemáticos e especialistas em gestão de risco que trabalham
              voluntariamente para manter este projeto vivo e em constante evolução.
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
              Nossa missão é ajudar apostadores a gerenciar suas bancas de forma responsável, fornecendo ferramentas
              educacionais de qualidade que promovam a tomada de decisões informadas e conscientes.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-4 bg-muted/30 rounded-lg text-center space-y-2">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-neon/20">
                  <Eye className="h-6 w-6 text-neon" />
                </div>
                <p className="font-semibold text-foreground text-sm">Transparência</p>
                <p className="text-xs">Ferramentas claras e resultados honestos, sem falsas promessas</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center space-y-2">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-neon/20">
                  <Heart className="h-6 w-6 text-neon" />
                </div>
                <p className="font-semibold text-foreground text-sm">Responsabilidade</p>
                <p className="text-xs">Compromisso com o jogo responsável e bem-estar dos usuários</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center space-y-2">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-neon/20">
                  <GraduationCap className="h-6 w-6 text-neon" />
                </div>
                <p className="font-semibold text-foreground text-sm">Educação</p>
                <p className="text-xs">Conhecimento como ferramenta principal para decisões melhores</p>
              </div>
            </div>
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
              O BetCalc Pro oferece uma suite completa de ferramentas gratuitas para apostadores conscientes:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
                <p className="font-semibold text-foreground">📊 Calculadoras</p>
                <ul className="text-xs space-y-1 ml-4 list-disc list-inside">
                  <li>Martingale — Progressão de apostas</li>
                  <li>Fibonacci — Sequência numérica</li>
                  <li>Soros — Estratégia de crescimento</li>
                  <li>Masaniello — Gestão avançada</li>
                  <li>Gestão de Banca — Controle financeiro</li>
                  <li>Recuperação — Planejamento de recuperação</li>
                </ul>
              </div>
              <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
                <p className="font-semibold text-foreground">🎮 Simuladores</p>
                <ul className="text-xs space-y-1 ml-4 list-disc list-inside">
                  <li>Simulador Crash — Teste estratégias</li>
                  <li>Simulador Double — Cenários Double</li>
                  <li>Simulador Probabilístico — Análise de odds</li>
                  <li>Analisador de Sequências — Padrões</li>
                  <li>Gerador de Estratégias — Personalização</li>
                </ul>
              </div>
              <div className="space-y-2 p-3 bg-muted/30 rounded-lg sm:col-span-2">
                <p className="font-semibold text-foreground">📚 Conteúdo Educacional</p>
                <p className="text-xs">
                  Artigos, tutoriais e guias sobre gestão de banca, probabilidades, estratégias de aposta e jogo
                  responsável. Todo o conteúdo é desenvolvido com foco na educação e conscientização, nunca
                  incentivando ou promovendo o jogo.
                </p>
              </div>
            </div>
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
                <p className="font-semibold text-foreground">⛔ Não somos um operador de apostas</p>
                <p>
                  O BetCalc Pro NÃO opera jogos de azar, NÃO aceita apostas, NÃO processa depósitos ou saques e
                  NÃO funciona como plataforma de gambling. Somos exclusivamente um provedor de ferramentas
                  educacionais.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-foreground">💰 Não oferecemos aconselhamento financeiro</p>
                <p>
                  As ferramentas e conteúdos do BetCalc Pro NÃO constituem aconselhamento financeiro, fiscal ou de
                  investimento. Não recomendamos estratégias específicas de aposta. As decisões de aposta são de
                  responsabilidade exclusiva do usuário.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-foreground">⚠️ Sem garantia de resultados</p>
                <p>
                  Nossas ferramentas são baseadas em modelos matemáticos teóricos. Simulações e cálculos passados
                  NÃO garantem resultados futuros. Apostas envolvem risco real de perda financeira.
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
                    promessas de lucro e sempre destacamos os riscos envolvidos em apostas.
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
                    Priorizamos o bem-estar dos nossos usuários acima de tudo. Promovemos ativamente o jogo
                    responsável e fornecemos recursos para quem precisa de ajuda.
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
                    Acreditamos que o conhecimento é a melhor defesa contra decisões impulsivas. Investimos em
                    conteúdo educacional de qualidade para capacitar nossos usuários.
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
              custos de manutenção do site, hospedagem e desenvolvimento contínuo de novas funcionalidades.
            </p>
            <p>
              O Google AdSense utiliza cookies para exibir anúncios relevantes com base em seus interesses e histórico
              de navegação. Você pode gerenciar suas preferências de publicidade pessoal visitando as{' '}
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
              é sempre a qualidade e a precisão dos cálculos e simulações que oferecemos.
            </p>
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs italic">
                Para mais informações sobre como seus dados são utilizados para publicidade, consulte nossa{' '}
                <button
                  onClick={() => setCurrentPage('privacy')}
                  className="text-neon underline hover:no-underline"
                >
                  Política de Privacidade
                </button>{' '}
                e{' '}
                <button
                  onClick={() => setCurrentPage('cookies')}
                  className="text-neon underline hover:no-underline"
                >
                  Política de Cookies
                </button>.
              </p>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
