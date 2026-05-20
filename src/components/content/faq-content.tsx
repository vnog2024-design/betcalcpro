'use client'

import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { HelpCircle, Calculator, Shield, BookOpen, Smartphone, CreditCard, BarChart3, AlertTriangle } from 'lucide-react'

const faqSections = [
  {
    title: 'Sobre o BetCalc Pro',
    icon: HelpCircle,
    color: 'text-neon',
    items: [
      {
        q: 'O que é o BetCalc Pro?',
        a: 'O BetCalc Pro é uma plataforma educacional gratuita que oferece calculadoras, simuladores e artigos sobre probabilidade, estatística e gestão de risco. Nossas ferramentas ajudam você a entender conceitos matemáticos e tomar decisões mais informadas.'
      },
      {
        q: 'O BetCalc Pro é gratuito?',
        a: 'Sim, o BetCalc Pro é 100% gratuito. Todas as calculadoras, simuladores e artigos estão disponíveis sem custo. Nosso site é mantido por anúncios do Google AdSense.'
      },
      {
        q: 'O BetCalc Pro é um site de apostas?',
        a: 'Não. O BetCalc Pro é uma ferramenta educacional. Não operamos plataformas de apostas, não aceitamos depósitos, não processamos pagamentos e não incentivamos atividades de risco. Nossas ferramentas são para aprendizado de matemática e estatística.'
      },
      {
        q: 'Posso instalar o BetCalc Pro no celular?',
        a: 'Sim! O BetCalc Pro é um Progressive Web App (PWA). No Android, toque nos três pontos do navegador e selecione "Adicionar à tela inicial". No iPhone (Safari), toque no ícone de compartilhar e selecione "Adicionar à Tela de Início". Você terá acesso rápido como um aplicativo nativo.'
      },
      {
        q: 'Preciso criar uma conta para usar?',
        a: 'Não é necessário criar conta para usar as ferramentas. Você pode usar todas as calculadoras e simuladores livremente. A opção de login existe apenas para salvar suas preferências e histórico de cálculos no seu dispositivo.'
      },
    ]
  },
  {
    title: 'Ferramentas e Calculadoras',
    icon: Calculator,
    color: 'text-neon-blue',
    items: [
      {
        q: 'O que é a calculadora Martingale?',
        a: 'A calculadora Martingale ajuda a visualizar a progressão geométrica que dobra o valor após cada perda. É uma ferramenta educacional para entender as propriedades matemáticas dessa progressão, incluindo o crescimento exponencial dos valores necessários e suas limitações teóricas.'
      },
      {
        q: 'O que é a calculadora Fibonacci?',
        a: 'A calculadora Fibonacci permite visualizar a sequência de Fibonacci aplicada a progressões. A sequência Fibonacci (1, 1, 2, 3, 5, 8, 13...) tem um crescimento menor que a Martingale, sendo útil para entender diferentes tipos de progressão matemática.'
      },
      {
        q: 'O que é a gestão de capital (bankroll)?',
        a: 'A gestão de capital é o conjunto de regras e estratégias para administrar seu dinheiro de forma responsável. Nossa calculadora ajuda a determinar tamanhos de posição adequados com base no seu capital total e tolerância ao risco, seguindo princípios como a regra do 1-2%.'
      },
      {
        q: 'O que é a calculadora Masaniello?',
        a: 'A calculadora Masaniello é uma ferramenta avançada de gestão que combina probabilidade e alocação de capital. Ela calcula quantas operações são necessárias para atingir um objetivo de lucro, considerando a probabilidade de sucesso e o capital disponível.'
      },
      {
        q: 'O que é a progressão geométrica (Soros)?',
        a: 'A progressão geométrica, também chamada de método Soros, reinveste os lucros de cada operação bem-sucedida na próxima. Ao contrário de progressões que aumentam após perdas, a progressão geométrica aumenta após ganhos, aproveitando sequências favoráveis.'
      },
      {
        q: 'Como funciona o simulador de probabilidades?',
        a: 'O simulador de probabilidades gera cenários aleatórios baseados em parâmetros que você define (probabilidade de sucesso, número de tentativas, etc.). É uma ferramenta didática para entender como a probabilidade funciona na prática e como a variância afeta os resultados no curto prazo.'
      },
    ]
  },
  {
    title: 'Gestão de Risco',
    icon: Shield,
    color: 'text-neon',
    items: [
      {
        q: 'O que é a regra do 1-2%?',
        a: 'A regra do 1-2% é um princípio de gestão de risco que recomenda nunca arriscar mais de 1% a 2% do seu capital total em uma única operação. Por exemplo, se você tem R$1.000, o máximo recomendado por operação seria entre R$10 e R$20. Isso protege seu capital contra sequências adversas.'
      },
      {
        q: 'O que é stop loss?',
        a: 'Stop loss é um limite predeterminado de perdas diárias, semanais ou mensais. Ao atingir esse limite, você deve parar e reavaliar sua estratégia. É uma ferramenta essencial de disciplina que evita decisões emocionais durante sequências negativas.'
      },
      {
        q: 'As ferramentas garantem lucro?',
        a: 'Não. Nenhuma ferramenta matemática pode garantir lucro. As calculadoras do BetCalc Pro são educacionais e ajudam a entender probabilidades e riscos, mas não preveem resultados. Toda decisão envolve incerteza e risco de perda.'
      },
    ]
  },
  {
    title: 'Conteúdo Educacional',
    icon: BookOpen,
    color: 'text-purple-500',
    items: [
      {
        q: 'Os artigos são confiáveis?',
        a: 'Nossos artigos são escritos com base em conceitos matemáticos e estatísticos consagrados, como teoria das probabilidades, estatística descritiva e análise de risco. O conteúdo é voltado para educação e não deve ser interpretado como aconselhamento financeiro.'
      },
      {
        q: 'Com que frequência novos artigos são publicados?',
        a: 'Publicamos novos artigos periodicamente, cobrindo temas como probabilidade, estatística, falácias cognitivas, simulação de Monte Carlo e gestão de risco. Acesse a seção de Artigos para ver o conteúdo disponível.'
      },
    ]
  },
  {
    title: 'Privacidade e Dados',
    icon: Shield,
    color: 'text-neon-blue',
    items: [
      {
        q: 'O BetCalc Pro armazena meus dados?',
        a: 'Os dados das calculadoras (histórico de cálculos, preferências de tema) são armazenados apenas no seu navegador (localStorage). Não enviamos esses dados para servidores externos. Você pode limpar seus dados a qualquer momento nas configurações do navegador.'
      },
      {
        q: 'O site usa cookies?',
        a: 'Sim, utilizamos cookies essenciais para o funcionamento do site e cookies do Google AdSense para exibição de anúncios. Você pode gerenciar suas preferências de cookies através do banner de consentimento que aparece ao acessar o site.'
      },
      {
        q: 'Como entro em contato?',
        a: 'Você pode entrar em contato conosco através da página de Contato no site. Respondemos perguntas sobre as ferramentas, reportamos bugs e aceitamos sugestões de melhorias.'
      },
    ]
  },
]

