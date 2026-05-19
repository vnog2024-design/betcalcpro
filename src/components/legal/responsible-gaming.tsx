'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowLeft,
  Heart,
  AlertTriangle,
  ClipboardCheck,
  Lightbulb,
  Ban,
  Phone,
  ShieldCheck,
  Mail,
  BookOpen,
  Brain,
  Scale,
} from 'lucide-react'

export function ResponsibleGaming() {
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
        <Heart className="h-6 w-6 text-neon" />
        <h1 className="text-2xl font-bold">Uso Responsável</h1>
      </div>

      {/* Compromisso */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Nosso Compromisso com o Uso Responsável</h2>
            </div>
            <p>
              O <strong className="text-foreground">BetCalc Pro</strong> tem o compromisso de promover o uso responsável
              de suas ferramentas educacionais. Acreditamos que o conhecimento matemático e estatístico deve ser utilizado
              de forma consciente, ética e responsável, sempre com foco na educação e na compreensão dos riscos envolvidos
              em qualquer análise baseada em probabilidades.
            </p>
            <p>
              Nossas ferramentas foram desenvolvidas com o propósito exclusivo de educação matemática, permitindo que
              usuários compreendam melhor os conceitos de probabilidade, variância e gestão de risco. Elas não devem
              ser interpretadas como instrumentos de garantia de resultados ou como substitutos para o julgamento
              profissional em decisões financeiras.
            </p>
            <div className="bg-neon/10 border border-neon/30 rounded-lg p-4">
              <p>
                <strong className="text-foreground">Lembre-se:</strong> Nossas ferramentas são educacionais e servem
                exclusivamente para o estudo e a compreensão de conceitos matemáticos e estatísticos. Elas não eliminam
                riscos e não devem ser utilizadas como única base para decisões importantes. Se você não compreende
                totalmente os riscos envolvidos em qualquer atividade baseada em probabilidades, busque orientação
                profissional antes de prosseguir.
              </p>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Compreendendo Probabilidade e Risco */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Compreendendo Probabilidade e Risco</h2>
            </div>
            <p>
              A probabilidade é uma área da matemática que estuda a likelihood de ocorrência de eventos. É fundamental
              compreender que:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Eventos independentes:</strong> O resultado de eventos passados não influencia a probabilidade de eventos futuros. Cada evento é independente e não há &quot;memória&quot; nos sistemas probabilísticos;</li>
              <li><strong className="text-foreground">Variância e desvio:</strong> Mesmo com probabilidades teóricas bem definidas, os resultados reais podem divergir significativamente das expectativas no curto prazo. A variância é uma característica inerente a qualquer processo aleatório;</li>
              <li><strong className="text-foreground">Lei dos grandes números:</strong> As frequências observadas tendem a se aproximar das probabilidades teóricas apenas em um número muito grande de repetições. No curto prazo, desvios significativos são não apenas possíveis, mas esperados;</li>
              <li><strong className="text-foreground">Falácia do apostador:</strong> A crença de que eventos passados influenciam eventos futuros independentes é um erro cognitivo comum. Por exemplo, após uma sequência de resultados desfavoráveis, não é verdade que um resultado favorável se torna &quot;mais provável&quot;;</li>
              <li><strong className="text-foreground">Risco vs. Incerteza:</strong> Risco é mensurável e pode ser quantificado matematicamente. Incerteza não pode ser quantificada com precisão. Nossas ferramentas lidam com riscos quantificáveis, mas não eliminam incertezas do mundo real.</li>
            </ul>
          </section>
        </CardContent>
      </Card>

      {/* Sinais de Uso Problemático */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Sinais de Uso Problemático</h2>
            </div>
            <p>
              O uso inadequado de ferramentas de análise de probabilidade e risco pode se tornar um problema quando
              afeta negativamente sua vida financeira, emocional ou social. Fique atento aos seguintes sinais:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Confiar exclusivamente em ferramentas matemáticas para decisões importantes sem consultar profissionais habilitados;</li>
              <li>Ignorar os riscos e limitações inerentes aos modelos probabilísticos;</li>
              <li>Utilizar as ferramentas de forma compulsiva, passando tempo excessivo em simulações;</li>
              <li>Perseguir perdas — tentar recuperar prejuízos aumentando a exposição ao risco;</li>
              <li>Sentir ansiedade, irritabilidade ou frustração quando os resultados reais divergem das simulações;</li>
              <li>Comprometer recursos financeiros essenciais (moradia, alimentação, saúde) com base em resultados de simulações;</li>
              <li>Esconder de familiares e amigos o uso das ferramentas ou as decisões baseadas nelas;</li>
              <li>Confiar que modelos matemáticos podem &quot;prever&quot; resultados de forma infalível;</li>
              <li>Sentir necessidade de aumentar progressivamente a exposição ao risco para obter a mesma satisfação;</li>
              <li>Utilizar as ferramentas como fuga de problemas emocionais ou situações de estresse.</li>
            </ul>
            <p>
              Se você se identifica com algum destes sinais, recomendamos fortemente que procure ajuda profissional.
            </p>
          </section>
        </CardContent>
      </Card>

      {/* Autoavaliação */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Questionário de Autoavaliação</h2>
            </div>
            <p>
              Responda honestamente às perguntas abaixo. Se a resposta for &quot;sim&quot; para 3 ou mais perguntas,
              considere buscar ajuda profissional:
            </p>
            <div className="space-y-3">
              {[
                'Você já tomou decisões financeiras significativas baseando-se apenas em resultados de simulações, sem consultar profissionais?',
                'Você já sentiu ansiedade ou frustração intensa quando resultados reais divergiram de suas expectativas baseadas em cálculos?',
                'Você já comprometeu recursos financeiros essenciais (aluguel, alimentação, contas) baseando-se em projeções de ferramentas?',
                'Você já escondeu de familiares ou amigos o uso de ferramentas de análise ou decisões tomadas com base nelas?',
                'Você já aumentou progressivamente sua exposição ao risco tentando recuperar perdas anteriores?',
                'Você já se sentido incapaz de parar ou controlar o uso de ferramentas de análise e simulação?',
              ].map((question, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neon/20 text-neon text-xs font-bold">
                    {index + 1}
                  </span>
                  <p className="text-foreground">{question}</p>
                </div>
              ))}
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Dicas para Uso Responsável */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Dicas para Uso Responsável das Ferramentas</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: 'Entenda as limitações',
                  desc: 'Compreenda que modelos matemáticos são simplificações da realidade e não consideram todas as variáveis que podem influenciar resultados práticos.',
                },
                {
                  title: 'Nunca persiga perdas',
                  desc: 'Aceite que perdas são parte inerente de qualquer atividade que envolva risco. Tentar recuperar perdas aumentando a exposição ao risco é uma das atitudes mais perigosas.',
                },
                {
                  title: 'Consulte profissionais',
                  desc: 'Antes de tomar decisões financeiras importantes, consulte profissionais habilitados como consultores financeiros, contadores ou economistas.',
                },
                {
                  title: 'Defina limites claros',
                  desc: 'Estabeleça limites rigorosos para o uso das ferramentas e para qualquer decisão baseada em seus resultados. Nunca ultrapasse esses limites.',
                },
                {
                  title: 'Trate como ferramenta educacional',
                  desc: 'Utilize as ferramentas como recursos de aprendizado e não como instrumentos de tomada de decisão definitiva. Elas servem para educar, não para decidir.',
                },
                {
                  title: 'Faça pausas regulares',
                  desc: 'Intercale o uso das ferramentas com outras atividades. Não permita que o uso excessivo comprometa outras áreas da sua vida.',
                },
                {
                  title: 'Mantenha perspectiva',
                  desc: 'Lembre-se de que simulações são baseadas em modelos teóricos. Resultados reais podem e frequentemente divergem significativamente das projeções.',
                },
                {
                  title: 'Busque ajuda se necessário',
                  desc: 'Se sentir que o uso das ferramentas está afetando negativamente sua vida, não hesite em conversar com alguém de confiança ou buscar ajuda profissional.',
                },
              ].map((tip, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg space-y-1">
                  <p className="font-semibold text-foreground text-sm">{tip.title}</p>
                  <p>{tip.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Limitações dos Modelos */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Limitações dos Modelos Matemáticos</h2>
            </div>
            <p>
              É essencial compreender as limitações inerentes aos modelos matemáticos utilizados em nossas ferramentas:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Premissas simplificadoras:</strong> Os modelos assumem condições ideais que raramente se verificam na prática. Variáveis não consideradas podem ter impacto significativo nos resultados;</li>
              <li><strong className="text-foreground">Distribuição de probabilidade:</strong> Os modelos utilizam distribuições teóricas que podem não corresponder perfeitamente à distribuição dos eventos reais;</li>
              <li><strong className="text-foreground">Risco de modelo:</strong> O próprio modelo pode conter erros, simplificações excessivas ou premissas incorretas que levam a resultados imprecisos;</li>
              <li><strong className="text-foreground">Correlações não previstas:</strong> Eventos aparentemente independentes podem apresentar correlações não capturadas pelos modelos;</li>
              <li><strong className="text-foreground">Eventos extremos:</strong> Modelos probabilísticos tradicionais tendem a subestimar a probabilidade e o impacto de eventos extremos (&quot;cisnes negros&quot;);</li>
              <li><strong className="text-foreground">Dados históricos:</strong> Projeções baseadas em dados passados não garantem que os padrões observados se repetirão no futuro.</li>
            </ul>
          </section>
        </CardContent>
      </Card>

      {/* Suspensão de Acesso */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Ban className="h-5 w-5 text-destructive shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Suspensão de Acesso</h2>
            </div>
            <p>
              Se você sente que precisa de uma pausa no uso das ferramentas, a suspensão voluntária de acesso é uma
              medida importante. Consiste em solicitar a desativação temporária ou permanente da sua conta em nosso site.
            </p>
            <p>
              O BetCalc Pro respeita a decisão de qualquer usuário que deseje suspender ou encerrar seu acesso. Se
              você deseja solicitar a desativação da sua conta, entre em contato conosco e desativaremos sua conta
              imediatamente.
            </p>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="font-semibold text-foreground mb-1">Solicitar suspensão de acesso:</p>
              <p>
                Envie um e-mail para{' '}
                <a href="mailto:valdirnogueira2010@gmail.com" className="text-neon underline hover:no-underline">valdirnogueira2010@gmail.com</a>{' '}
                com o assunto &quot;Suspensão de Acesso&quot;. Sua conta será desativada em até 24 horas.
              </p>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Verificação de Idade */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Política de Verificação de Idade</h2>
            </div>
            <p>
              O BetCalc Pro é destinado <strong className="text-foreground">exclusivamente a maiores de 18 anos</strong>.
              Não toleramos o acesso de menores de idade ao nosso site e adotamos as seguintes medidas:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Avisos claros de restrição etária em todo o site;</li>
              <li>Verificação de idade no processo de cadastro;</li>
              <li>Encerramento imediato de contas de menores de idade identificadas;</li>
              <li>Conteúdo educacional que reforça a importância do uso responsável e da tomada de decisões conscientes;</li>
              <li>Eliminação imediata de dados de menores de idade que venham a ser coletados, em conformidade com a LGPD e o ECA.</li>
            </ul>
          </section>
        </CardContent>
      </Card>

      {/* Recursos de Ajuda */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Recursos Profissionais de Ajuda no Brasil</h2>
            </div>
            <p>
              Se você ou alguém que conhece está enfrentando problemas relacionados ao uso compulsivo de ferramentas
              de análise, dificuldades financeiras ou questões de saúde mental, procure ajuda profissional.
              Aqui estão alguns recursos disponíveis no Brasil:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg space-y-1">
                <p className="font-bold text-foreground">CVV — Centro de Valorização da Vida</p>
                <p>Ligação: <strong className="text-foreground">188</strong> (24 horas, gratuito)</p>
                <p>Chat: <a href="https://www.cvv.org.br/chat" target="_blank" rel="noopener noreferrer" className="text-neon underline hover:no-underline">www.cvv.org.br/chat</a></p>
                <p className="text-xs">Apoio emocional e prevenção do suicídio. Sigilo total.</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg space-y-1">
                <p className="font-bold text-foreground">SAMU — Serviço de Atendimento Móvel de Urgência</p>
                <p>Ligação: <strong className="text-foreground">192</strong> (24 horas, gratuito)</p>
                <p className="text-xs">Para emergências médicas relacionadas a crises de saúde mental.</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg space-y-1">
                <p className="font-bold text-foreground">CAPS — Centros de Atenção Psicossocial</p>
                <p>Unidades do SUS para atendimento em saúde mental.</p>
                <p className="text-xs">Procure o CAPS mais próximo na sua cidade. Atendimento gratuito.</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg space-y-1">
                <p className="font-bold text-foreground">Conselho Regional de Psicologia</p>
                <p>Referência para encontrar psicólogos habilitados.</p>
                <p className="text-xs">Procure o CRP da sua região para indicação de profissionais qualificados.</p>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Compromisso Educacional */}
      <Card>
        <CardContent className="p-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-neon shrink-0" />
              <h2 className="text-lg font-semibold text-foreground">Nosso Compromisso Educacional</h2>
            </div>
            <p>
              O BetCalc Pro reafirma que suas ferramentas são de natureza exclusivamente educacional. Nosso objetivo
              é fornecer conhecimento e recursos para que os usuários possam:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Compreender os fundamentos matemáticos de probabilidade e estatística;</li>
              <li>Analisar riscos de forma quantitativa e consciente;</li>
              <li>Simular cenários hipotéticos para fins de estudo e aprendizado;</li>
              <li>Desenvolver pensamento crítico sobre a interpretação de dados probabilísticos;</li>
              <li>Reconhecer as limitações inerentes a qualquer modelo matemático.</li>
            </ul>
            <p>
              Não incentivamos, promovemos ou facilitamos qualquer atividade de risco. Nossas ferramentas existem
              para educar e informar, capacitando os usuários a tomar decisões mais conscientes e fundamentadas.
            </p>
          </section>

          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground italic">
              Precisa de ajuda? Entre em contato: <a href="mailto:valdirnogueira2010@gmail.com" className="text-neon underline hover:no-underline">valdirnogueira2010@gmail.com</a>.
              Se está em crise emocional, ligue para o CVV: 188. Para mais informações sobre seus direitos, consulte
              nossos{' '}
              <Link href="/terms" className="text-neon underline hover:no-underline">Termos de Uso</Link> e{' '}
              <Link href="/privacy" className="text-neon underline hover:no-underline">Política de Privacidade</Link>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