export function FAQContent() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-6 w-6 text-neon" />
          <h1 className="text-3xl font-bold">Perguntas Frequentes</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Tire suas dúvidas sobre o BetCalc Pro, nossas ferramentas e conceitos de probabilidade e gestão de risco.
        </p>
      </div>

      {/* FAQ Sections */}
      {faqSections.map((section) => (
        <div key={section.title}>
          <div className="flex items-center gap-2 mb-4">
            <section.icon className={`h-5 w-5 ${section.color}`} />
            <h2 className="text-xl font-bold">{section.title}</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-2">
            {section.items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`${section.title}-${index}`}
                className="border border-border/50 rounded-lg bg-card/50 backdrop-blur px-4 data-[state=open]:bg-card/80"
              >
                <AccordionTrigger className="text-left text-sm font-medium hover:no-underline hover:text-neon transition-colors py-4">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}

      {/* Still have questions */}
      <div className="rounded-xl border border-neon/20 bg-neon/5 p-6 text-center">
        <AlertTriangle className="h-8 w-8 text-neon mx-auto mb-3" />
        <h3 className="text-lg font-bold mb-2">Ainda tem dúvidas?</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
          Se você não encontrou a resposta que procurava, entre em contato conosco.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg gradient-neon text-black font-bold text-sm hover:opacity-90 transition-opacity"
        >
          Fale Conosco
        </Link>
      </div>

      {/* Install CTA */}
      <div className="rounded-xl border border-neon-blue/20 bg-neon-blue/5 p-6 text-center">
        <Smartphone className="h-8 w-8 text-neon-blue mx-auto mb-3" />
        <h3 className="text-lg font-bold mb-2">Instale no seu celular</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
          Acesse o BetCalc Pro como um app! No Android, toque nos três pontos do navegador e selecione &quot;Adicionar à tela inicial&quot;. No iPhone, toque no ícone de compartilhar e selecione &quot;Adicionar à Tela de Início&quot;.
        </p>
      </div>
    </div>
  )
}
