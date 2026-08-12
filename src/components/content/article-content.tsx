'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, BookOpen, Calculator, TrendingUp, BarChart3, Lightbulb, AlertTriangle } from 'lucide-react'
import { AdskeeperWidget } from '@/components/ads/adskeeper-widget'
import { ArticleCTA } from '@/components/shared/article-cta'
import { ShareButtons } from '@/components/shared/share-buttons'

const ctaLinksMap: Record<string, { name: string; href: string; description: string }[]> = {
  'introducao-probabilidade': [
    { name: 'Simulador de Probabilidades', href: '/probability-simulator', description: 'Simule eventos e calcule probabilidades' },
    { name: 'Calculadora Martingale', href: '/martingale', description: 'Analise a progressão Martingale' },
  ],
  'gestao-risco-capital': [
    { name: 'Gestão de Capital', href: '/bankroll', description: 'Calcule o tamanho ideal da posição' },
    { name: 'Recuperação de Capital', href: '/recovery', description: 'Planeje a recuperação de perdas' },
  ],
  'sequencia-fibonacci-matematica': [
    { name: 'Calculadora Fibonacci', href: '/fibonacci', description: 'Gere e analise a sequência Fibonacci' },
    { name: 'Calculadora Martingale', href: '/martingale', description: 'Compare com a progressão Martingale' },
  ],
  'progressao-martingale-analise': [
    { name: 'Calculadora Martingale', href: '/martingale', description: 'Simule a progressão Martingale' },
    { name: 'Calculadora de Ciclos', href: '/ciclos', description: 'Martingale com ciclos de recuperação' },
  ],
  'estatistica-descritiva-basica': [
    { name: 'Simulador de Probabilidades', href: '/probability-simulator', description: 'Explore conceitos estatísticos na prática' },
  ],
  'simulacao-monte-carlo': [
    { name: 'Simulador de Probabilidades', href: '/probability-simulator', description: 'Simule eventos aleatórios' },
    { name: 'Gerador de Estratégias', href: '/strategy-generator', description: 'Crie estratégias com simulação' },
  ],
  'falacias-estatisticas': [
    { name: 'Simulador de Probabilidades', href: '/probability-simulator', description: 'Teste falácias com simulação' },
  ],
  'valor-esperado-matematico': [
    { name: 'Gestão de Capital', href: '/bankroll', description: 'Aplique valor esperado na gestão' },
    { name: 'Calculadora de Hedging', href: '/hedging', description: 'Calcule coberturas de risco' },
  ],
  'paradoxo-monty-hall': [
    { name: 'Simulador de Probabilidades', href: '/probability-simulator', description: 'Simule o paradoxo de Monty Hall' },
  ],
  'lei-grandes-numeros': [
    { name: 'Simulador de Probabilidades', href: '/probability-simulator', description: 'Veja a LGN em ação' },
    { name: 'Gerador de Estratégias', href: '/strategy-generator', description: 'Estratégias baseadas em simulação' },
  ],
  'distribuicao-normal-gaussiana': [
    { name: 'Simulador de Probabilidades', href: '/probability-simulator', description: 'Explore a distribuição normal' },
  ],
  'introducao-teoria-jogos': [
    { name: 'Gerador de Estratégias', href: '/strategy-generator', description: 'Crie estratégias com teoria dos jogos' },
    { name: 'Calculadora de Hedging', href: '/hedging', description: 'Estratégias de cobertura de risco' },
  ],

  'como-calcular-probabilidades-odds': [
    { name: 'Simulador de Probabilidades', href: '/probability-simulator', description: 'Converta odds em probabilidades na prática' },
    { name: 'Gestão de Capital', href: '/bankroll', description: 'Defina o tamanho ideal da aposta' },
  ],
  'o-que-e-drawdown': [
    { name: 'Gestão de Capital', href: '/bankroll', description: 'Calcule limites de risco por aposta' },
    { name: 'Recuperação de Capital', href: '/recovery', description: 'Planeje a recuperação após drawdowns' },
  ],
  'guia-gestao-bankroll-apostas': [
    { name: 'Gestão de Capital', href: '/bankroll', description: 'Calcule o tamanho ideal da posição' },
    { name: 'Calculadora Martingale', href: '/martingale', description: 'Teste progressões com bankroll real' },
    { name: 'Calculadora Fibonacci', href: '/fibonacci', description: 'Aplique Fibonacci ao seu bankroll' },
  ],
  'sistema-masaniello-pratica': [
    { name: 'Calculadora Masaniello', href: '/masaniello', description: 'Simule o sistema Masaniello' },
    { name: 'Calculadora de Ciclos', href: '/ciclos', description: 'Masaniello com ciclos de recuperação' },
  ],
  'hedging-apostas-guia-completo': [
    { name: 'Calculadora de Hedging', href: '/hedging', description: 'Calcule coberturas automaticamente' },
    { name: 'Gestão de Capital', href: '/bankroll', description: 'Proteja seu capital com gestão' },
  ],
  'fibonacci-vs-martingale': [
    { name: 'Calculadora Fibonacci', href: '/fibonacci', description: 'Simule a progressão Fibonacci' },
    { name: 'Calculadora Martingale', href: '/martingale', description: 'Simule a progressão Martingale' },
    { name: 'Calculadora de Ciclos', href: '/ciclos', description: 'Compare com ciclos de recuperação' },
  ],
  'como-identificar-value-bets': [
    { name: 'Simulador de Probabilidades', href: '/probability-simulator', description: 'Calcule probabilidades e compare odds' },
    { name: 'Gerador de Estratégias', href: '/strategy-generator', description: 'Crie estratégias com valor esperado' },
    { name: 'Analisador de Sequências', href: '/sequence-analyzer', description: 'Analise seu histórico de apostas' },
  ],
  'lucro-esperado-vs-retorno': [
    { name: 'Gestão de Capital', href: '/bankroll', description: 'Otimize gestão com métricas corretas' },
    { name: 'Calculadora de Hedging', href: '/hedging', description: 'Proteja retornos com cobertura' },
    { name: 'Analisador de Sequências', href: '/sequence-analyzer', description: 'Analise o ROI real das apostas' },
  ],
}

const articles: Record<string, {
  title: string
  category: string
  readTime: string
  icon: React.ComponentType<{ className?: string }>
  content: React.ReactNode
}> = {
  'introducao-probabilidade': {
    title: 'Introdução à Teoria das Probabilidades',
    category: 'Fundamentos',
    readTime: '8 min',
    icon: Calculator,
    content: (
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <p className="text-base leading-relaxed">
          A teoria das probabilidades é um ramo da matemática que estuda a ocorrência de eventos aleatórios. 
          Desenvolvida inicialmente no século XVII por matemáticos como Pascal e Fermat, a teoria das probabilidades 
          tornou-se uma das áreas mais importantes da matemática moderna, com aplicações que vão desde a física 
          até a economia e a ciência da computação.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">🎲 O que é Probabilidade?</h2>
        <p className="text-base leading-relaxed">
          Probabilidade é uma medida numérica que quantifica a chance de um evento ocorrer. Ela é expressa como 
          um número entre 0 e 1 (ou 0% a 100%), onde 0 significa que o evento é impossível e 1 significa que 
          o evento é certo. A fórmula básica da probabilidade clássica é:
        </p>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono text-lg">
            P(A) = número de resultados favoráveis / número total de resultados possíveis
          </p>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">📐 Conceitos Fundamentais</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Espaço Amostral (Ω)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              O espaço amostral é o conjunto de todos os resultados possíveis de um experimento aleatório. 
              Por exemplo, ao lançar um dado, o espaço amostral é Ω = {'{1, 2, 3, 4, 5, 6}'}. Ao lançar uma moeda, 
              Ω = {'{cara, coroa}'}. O conceito de espaço amostral é fundamental para calcular qualquer probabilidade.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Evento</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Um evento é qualquer subconjunto do espaço amostral. Por exemplo, &quot;sair um número par&quot; no lançamento 
              de um dado é o evento E = {'{2, 4, 6}'}. A probabilidade desse evento é P(E) = 3/6 = 0,5 (50%).
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Eventos Mutuamente Exclusivos</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dois eventos são mutuamente exclusivos quando não podem ocorrer simultaneamente. Por exemplo, 
              &quot;sair 1&quot; e &quot;sair 6&quot; em um único lançamento de dado são mutuamente exclusivos. 
              Para eventos mutuamente exclusivos: P(A ou B) = P(A) + P(B).
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Eventos Independentes</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dois eventos são independentes quando a ocorrência de um não afeta a probabilidade do outro. 
              Por exemplo, o resultado de um lançamento de dado não afeta o próximo. Para eventos independentes: 
              P(A e B) = P(A) × P(B). Essa é a chamada regra da multiplicação.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">🔗 Probabilidade Condicional</h2>
        <p className="text-base leading-relaxed">
          A probabilidade condicional P(A|B) é a probabilidade do evento A ocorrer, sabendo que o evento B já ocorreu. 
          A fórmula é: P(A|B) = P(A e B) / P(B). Este conceito é fundamental para o Teorema de Bayes, que permite 
          atualizar probabilidades com base em novas informações. O Teorema de Bayes tem aplicações em diagnóstico 
          médico, filtros de spam, inteligência artificial e muitas outras áreas.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">🚀 Aplicações Práticas</h2>
        <p className="text-base leading-relaxed">
          A teoria das probabilidades tem inúmeras aplicações práticas no dia a dia: previsão do tempo (probabilidade 
          de chuva), análise de risco em seguros e finanças, controle de qualidade na indústria, algoritmos de 
          machine learning, criptografia, e muito mais. Compreender os fundamentos da probabilidade é essencial 
          para tomar decisões mais informadas em qualquer área que envolva incerteza.
        </p>

        <div className="flex gap-3 p-4 rounded-lg bg-neon/5 border border-neon/20 my-4">
          <span className="text-lg">💡</span>
          <div className="text-sm text-muted-foreground">Use o Simulador de Probabilidades para visualizar como a frequência relativa de eventos converge para a probabilidade teórica à medida que o número de tentativas aumenta.</div>
        </div>

        <div className="mt-8 p-4 rounded-lg border border-amber-500/30 bg-amber-500/5">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h3 className="font-bold text-amber-500">Nota Importante</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Entender probabilidade não significa poder prever resultados individuais. A probabilidade descreve 
            o comportamento de longo prazo de eventos aleatórios, não resultados específicos. A falácia do 
            jogador consiste em acreditar que resultados passados influenciam resultados futuros em eventos independentes.
          </p>
        </div>
      </div>
    ),
  },
  'gestao-risco-capital': {
    title: 'Gestão de Risco e Capital',
    category: 'Gestão',
    readTime: '10 min',
    icon: TrendingUp,
    content: (
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <p className="text-base leading-relaxed">
          A gestão de risco e capital é um conjunto de práticas e técnicas utilizadas para proteger recursos 
          financeiros contra perdas excessivas. Seja em investimentos, negócios ou qualquer atividade que envolva 
          incerteza financeira, a gestão adequada do risco é fundamental para a sustentabilidade a longo prazo.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">🛡️ Princípios Fundamentais</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">1. Proteção do Capital</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              O princípio mais importante da gestão de risco é proteger o capital. Sem capital, não há como 
              se recuperar de perdas. A regra prática é nunca arriscar mais do que uma pequena porcentagem 
              do capital total em uma única operação — geralmente entre 1% e 2%. Isso garante que mesmo uma 
              sequência de perdas não elimine seu capital.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">2. Diversificação</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Não coloque todos os ovos na mesma cesta. A diversificação reduz o risco concentrado distribuindo 
              o capital entre diferentes tipos de operações ou investimentos. Matematicamente, a diversificação 
              pode reduzir a variância total do portfólio sem necessariamente reduzir o retorno esperado.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">3. Relação Risco-Retorno</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Toda decisão financeira envolve uma relação entre o risco assumido e o retorno esperado. 
              O princípio fundamental é que riscos maiores devem ser compensados por retornos potenciais maiores. 
              A análise risco-retorno permite avaliar se uma operação vale a pena do ponto de vista matemático.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">📏 Calculando o Tamanho da Posição</h2>
        <p className="text-base leading-relaxed">
          O cálculo do tamanho da posição é uma das aplicações mais práticas da gestão de risco. A fórmula básica é:
        </p>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono text-lg">
            Tamanho da Posição = (Capital × Risco por Operação) / Risco da Operação
          </p>
        </div>
        <p className="text-base leading-relaxed mt-4">
          Por exemplo, se você tem R$10.000 de capital, arrisca 1% por operação (R$100) e a operação tem um 
          risco de R$5, o tamanho da posição seria 100/5 = 20 unidades. Este cálculo garante que uma perda 
          na operação não exceda o valor predeterminado.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">🎯 Stop Loss e Take Profit</h2>
        <p className="text-base leading-relaxed">
          Stop loss é o nível de preço onde você automaticamente sai de uma operação para limitar perdas. 
          Take profit é o nível onde você garante o lucro. A relação entre o take profit e o stop loss 
          (chamada de relação risco-retorno) deve ser favorável — geralmente busca-se pelo menos 2:1, 
          ou seja, o ganho potencial deve ser pelo menos o dobro da perda potencial.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">📉 O Drawdown Máximo</h2>
        <p className="text-base leading-relaxed">
          Drawdown é a maior queda percentual do capital desde um ponto máximo até um ponto mínimo. É uma medida 
          fundamental de risco que mostra o pior cenário já vivido. Um drawdown de 50% exige um retorno de 100% 
          para recuperação — por isso é tão importante limitar o tamanho das perdas. A gestão de risco eficaz 
          visa manter o drawdown máximo em níveis aceitáveis (geralmente abaixo de 20-30%).
        </p>

        <div className="mt-8 p-4 rounded-lg border border-neon-blue/30 bg-neon-blue/5">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-5 w-5 text-neon-blue" />
            <h3 className="font-bold text-neon-blue">Dica Importante</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A gestão de risco não é sobre evitar perdas — é sobre controlá-las. Perdas são parte natural de 
            qualquer atividade que envolva incerteza. O segredo está em garantir que as perdas sejam pequenas 
            o suficiente para que você possa continuar operando até que as operações favoráveis compensem.
          </p>
        </div>
      </div>
    ),
  },
  'sequencia-fibonacci-matematica': {
    title: 'A Sequência Fibonacci na Matemática',
    category: 'Matemática',
    readTime: '7 min',
    icon: BarChart3,
    content: (
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <p className="text-base leading-relaxed">
          A sequência de Fibonacci é uma das sequências matemáticas mais famosas do mundo. Descrita pelo 
          matemático italiano Leonardo Fibonacci no século XIII, ela começa com 0 e 1, e cada número 
          subsequente é a soma dos dois anteriores: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">🔢 Propriedades Matemáticas</h2>
        <p className="text-base leading-relaxed">
          A sequência de Fibonacci possui propriedades matemáticas notáveis:
        </p>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li className="flex gap-2"><span className="text-neon">•</span> A razão entre termos consecutivos converge para o número áureo (φ ≈ 1,618033988...)</li>
          <li className="flex gap-2"><span className="text-neon">•</span> A soma dos primeiros n termos é igual ao termo (n+2) menos 1</li>
          <li className="flex gap-2"><span className="text-neon">•</span> O quadrado de qualquer termo é aproximadamente igual ao produto dos termos adjacentes, mais ou menos 1</li>
          <li className="flex gap-2"><span className="text-neon">•</span> Dois termos consecutivos são sempre primos entre si (não têm divisores comuns)</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">✨ O Número Áureo (φ)</h2>
        <p className="text-base leading-relaxed">
          A proporção áurea, representada pela letra grega φ (phi), é aproximadamente 1,618. Ela surge 
          naturalmente na sequência de Fibonacci: à medida que os números crescem, a razão entre termos 
          consecutivos se aproxima cada vez mais de φ. Este número aparece em incontáveis fenômenos 
          naturais e é considerado uma das proporções mais harmônicas da matemática.
        </p>

        <Card className="bg-neon/5 border-neon/20 p-4 my-4">
          <CardContent className="p-0">
            <p className="text-center font-mono text-lg">φ = (1 + √5) / 2 ≈ 1,6180339887...</p>
            <p className="text-center text-sm text-muted-foreground mt-2">A proporção áurea — o limite da razão entre termos consecutivos de Fibonacci</p>
          </CardContent>
        </Card>

        <h2 className="text-xl font-bold mt-8 mb-3">🌻 Fibonacci na Natureza</h2>
        <p className="text-base leading-relaxed">
          A sequência de Fibonacci aparece em diversos fenômenos naturais: o número de pétalas de muitas 
          flores (3, 5, 8, 13, 21), a disposição das sementes no girassol, as espirais de conchas marinhas 
          (nautilus), a ramificação de árvores e até a estrutura de furacões. A natureza parece &quot;preferir&quot; 
          esta sequência por sua eficiência matemática no empacotamento e crescimento.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">🛠️ Aplicações Práticas</h2>
        <p className="text-base leading-relaxed">
          A sequência de Fibonacci e o número áureo têm aplicações em diversas áreas: análise técnica de 
          mercados financeiros (níveis de suporte e resistência), design e arquitetura (proporções áureas), 
          algoritmos de computação (busca fibonacci), e como base para sistemas de progressão em gestão 
          de capital. É importante notar que, embora fascinante, a sequência de Fibonacci não possui 
          propriedades mágicas — sua utilidade vem de suas propriedades matemáticas reais.
        </p>

        <div className="flex gap-3 p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 my-4">
          <span className="text-lg">⚠️</span>
          <div className="text-sm text-muted-foreground">Embora a sequência de Fibonacci apareça em muitos fenômenos naturais, nem toda ocorrência de números de Fibonacci na natureza é significativa. Cuidado para não ver padrões onde não existem — isso é chamado de apofenia.</div>
        </div>
      </div>
    ),
  },
  'progressao-martingale-analise': {
    title: 'Análise Matemática da Progressão Martingale',
    category: 'Análise',
    readTime: '12 min',
    icon: TrendingUp,
    content: (
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <p className="text-base leading-relaxed">
          A progressão Martingale é um dos sistemas de progressão mais conhecidos e estudados na matemática. 
          Originalmente concebida na França do século XVIII, a Martingale baseia-se em um princípio simples: 
          após uma perda, dobra-se o valor da próxima operação, de forma que uma vitória recupere todas as 
          perdas anteriores e gere um lucro igual à aposta inicial.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">⚙️ Como Funciona a Progressão</h2>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono">
            Nível 1: R$10 → Perda → Saldo: -R$10<br/>
            Nível 2: R$20 → Perda → Saldo: -R$30<br/>
            Nível 3: R$40 → Perda → Saldo: -R$70<br/>
            Nível 4: R$80 → Ganho (+R$80) → Saldo: +R$10
          </p>
        </div>
        <p className="text-base leading-relaxed mt-4">
          Em cada nível, o valor apostado é o dobro do anterior. A ideia é que eventualmente uma vitória 
          ocorrerá, cobrindo todas as perdas e gerando lucro. No exemplo acima, com uma aposta inicial de 
          R$10, após 3 perdas consecutivas seguidas de uma vitória no nível 4, o resultado líquido é +R$10.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">📊 Análise Estatística</h2>
        <p className="text-base leading-relaxed">
          A progressão Martingale tem uma propriedade teórica interessante: em um cenário com probabilidade 
          de vitória de 50% e recursos infinitos, o valor esperado é positivo. No entanto, na prática, 
          existem limitações críticas:
        </p>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li className="flex gap-2"><span className="text-amber-500">•</span> <strong>Capital finito:</strong> Ninguém tem recursos infinitos. Após n perdas, a aposta necessária é 2^(n-1) × aposta inicial</li>
          <li className="flex gap-2"><span className="text-amber-500">•</span> <strong>Limites de mesa:</strong> Cassinos e plataformas impõem limites máximos de aposta</li>
          <li className="flex gap-2"><span className="text-amber-500">•</span> <strong>Crescimento exponencial:</strong> O valor necessário dobra a cada nível, crescendo rapidamente</li>
          <li className="flex gap-2"><span className="text-amber-500">•</span> <strong>Probabilidade de ruína:</strong> A probabilidade de uma sequência longa de perdas não é tão baixa quanto parece</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">💥 A Matemática da Ruína</h2>
        <p className="text-base leading-relaxed">
          Com probabilidade de 50% por evento, a chance de 10 perdas consecutivas é (0,5)^10 = 0,0977%, 
          ou aproximadamente 1 em 1.024. Isso parece pequeno, mas considere que em 1.000 sequências de 
          operações, é estatisticamente esperado que pelo menos uma sequência de 10 perdas ocorra. Com uma 
          aposta inicial de R$10, 10 perdas consecutivas exigiriam uma aposta de R$5.120 no 11º nível, 
          com um prejuízo acumulado de R$10.230.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">🎓 A Martingale como Ferramenta Educacional</h2>
        <p className="text-base leading-relaxed">
          Embora a Martingale seja frequentemente discutida no contexto de apostas, ela é primeiramente um 
          conceito matemático importante. Estudar a Martingale ensina sobre progressões geométricas, 
          crescimento exponencial, probabilidade de ruína e os limites da intuição humana em relação a 
          eventos aleatórios. É um excelente exercício de pensamento matemático crítico.
        </p>

        <div className="mt-8 p-4 rounded-lg border border-amber-500/30 bg-amber-500/5">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h3 className="font-bold text-amber-500">Aviso Matemático</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A progressão Martingale é um conceito matemático com limitações práticas severas. O crescimento 
            exponencial dos valores necessários e os limites de capital a tornam insustentável a longo prazo. 
            Este artigo é para fins educacionais — não é uma recomendação de uso.
          </p>
        </div>
      </div>
    ),
  },
  'estatistica-descritiva-basica': {
    title: 'Estatística Descritiva Básica',
    category: 'Estatística',
    readTime: '9 min',
    icon: BarChart3,
    content: (
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <p className="text-base leading-relaxed">
          A estatística descritiva é o ramo da estatística que organiza, resume e apresenta dados de forma 
          compreensível. Antes de fazer inferências ou previsões, é fundamental entender os dados que você 
          tem — e é aí que a estatística descritiva entra.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">📏 Medidas de Tendência Central</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Média Aritmética</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A média é a soma de todos os valores dividida pelo número de observações. É a medida mais 
              comum, mas pode ser distorcida por valores extremos (outliers). Exemplo: a média de 
              {'{2, 4, 6, 8, 100}'} é 24, mas isso não representa bem o &quot;centro&quot; dos dados devido ao valor 100.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Mediana</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A mediana é o valor central quando os dados estão ordenados. Metade dos valores fica acima 
              e metade abaixo. Ao contrário da média, a mediana não é afetada por outliers. No exemplo 
              acima, a mediana seria 6, uma representação mais fiel do &quot;centro&quot;.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Moda</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A moda é o valor que mais se repete no conjunto de dados. Um conjunto pode ser unimodal 
              (uma moda), bimodal (duas modas) ou multimodal. É útil para dados categóricos.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">📊 Medidas de Dispersão</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Variância</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A variância mede o quão dispersos os valores estão em relação à média. É calculada como a 
              média dos quadrados das diferenças entre cada valor e a média. Uma variância alta indica 
              dados muito espalhados; uma variância baixa indica dados concentrados.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Desvio Padrão</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              O desvio padrão é a raiz quadrada da variância. É mais intuitivo que a variância porque 
              está na mesma unidade dos dados originais. Na distribuição normal, cerca de 68% dos dados 
              ficam a um desvio padrão da média, 95% a dois, e 99,7% a três.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">🔔 Distribuição Normal</h2>
        <p className="text-base leading-relaxed">
          A distribuição normal (ou gaussiana) é a distribuição mais importante da estatística. Sua forma 
          de &quot;sino&quot; simétrico aparece naturalmente em muitos fenômenos. As propriedades da distribuição 
          normal — 68-95-99,7 — são fundamentais para análise de dados e testes de hipóteses.
        </p>
      </div>
    ),
  },
  'simulacao-monte-carlo': {
    title: 'Simulação de Monte Carlo',
    category: 'Simulação',
    readTime: '11 min',
    icon: Calculator,
    content: (
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <p className="text-base leading-relaxed">
          A simulação de Monte Carlo é um método computacional que utiliza amostragem aleatória repetida 
          para obter resultados numéricos. Desenvolvido durante o Projeto Manhattan na década de 1940, 
          o método recebeu esse nome em homenagem ao famoso cassino de Monte Carlo, devido à natureza 
          aleatória das simulações.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">🔄 Como Funciona</h2>
        <p className="text-base leading-relaxed">
          O método de Monte Carlo funciona em três passos básicos:
        </p>
        <ol className="space-y-3 text-base text-muted-foreground list-decimal list-inside">
          <li><strong className="text-foreground">Definir o modelo:</strong> Especificar as variáveis de entrada e suas distribuições de probabilidade</li>
          <li><strong className="text-foreground">Gerar amostras aleatórias:</strong> Simular milhares ou milhões de cenários possíveis usando números aleatórios</li>
          <li><strong className="text-foreground">Analisar os resultados:</strong> Calcular estatísticas (média, variância, percentis) a partir dos resultados simulados</li>
        </ol>

        <h2 className="text-xl font-bold mt-8 mb-3">🎯 Exemplo Prático: Estimativa de Pi</h2>
        <p className="text-base leading-relaxed">
          Uma das demonstrações mais elegantes do método Monte Carlo é a estimativa do valor de π. 
          Imagine um quadrado de lado 1 com um círculo inscrito. A razão entre as áreas é π/4. 
          Gerando pontos aleatórios dentro do quadrado e contando quantos caem dentro do círculo, 
          podemos estimar π. Com 1 milhão de pontos, a estimativa converge para 3,14159... com 
          precisão crescente.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">🚀 Aplicações</h2>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li className="flex gap-2"><span className="text-neon">•</span> Finanças: precificação de derivativos, análise de risco de portfólio (VaR)</li>
          <li className="flex gap-2"><span className="text-neon">•</span> Engenharia: análise de confiabilidade de sistemas complexos</li>
          <li className="flex gap-2"><span className="text-neon">•</span> Física: simulação de partículas, termodinâmica</li>
          <li className="flex gap-2"><span className="text-neon">•</span> Logística: otimização de rotas e cadeias de suprimento</li>
          <li className="flex gap-2"><span className="text-neon">•</span> Inteligência artificial: métodos de amostragem em ML</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">⚠️ Limitações</h2>
        <p className="text-base leading-relaxed">
          A principal limitação do Monte Carlo é a necessidade de muitas simulações para convergir, 
          especialmente para eventos raros. A qualidade dos resultados depende da qualidade do modelo 
          e das distribuições de probabilidade escolhidas. Além disso, eventos com probabilidade muito 
          baixa podem não ser adequadamente representados sem um número extremamente alto de simulações.
        </p>

        <div className="flex gap-3 p-4 rounded-lg bg-neon/5 border border-neon/20 my-4">
          <span className="text-lg">💡</span>
          <div className="text-sm text-muted-foreground">Você pode experimentar simulações de Monte Carlo diretamente no nosso Simulador de Probabilidades — tente aumentar o número de simulações e observe como os resultados convergem!</div>
        </div>
      </div>
    ),
  },
  'falacias-estatisticas': {
    title: 'Falácias Estatísticas Comuns',
    category: 'Estatística',
    readTime: '8 min',
    icon: AlertTriangle,
    content: (
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <p className="text-base leading-relaxed">
          Nossos cérebros não são naturalmente bons com probabilidade e estatística. Somos vítimas de 
          vieses cognitivos que nos levam a conclusões erradas. Conhecer as falácias estatísticas mais 
          comuns é essencial para pensar de forma mais racional e tomar decisões melhores.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">🛩️ 1. Viés do Sobrevivente</h2>
        <p className="text-base leading-relaxed">
          O viés do sobrevivente ocorre quando focamos apenas nos &quot;sobreviventes&quot; de um processo e 
          ignoramos os que falharam. Exemplo clássico: durante a Segunda Guerra, analistas queriam 
          reforçar as partes dos aviões que voltavam com mais buracos. O estatístico Abraham Wald 
          mostrou que deveriam reforçar as partes SEM buracos — os aviões que voltaram sobreviveram 
          apesar dos danos; os que foram atingidos nas partes intactas não voltaram.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">🎰 2. Falácia do Jogador</h2>
        <p className="text-base leading-relaxed">
          A falácia do jogador é a crença de que resultados passados de eventos independentes influenciam 
          resultados futuros. &quot;Saiu vermelho 5 vezes seguidas, então a próxima deve ser preto&quot; — errado! 
          Cada evento é independente. A roleta não tem memória. A probabilidade é sempre a mesma, 
          independentemente do histórico. Essa falácia é extremamente comum e pode levar a decisões ruins.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">📉 3. Regressão à Média</h2>
        <p className="text-base leading-relaxed">
          A regressão à média é o fenômeno onde valores extremos tendem a ser seguidos por valores mais 
          próximos da média. Se alguém tem um desempenho excepcional, é provável que o próximo desempenho 
          seja mais próximo da média — não porque a pessoa piorou, mas porque o desempenho extremo 
          envolve sorte que não se repete. Ignorar a regressão à média leva a falsas causalidades.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">🔗 4. Correlação não é Causalidade</h2>
        <p className="text-base leading-relaxed">
          Duas variáveis podem estar correlacionadas sem que uma cause a outra. O número de afogamentos 
          e vendas de sorvete estão correlacionados — não porque sorvete causa afogamento, mas porque 
          ambos aumentam no verão. Sempre questione se uma correlação implica causalidade ou se há uma 
          variável confundidora (neste caso, a temperatura).
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">🔄 5. Lei dos Grandes Números Mal Compreendida</h2>
        <p className="text-base leading-relaxed">
          A lei dos grandes números diz que a média de muitos eventos converge para a probabilidade teórica. 
          Isso NÃO significa que desvios serão &quot;compensados&quot;. Se uma moeda cai 10 vezes em cara, 
          não é verdade que as próximas 10 serão coroa para &quot;equilibrar&quot;. A convergência ocorre 
          pela diluição, não pela compensação — as 10 caras extras se tornam insignificantes 
          quando divididas por milhares de lançamentos.
        </p>

        <div className="flex gap-3 p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 my-4">
          <span className="text-lg">⚠️</span>
          <div className="text-sm text-muted-foreground">A falácia do jogador é uma das armadilhas cognitivas mais perigosas. Ela nos faz acreditar que &quot;estamos devendo&quot; uma vitória após uma sequência de perdas, mas cada evento é independente. Use nosso Simulador de Probabilidades para ver isso na prática!</div>
        </div>
      </div>
    ),
  },
  'valor-esperado-matematico': {
    title: 'Valor Esperado Matemático',
    category: 'Fundamentos',
    readTime: '7 min',
    icon: Lightbulb,
    content: (
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <p className="text-base leading-relaxed">
          O valor esperado (ou esperança matemática) é um dos conceitos mais fundamentais da teoria 
          das probabilidades. Ele representa a média dos resultados possíveis de um experimento 
          aleatório, ponderada por suas probabilidades. Em termos simples: é o que você pode esperar 
          &quot;em média&quot; se repetir um experimento muitas vezes.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">📐 Fórmula do Valor Esperado</h2>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono text-lg">
            E(X) = Σ (xᵢ × P(xᵢ))
          </p>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Onde xᵢ são os valores possíveis e P(xᵢ) são suas probabilidades
          </p>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">🧮 Exemplo Prático</h2>
        <p className="text-base leading-relaxed">
          Imagine uma aposta onde você paga R$10 para jogar. Se sair cara, ganha R$15; se sair coroa, 
          ganha R$0. O valor esperado é:
        </p>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono">
            E(X) = (15 × 0,5) + (0 × 0,5) = 7,50
          </p>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Você paga R$10 e o valor esperado de retorno é R$7,50 → Valor esperado líquido = -R$2,50
          </p>
        </div>
        <p className="text-base leading-relaxed mt-4">
          Isso significa que, em média, a cada vez que você faz essa aposta, perde R$2,50. No curto 
          prazo você pode ganhar ou perder, mas no longo prazo o resultado converge para o valor esperado. 
          Qualquer aposta com valor esperado negativo é matematicamente desfavorável a longo prazo.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">💼 Aplicações do Valor Esperado</h2>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Seguros:</strong> Prêmios são calculados com base no valor esperado de sinistros</li>
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Investimentos:</strong> Retorno esperado de um ativo é seu valor esperado</li>
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Decisões empresariais:</strong> Avaliar projetos pelo valor esperado de retorno</li>
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Análise de risco:</strong> Comparar valor esperado com variância para decisões informadas</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">⚖️ Valor Esperado e Variância</h2>
        <p className="text-base leading-relaxed">
          O valor esperado sozinho não conta a história completa. Duas distribuições podem ter o mesmo 
          valor esperado mas riscos muito diferentes. A variância (e o desvio padrão) complementa o 
          valor esperado, medindo a dispersão dos resultados em torno da média. Uma decisão racional 
          deve considerar tanto o valor esperado quanto o risco (variância).
        </p>

        <div className="mt-8 p-4 rounded-lg border border-neon-blue/30 bg-neon-blue/5">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-5 w-5 text-neon-blue" />
            <h3 className="font-bold text-neon-blue">Insight Importante</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            O valor esperado é uma ferramenta matemática poderosa, mas não prevê resultados individuais. 
            Ele descreve o comportamento de longo prazo. No curto prazo, resultados podem se desviar 
            significativamente do valor esperado — isso é a essência da variância e da aleatoriedade.
          </p>
        </div>
      </div>
    ),
  },
  'paradoxo-monty-hall': {
    title: 'O Paradoxo de Monty Hall',
    category: 'Probabilidade',
    readTime: '6 min',
    icon: Lightbulb,
    content: (
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <p className="text-base leading-relaxed">
          O paradoxo de Monty Hall é um dos problemas de probabilidade mais contra-intuitivos já formulados. 
          Baseado no programa de TV americano &quot;Let&apos;s Make a Deal&quot; apresentado por Monty Hall, este problema 
          desafia nossa intuição sobre probabilidade de forma surpreendente.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">🚪 O Problema</h2>
        <p className="text-base leading-relaxed">
          Imagine que você está em um programa de TV e há 3 portas. Atrás de uma porta há um prêmio (um carro) 
          e atrás das outras duas há bodes. Você escolhe uma porta (digamos, a porta 1). O apresentador, que 
          sabe o que está atrás de cada porta, abre uma das outras portas revelando um bode (digamos, a porta 3). 
          Ele então pergunta: &quot;Você quer trocar para a porta 2?&quot;
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">🤯 A Resposta Contra-Intuitiva</h2>
        <p className="text-base leading-relaxed">
          A maioria das pessoas acredita que, com duas portas restantes, a probabilidade é 50-50, então tanto 
          faz trocar ou não. Mas a resposta correta é: <strong className="text-foreground">você deve sempre trocar</strong>, 
          pois trocar dá 2/3 de chance de ganhar, enquanto manter dá apenas 1/3.
        </p>

        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono text-lg">
            Manter a escolha: 1/3 ≈ 33,3% de chance de ganhar
          </p>
          <p className="text-center font-mono text-lg">
            Trocar de porta: 2/3 ≈ 66,7% de chance de ganhar
          </p>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">🔍 Por Que Funciona?</h2>
        <p className="text-base leading-relaxed">
          A chave está em entender que o apresentador NÃO abre uma porta aleatoriamente — ele sempre abre 
          uma porta com bode. Quando você escolhe inicialmente, há 1/3 de chance de ter escolhido o carro 
          e 2/3 de chance de ter escolhido um bode. Se escolheu o carro (1/3), trocar faz você perder. 
          Se escolheu um bode (2/3), trocar faz você ganhar, pois o apresentador já eliminou o outro bode.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">💯 Simulação com 100 Portas</h2>
        <p className="text-base leading-relaxed">
          Para entender melhor, imagine 100 portas: 1 carro e 99 bodes. Você escolhe uma porta (1% de chance 
          de ser o carro). O apresentador abre 98 portas com bodes, restando apenas a sua porta e mais uma. 
          Trocar? É óbvio que sim — há 99% de chance de que o carro esteja na outra porta. O mesmo princípio 
          se aplica com 3 portas, apenas com probabilidades menores.
        </p>

        <div className="mt-8 p-4 rounded-lg border border-neon-blue/30 bg-neon-blue/5">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-5 w-5 text-neon-blue" />
            <h3 className="font-bold text-neon-blue">Lição Importante</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            O paradoxo de Monty Hall ilustra como informações adicionais (a ação do apresentador) mudam 
            as probabilidades. Nossa intuição frequentemente falha com probabilidade condicional — por isso 
            é tão importante usar matemática rigorosa em vez de &quot;bom senso&quot; quando lidamos com incerteza.
          </p>
        </div>
      </div>
    ),
  },
  'lei-grandes-numeros': {
    title: 'A Lei dos Grandes Números',
    category: 'Estatística',
    readTime: '8 min',
    icon: BarChart3,
    content: (
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <p className="text-base leading-relaxed">
          A Lei dos Grandes Números (LGN) é um dos teoremas mais importantes da teoria das probabilidades. 
          Ela afirma que, à medida que o número de tentativas de um experimento aleatório aumenta, a média 
          dos resultados observados converge para o valor esperado teórico. Em termos simples: quanto mais 
          você repete um experimento, mais a média se aproxima do que a teoria prevê.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">🪙 Exemplo com Moeda</h2>
        <p className="text-base leading-relaxed">
          Se você lançar uma moeda justa 10 vezes, pode obter 7 caras (70%). Com 100 lançamentos, talvez 
          55 caras (55%). Com 1.000 lançamentos, provavelmente algo como 505 caras (50,5%). Com 1.000.000 
          de lançamentos, a proporção será extremamente próxima de 50%. A LGN garante essa convergência.
        </p>

        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono">
            10 lançamentos: ~70% possível<br/>
            100 lançamentos: ~55% provável<br/>
            1.000 lançamentos: ~50,5% esperado<br/>
            1.000.000 lançamentos: ~50,01% praticamente certo
          </p>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">🔬 LGN Fraca vs. Forte</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Lei Fraca (Convergência em Probabilidade)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A LGN fraca diz que, para qualquer ε {'>'} 0, a probabilidade de |X̄ₙ - μ| {'>'} ε tende a zero 
              quando n → ∞. Ou seja, a média amostral se aproxima do valor esperado em probabilidade — 
              fica cada vez mais improvável que esteja longe do valor verdadeiro.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Lei Forte (Convergência Quase Certa)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A LGN forte vai além: diz que X̄ₙ converge para μ com probabilidade 1. Isso significa que 
              a média amostral quase certamente se estabiliza no valor esperado. A LGN forte implica a fraca, 
              mas não o contrário.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">🚀 Aplicações Práticas</h2>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Seguros:</strong> Com muitos segurados, o custo médio por apólice converge para o previsto</li>
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Qualidade:</strong> Amostras grandes representam melhor a população</li>
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Pesquisas:</strong> Mais entrevistados = resultados mais precisos</li>
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Casinos:</strong> A &quot;vantagem da casa&quot; se manifesta no longo prazo</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">⚠️ Interpretação Equivocada Comum</h2>
        <p className="text-base leading-relaxed">
          A LGN NÃO diz que desvios serão &quot;compensados&quot;. Se uma moeda cair 10 vezes em cara, a LGN não 
          garante que as próximas 10 serão coroa. A convergência ocorre pela diluição: as 10 caras extras 
          se tornam insignificantes quando divididas por milhares de lançamentos. A moeda não tem memória — 
          cada lançamento é independente.
        </p>

        <div className="flex gap-3 p-4 rounded-lg bg-neon/5 border border-neon/20 my-4">
          <span className="text-lg">💡</span>
          <div className="text-sm text-muted-foreground">A LGN é a base matemática que explica por que casinos sempre lucram a longo prazo. A &quot;vantagem da casa&quot; em cada aposta é pequena, mas com milhões de apostas, o resultado converge para o valor esperado — garantindo lucro para o casino.</div>
        </div>

        <div className="mt-8 p-4 rounded-lg border border-amber-500/30 bg-amber-500/5">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h3 className="font-bold text-amber-500">Atenção</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Confundir a LGN com a &quot;falácia do apostador&quot; é um erro grave. A LGN descreve convergência 
            estatística no longo prazo, não compensação de desvios no curto prazo. Resultados passados 
            de eventos independentes não influenciam resultados futuros.
          </p>
        </div>
      </div>
    ),
  },
  'distribuicao-normal-gaussiana': {
    title: 'A Distribuição Normal (Gaussiana)',
    category: 'Estatística',
    readTime: '9 min',
    icon: BarChart3,
    content: (
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <p className="text-base leading-relaxed">
          A distribuição normal, também chamada de distribuição gaussiana, é a mais importante da estatística. 
          Sua forma de &quot;sino&quot; simétrico aparece naturalmente em inúmeros fenômenos: alturas de pessoas, 
          erros de medição, notas de provas, pressão arterial e muito mais. Entendê-la é essencial para 
          qualquer análise estatística.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">📐 Características da Distribuição Normal</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Simetria</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A distribuição normal é perfeitamente simétrica em torno da média. A metade esquerda é espelho 
              da metade direita. A média, mediana e moda são iguais e estão no centro da distribuição.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Parâmetros: μ e σ</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A distribuição normal é completamente definida por dois parâmetros: a média (μ), que define 
              o centro, e o desvio padrão (σ), que define a dispersão. A notação é N(μ, σ²). 
              A distribuição padrão é N(0, 1), com média zero e desvio padrão 1.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">📊 A Regra 68-95-99,7</h2>
        <p className="text-base leading-relaxed">
          Esta é a propriedade mais útil da distribuição normal:
        </p>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono">
            68,27% dos dados estão entre μ-1σ e μ+1σ<br/>
            95,45% dos dados estão entre μ-2σ e μ+2σ<br/>
            99,73% dos dados estão entre μ-3σ e μ+3σ
          </p>
        </div>
        <p className="text-base leading-relaxed mt-4">
          Por exemplo, se a altura média de adultos é 170cm com desvio padrão de 10cm, então 68% das pessoas 
          têm entre 160cm e 180cm, 95% entre 150cm e 190cm, e 99,7% entre 140cm e 200cm.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">🌟 Teorema Central do Limite</h2>
        <p className="text-base leading-relaxed">
          O Teorema Central do Limite (TCL) explica por que a distribuição normal aparece em tantos lugares. 
          Ele afirma que a média de um grande número de variáveis aleatórias independentes, independentemente 
          de suas distribuições individuais, converge para uma distribuição normal. É por isso que a 
          distribuição normal é tão ubíqua — ela emerge naturalmente quando muitos fatores independentes 
          se combinam.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">📐 Pontuação Z (Z-Score)</h2>
        <p className="text-base leading-relaxed">
          A pontuação Z mede quantos desvios padrão um valor está acima ou abaixo da média. A fórmula é:
        </p>
        <Card className="bg-neon/5 border-neon/20 p-4 my-4">
          <CardContent className="p-0">
            <p className="text-center font-mono text-lg">Z = (X - μ) / σ</p>
            <p className="text-center text-sm text-muted-foreground mt-2">Onde X é o valor, μ é a média e σ é o desvio padrão</p>
          </CardContent>
        </Card>

        <p className="text-base leading-relaxed mt-4">
          Um Z-score de 2 significa que o valor está 2 desvios padrão acima da média. Isso permite comparar 
          valores de distribuições diferentes e calcular probabilidades usando a tabela Z padrão.
        </p>

        <div className="mt-8 p-4 rounded-lg border border-neon-blue/30 bg-neon-blue/5">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-5 w-5 text-neon-blue" />
            <h3 className="font-bold text-neon-blue">Aplicação Prática</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A distribuição normal é a base de testes de hipóteses, intervalos de confiança, controle 
            estatístico de qualidade e análise de risco. Compreender seus princípios permite interpretar 
            dados e tomar decisões baseadas em evidência estatística.
          </p>
        </div>
      </div>
    ),
  },
  'introducao-teoria-jogos': {
    title: 'Introdução à Teoria dos Jogos',
    category: 'Matemática',
    readTime: '10 min',
    icon: Calculator,
    content: (
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <p className="text-base leading-relaxed">
          A teoria dos jogos é o estudo matemático de situações estratégicas, onde o resultado para cada 
          participante depende das ações de todos os outros. Desenvolvida por John von Neumann e Oskar 
          Morgenstern na década de 1940, a teoria dos jogos revolucionou a economia, a ciência política, 
          a biologia evolutiva e muitas outras áreas.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">🔒 O Dilema do Prisioneiro</h2>
        <p className="text-base leading-relaxed">
          O dilema do prisioneiro é o exemplo mais famoso da teoria dos jogos. Dois suspeitos são presos 
          e interrogados separadamente. Cada um pode cooperar (ficar em silêncio) ou trair (confessar). 
          Se ambos cooperarem, cada um pega 1 ano. Se ambos traírem, cada um pega 5 anos. Se um trair e 
          o outro cooperar, o traidor sai livre e o cooperador pega 10 anos.
        </p>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <table className="w-full text-sm text-center">
            <thead>
              <tr className="border-b border-border/50">
                <th className="p-2"></th>
                <th className="p-2">B Cooperar</th>
                <th className="p-2">B Trair</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/30">
                <td className="p-2 font-semibold">A Cooperar</td>
                <td className="p-2">A: 1 ano, B: 1 ano</td>
                <td className="p-2">A: 10 anos, B: livre</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">A Trair</td>
                <td className="p-2">A: livre, B: 10 anos</td>
                <td className="p-2">A: 5 anos, B: 5 anos</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-relaxed mt-4">
          O resultado racional individual (ambos traem) é pior para ambos do que se cooperassem. 
          Esse paradoxo está no coração de muitos problemas do mundo real, da política ambiental 
          às corridas armamentistas.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">🧠 Conceitos Fundamentais</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Equilíbrio de Nash</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Um equilíbrio de Nash ocorre quando nenhum jogador pode melhorar seu resultado mudando 
              sua estratégia unilateralmente. No dilema do prisioneiro, ambos traírem é o equilíbrio 
              de Nash — mesmo sendo subótimo. John Nash recebeu o Nobel de Economia por esta contribuição.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Jogos de Soma Zero</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Em um jogo de soma zero, o ganho de um jogador é exatamente a perda do outro. Xadrez, 
              por exemplo, é um jogo de soma zero. Já negociações comerciais geralmente não são — ambos 
              podem se beneficiar (soma positiva). Identificar o tipo de jogo é crucial para escolher 
              a estratégia adequada.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Estratégia Dominante</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Uma estratégia dominante é aquela que produz o melhor resultado independente do que o 
              outro jogador fizer. No dilema do prisioneiro, trair é a estratégia dominante — sempre 
              produz resultado igual ou melhor que cooperar, não importa o que o outro faça.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">🌍 Aplicações no Mundo Real</h2>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Economia:</strong> Leilões, negociação, oligopólios, regulação</li>
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Biologia:</strong> Evolução, seleção natural, comportamento animal</li>
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Ciência Política:</strong> Votação, negociações internacionais, dissuasão</li>
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Tecnologia:</strong> Design de mecanismos, sistemas de reputação, blockchain</li>
        </ul>

        <div className="flex gap-3 p-4 rounded-lg bg-neon/5 border border-neon/20 my-4">
          <span className="text-lg">💡</span>
          <div className="text-sm text-muted-foreground">A teoria dos jogos se aplica diretamente à gestão de risco: ao decidir quanto apostar, você está jogando um jogo contra a variância. Estratégias de cobertura (hedging) são uma forma de mudar as regras do jogo a seu favor.</div>
        </div>

        <div className="mt-8 p-4 rounded-lg border border-neon-blue/30 bg-neon-blue/5">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-5 w-5 text-neon-blue" />
            <h3 className="font-bold text-neon-blue">Conexão com Probabilidade</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A teoria dos jogos se conecta profundamente com probabilidade quando os jogadores usam 
            estratégias mistas (escolhendo ações com certas probabilidades). O Minimax de von Neumann 
            garante que todo jogo de soma zero com dois jogadores tem um equilíbrio em estratégias mistas.
          </p>
        </div>
      </div>
    ),
  },

    'como-calcular-probabilidades-odds': {
    title: 'Como Calcular Probabilidades a Partir de Odds',
    category: 'Fundamentos',
    readTime: '10 min',
    icon: Calculator,
    content: (
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <p className="text-base leading-relaxed">
          Converter odds em probabilidades é uma das habilidades mais essenciais para qualquer apostador que deseja tomar decisões
          informadas. As odds oferecidas pelas casas de apostas não são apenas números — elas representam a estimativa
          de probabilidade de um evento, ajustada pela margem de lucro da casa. Entender essa conversão permite que você identifique
          quando uma odd está sobrevalorizada ou subvalorizada, abrindo espaço para encontrar value bets e melhorar seus resultados a longo prazo.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Odds Decimais para Probabilidade</h2>
        <p className="text-base leading-relaxed">
          As odds decimais (formato mais comum no Brasil) são as mais fáceis de converter. A fórmula é direta: basta dividir 1 pelo
          valor da odd decimal. O resultado será a probabilidade implícita, ou seja, o que a casa de apostas estima como chance do evento ocorrer.
          Por exemplo, uma odd de 2.50 implica uma probabilidade de 1/2.50 = 0.40, ou seja, 40% de chance.
        </p>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono text-lg">
            Probabilidade (%) = (1 / Odd Decimal) x 100
          </p>
        </div>
        <p className="text-base leading-relaxed">
          Veja um exemplo prático com um jogo de futebol. Se Flamengo tem odd de 1.80 para vencer, a probabilidade implícita é 1/1.80 = 55,6%.
          Se o empate está em 3.50, a probabilidade implícita é 28,6%. E se o Grêmio está em 4.50, a probabilidade implícita é 22,2%.
          Some essas três probabilidades: 55,6 + 28,6 + 22,2 = 106,4%. Esse valor acima de 100% é a margem de lucro da casa de apostas,
          também conhecida como overround ou vig. No Brasil, essa margem costuma ficar entre 5% e 12%, dependendo da casa e do mercado.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Odds Fracionárias (Britânicas)</h2>
        <p className="text-base leading-relaxed">
          As odds fracionárias são populares no Reino Unido e em sites internacionais. Elas são expressas como uma fração (por exemplo, 5/2,
          que se lê "cinco para dois"). Para converter para probabilidade, use a fórmula: o denominador dividido pela soma do numerador com o denominador.
          No exemplo 5/2: 2 / (5 + 2) = 2/7 = 28,6%. Para converter para odd decimal, basta somar 1 ao resultado da fração: 5/2 + 1 = 3.50.
        </p>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono text-lg">
            Prob. (%) = denominador / (numerador + denominador) x 100<br />
            Odd Decimal = (numerador / denominador) + 1
          </p>
        </div>
        <p className="text-base leading-relaxed">
          Tabela de conversão rápida: 1/1 (Evens) = 2.00 decimal = 50%; 2/1 = 3.00 = 33,3%; 5/2 = 3.50 = 28,6%;
          10/1 = 11.00 = 9,1%; 1/2 = 1.50 = 66,7%; 4/6 = 1.67 = 60%. Quanto menor a fração, maior a probabilidade implícita.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Odds Americanas (+/-)</h2>
        <p className="text-base leading-relaxed">
          As odds americanas usam sinais positivos e negativos. Odds positivas (como +200) indicam quanto você lucra em uma aposta de 100 unidades.
          Odds negativas (como -150) indicam quanto precisa apostar para lucrar 100 unidades. Para odds positivas:
          probabilidade = 100 / (odd + 100). Para odds negativas: probabilidade = |odd| / (|odd| + 100).
        </p>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono text-lg">
            Odd +: Prob. (%) = 100 / (odd + 100) x 100<br />
            Odd -: Prob. (%) = |odd| / (|odd| + 100) x 100
          </p>
        </div>
        <p className="text-base leading-relaxed">
          Exemplos: +200 = 33,3%; -150 = 60%; +500 = 16,7%; -400 = 80%.
          Odds acima de +300 representam eventos improváveis, odds abaixo de -200 indicam fortes favoritos.
          Plataformas como DraftKings e BetMGM usam esse formato — saber converter é fundamental.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Removendo a Margem da Casa (Overround)</h2>
        <p className="text-base leading-relaxed">
          A soma das probabilidades implícitas sempre ultrapassa 100% por causa da margem da casa.
          Para obter as probabilidades reais, divida cada probabilidade individual pela soma total.
        </p>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono text-lg">
            Prob. real (%) = (Prob. implícita / Soma total) x 100
          </p>
        </div>
        <p className="text-base leading-relaxed">
          No exemplo do Flamengo vs Grêmio (soma 106,4%): probabilidade real do Flamengo = 55,6/106,4 = 52,3%;
          empate = 28,6/106,4 = 26,9%; Grêmio = 22,2/106,4 = 20,9%. Se você estima que o Flamengo tem 60% de chance
          e a odd paga como se fossem 52,3%, você encontrou uma value bet.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Probabilidade Implícita vs Probabilidade Real</h2>
        <p className="text-base leading-relaxed">
          A probabilidade implícita é o que a casa de apostas "diz" sobre um evento. A probabilidade real é o que você estima.
          Se sua estimativa é maior que a implícita, a odd está subvalorizada — é uma oportunidade.
          Na prática, isso exige um modelo próprio — análise estatística, modelos de Poisson ou Elo ratings.
          Use nosso Simulador de Probabilidades para testar diferentes cenários.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Tabela de Conversão Rápida</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-2 font-bold">Decimal</th>
                <th className="text-left p-2 font-bold">Fracionária</th>
                <th className="text-left p-2 font-bold">Americana</th>
                <th className="text-left p-2 font-bold">Prob. Implícita</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/30"><td className="p-2">1.10</td><td className="p-2">1/10</td><td className="p-2">-1000</td><td className="p-2">90,9%</td></tr>
              <tr className="border-b border-border/30"><td className="p-2">1.50</td><td className="p-2">1/2</td><td className="p-2">-200</td><td className="p-2">66,7%</td></tr>
              <tr className="border-b border-border/30"><td className="p-2">2.00</td><td className="p-2">1/1 (Evens)</td><td className="p-2">+100</td><td className="p-2">50,0%</td></tr>
              <tr className="border-b border-border/30"><td className="p-2">2.50</td><td className="p-2">3/2</td><td className="p-2">+150</td><td className="p-2">40,0%</td></tr>
              <tr className="border-b border-border/30"><td className="p-2">3.00</td><td className="p-2">2/1</td><td className="p-2">+200</td><td className="p-2">33,3%</td></tr>
              <tr className="border-b border-border/30"><td className="p-2">5.00</td><td className="p-2">4/1</td><td className="p-2">+400</td><td className="p-2">20,0%</td></tr>
              <tr><td className="p-2">10.00</td><td className="p-2">9/1</td><td className="p-2">+900</td><td className="p-2">10,0%</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-relaxed">
          Guarde esta tabela como referência. Com o tempo, você desenvolve a intuição para converter mentalmente,
          mas nos primeiros meses é essencial ter essa referência. Quanto mais pratica a conversão, mais rápido
          identifica quando uma odd oferece valor real ou quando a margem absorve o lucro.
        </p>
      </div>
    ),
  },

  'o-que-e-drawdown': {
    title: 'O que é Drawdown e Como Proteger Seu Capital',
    category: 'Gestão',
    readTime: '9 min',
    icon: TrendingUp,
    content: (
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <p className="text-base leading-relaxed">
          Drawdown é um dos conceitos mais importantes na gestão de risco, e surpreendentemente um dos mais ignorados por apostadores
          iniciantes. Em termos simples, o drawdown representa a queda máxima do seu capital a partir do pico histórico. Se você começou
          com R$ 1.000, chegou a R$ 1.500 e caiu para R$ 1.100, seu drawdown foi de R$ 400 (de R$ 1.500 para R$ 1.100), o que representa
          26,7% do pico. Entender esse conceito é crucial porque os drawdowns são inevitáveis — toda estratégia, por melhor que seja,
          passará por períodos de perdas.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">O que Exatamente é Drawdown?</h2>
        <p className="text-base leading-relaxed">
          O drawdown mede a perda acumulada desde o ponto mais alto (peak) do seu capital até o ponto mais baixo subsequente (trough).
          Ele é diferente da perda simples porque é calculado a partir do máximo histórico, não do saldo inicial. Por exemplo, se você
          depositou R$ 1.000 e após vitórias subiu para R$ 2.000, mas então perdeu até R$ 1.400, seu drawdown
          é de R$ 600 (30% do pico de R$ 2.000), não de R$ 400 (perda em relação ao depósito inicial).
        </p>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono text-lg">
            Drawdown (%) = ((Peak - Trough) / Peak) x 100<br />
            Drawdown (R$) = Peak - Trough
          </p>
        </div>
        <p className="text-base leading-relaxed">
          Existem dois tipos: drawdown de capital (queda em valor do bankroll) e drawdown operacional (sequência máxima de derrotas).
          Uma sequência de 10 derrotas com apostas de 2% gera um drawdown de aproximadamente 18,3%, enquanto com 5%
          gera um drawdown devastador de 40,1%. A diferença é enorme e explica por que o tamanho da aposta é tão importante.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">A Matemática da Recuperação</h2>
        <p className="text-base leading-relaxed">
          Para entender a gravidade dos drawdowns, considere a matemática da recuperação. Se você sofre um drawdown de 10%, precisa de
          um ganho de 11,1% para voltar ao pico (não é 10%, pois a base agora é menor). Para 25%, precisa de 33,3%. Para 50%, precisa de 100%
          — precisa dobrar o capital restante. Para 75%, precisa de 300%. Essa assimetria mostra por que drawdowns grandes são destrutivos:
          a recuperação exponencial exigida torna cada vez mais difícil retornar ao nível anterior.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-2 font-bold">Drawdown</th>
                <th className="text-left p-2 font-bold">Ganho Necessário</th>
                <th className="text-left p-2 font-bold">Dificuldade</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/30"><td className="p-2">10%</td><td className="p-2">11,1%</td><td className="p-2">Fácil</td></tr>
              <tr className="border-b border-border/30"><td className="p-2">20%</td><td className="p-2">25,0%</td><td className="p-2">Moderada</td></tr>
              <tr className="border-b border-border/30"><td className="p-2">33%</td><td className="p-2">50,0%</td><td className="p-2">Difícil</td></tr>
              <tr className="border-b border-border/30"><td className="p-2">50%</td><td className="p-2">100,0%</td><td className="p-2">Muito Difícil</td></tr>
              <tr><td className="p-2">75%</td><td className="p-2">300,0%</td><td className="p-2">Quase Impossível</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">Como Limitar o Drawdown</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">1. Defina um Stop Loss de Bankroll</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Estabeleça um limite máximo de perda, como 20% ou 30% do bankroll. Quando atingir esse limite, pare completamente
              por um período determinado. Use a Calculadora de Gestão de Capital para simular diferentes cenários de stop loss.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">2. Reduza Apostas Durante Perdas</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Quando estiver em drawdown, reduza o tamanho de cada aposta. Se aposta 2% normalmente, reduza para 1%.
              Isso diminui a velocidade da queda e preserva capital para a recuperação. É contra-intuitivo, mas matematicamente correto.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">3. Diversifique Mercados e Estratégias</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Não concentre todo o risco em um único tipo de aposta. Combine mercados (over/under, handicaps, ambos marcam)
              e esportes para reduzir a correlação entre as apostas e suavizar a curva de capital.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">4. Monitore o Maximum Drawdown (MDD)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Registre todos os seus drawdowns. O MDD histórico é essencial para calibrar sua estratégia.
              Se seu MDD é de 25%, planeje assumindo que drawdowns desse tamanho vão ocorrer novamente.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">A Psicologia do Drawdown</h2>
        <p className="text-base leading-relaxed">
          O aspecto psicológico é tão importante quanto o matemático. Durante um drawdown, o apostador enfrenta o medo
          de perder tudo, a frustração de ver o trabalho desaparecer e a tentação de "recuperar tudo de uma vez" aumentando as apostas
          — o que geralmente leva a drawdowns ainda maiores. Uma técnica eficaz é ter um "plano de drawdown" pré-definido:
          quando perder 15%, reduzir apostas pela metade por 2 semanas; ao perder 25%, parar por 1 mês; ao perder 40%,
          reavaliar toda a estratégia. Ter esse plano escrito remove a decisão emocional do momento crítico.
        </p>
      </div>
    ),
  },

  'guia-gestao-bankroll-apostas': {
    title: 'Guia Completo de Gestão de Bankroll',
    category: 'Gestão',
    readTime: '12 min',
    icon: TrendingUp,
    content: (
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <p className="text-base leading-relaxed">
          Gestão de bankroll é, sem exagero, a habilidade mais importante que um apostador pode desenvolver. Não importa quão bom
          você seja em identificar resultados — sem gestão de capital adequada, uma sequência de perdas inevitável vai destruir
          seu bankroll. Pesquisas com apostadores profissionais mostram que a gestão de capital responde por até 60% do sucesso
          a longo prazo, superando até a qualidade da análise esportiva. Este guia cobre os princípios, fórmulas e estratégias
          que profissionais usam para gerir seu capital de forma sustentável.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">O que é Bankroll?</h2>
        <p className="text-base leading-relaxed">
          Bankroll é o montante total de dinheiro que você separou exclusivamente para apostas. Não é seu saldo bancário, não é
          seu salário — é um fundo dedicado que, se perdido inteiramente, não afetaria sua vida financeira. Se você tem R$ 5.000
          e decide que R$ 1.000 é seu bankroll, os R$ 4.000 restantes são intocáveis. Essa separação mental e financeira é fundamental
          para evitar decisões desesperadas.
        </p>
        <p className="text-base leading-relaxed">
          Regra prática: seu bankroll deve ser dinheiro que pode perder sem alterar seu padrão de vida.
          Se perder vai causar estresse, é grande demais. Se for tão pequeno que uma aposta mínima já compromete
          uma porção significativa, é pequeno demais.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">As 5 Regras de Ouro</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Regra 1: Aposte entre 1% e 3% do bankroll por aposta</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A regra mais citada por profissionais. Com 2% por aposta, 10 derrotas consecutivas reduzem o bankroll em 18,3%.
              Com 5%, a redução seria de 40,1% — praticamente impossível de recuperar. Use a Calculadora de Gestão de Capital
              para encontrar o percentual ideal baseado em seu perfil de risco.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Regra 2: Nunca aumente apostas para "recuperar" perdas</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A tentação de dobrar após uma perda é o erro número 1. Isso transforma uma sequência normal em catástrofe.
              A recuperação vem pelo volume de apostas com valor positivo, não pelo aumento do risco unitário.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Regra 3: Ajuste apostas conforme o bankroll muda</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Se o bankroll cresce de R$ 1.000 para R$ 1.500, suas apostas de 2% passam de R$ 20 para R$ 30.
              Se cai para R$ 800, reduzem para R$ 16. Esse "apostamento proporcional" permite crescimento exponencial
              quando há vantagem, limitando perdas quando a sorte vira.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Regra 4: Pense em unidades, não em reais</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Divida o bankroll em unidades. R$ 1.000 com 2% por aposta = 50 unidades.
              "Perdi 3 unidades" soa menos ameaçador do que "perdi R$ 60" — mesmo sendo a mesma coisa.
              Essa abstração emocional é crucial para a disciplina.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Regra 5: Registre todas as apostas</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Um bankroll não gerenciado com dados é cego. Registre data, evento, odd, valor, resultado e lucro/prejuízo.
              Esses dados permitem calcular ROI real, identificar pontos fortes e fracos, e ajustar com base em evidências.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">Critério de Kelly: O Cálculo Científico</h2>
        <p className="text-base leading-relaxed">
          O Critério de Kelly (1956, Bell Labs) calcula o tamanho ótimo de uma aposta para maximizar o crescimento do bankroll.
          A fórmula: f* = (bp - q) / b, onde f* é a fração do bankroll, b é a odd decimal menos 1,
          p é sua probabilidade de vitória e q = 1 - p.
        </p>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono text-lg">
            f* = (b x p - q) / b<br />
            Onde: b = odd - 1, p = prob. vitória, q = 1 - p
          </p>
        </div>
        <p className="text-base leading-relaxed">
          Exemplo: você estima 55% de chance e a odd é 2.10. Então b = 1.10, p = 0.55, q = 0.45.
          f* = (1.10 x 0.55 - 0.45) / 1.10 = 14,1%. Kelly sugere 14,1% — agressivo demais para a maioria.
          Profissionais usam "meio-Kelly" (7%) ou "um quarto de Kelly" (3,5%) para reduzir volatilidade.
          O Critério é poderoso, mas sensível a erros na estimativa de probabilidade.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Simulação: 1% vs 3% vs 5%</h2>
        <p className="text-base leading-relaxed">
          Considere 1.000 apostas, taxa de acerto 54%, odd média 1.90. Com 1%: bankroll final esperado ~280% do inicial,
          drawdown máximo raramente acima de 15%. Com 3%: ~520%, drawdown 35-40%. Com 5%: até 900% em cenários favoráveis,
          mas drawdown acima de 60% com risco real de ruína. A lição: tamanhos maiores amplificam tanto ganhos quanto perdas,
          e o risco de ruína cresce de forma não-linear. Use a Calculadora de Gestão de Capital para simular.
        </p>
      </div>
    ),
  },

  'sistema-masaniello-pratica': {
    title: 'Como Funciona o Sistema Masaniello na Prática',
    category: 'Análise',
    readTime: '11 min',
    icon: BarChart3,
    content: (
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <p className="text-base leading-relaxed">
          O sistema Masaniello é um método de gestão de bankroll desenvolvido na Itália que se tornou popular entre apostadores
          europeus e brasileiros. Diferente da Martingale (que dobra após perda) ou da Fibonacci (sequência matemática),
          o Masaniello define uma meta de lucro total para um ciclo de apostas e calcula o valor de cada aposta
          com base no que resta para atingir essa meta. É mais sofisticado porque leva em conta tanto o objetivo de lucro
          quanto o número total de apostas planejadas, redistribuindo o risco ao longo do ciclo.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Como Funciona o Masaniello</h2>
        <p className="text-base leading-relaxed">
          O sistema parte de três parâmetros: o bankroll disponível, o percentual de lucro alvo (ex: 20%)
          e o número total de apostas no ciclo (ex: 10). A partir desses valores,
          calcula quanto apostar em cada jogada usando binômio de Newton e probabilidade condicional.
          Se está ganhando, as apostas podem diminuir; se está perdendo, podem aumentar para tentar atingir a meta.
        </p>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono text-lg">
            Parâmetros: Bankroll + % alvo + Nº de apostas<br />
            Cada aposta = f(resultados anteriores, lucro restante, apostas restantes)
          </p>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">Exemplo Prático Passo a Passo</h2>
        <p className="text-base leading-relaxed">
          Simulemos um ciclo com: bankroll R$ 1.000, meta 25% (R$ 250), 8 apostas com odd média 2.00.
          A primeira aposta pode ser de R$ 100. Se ganha (recebe R$ 200), bankroll sobe para R$ 1.100.
          Agora precisa de R$ 150 em 7 apostas — o sistema recalcula e pode sugerir aposta menor.
        </p>
        <p className="text-base leading-relaxed">
          Se perder as primeiras 3, o bankroll cai. Agora precisa de todo o lucro alvo em menos apostas
          — o sistema aumenta o tamanho das seguintes. É aqui que reside o risco: após sequências de perdas,
          as apostas necessárias podem ficar muito grandes em relação ao bankroll restante.
          A escolha da meta e do número de apostas é crucial.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Vantagens e Desvantagens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
            <h3 className="font-bold text-base mb-2 text-green-500">Vantagens</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Meta de lucro clara e definida antes de começar</li>
              <li>Adapta o tamanho das apostas dinamicamente</li>
              <li>Se atingir a meta antes, o ciclo encerra com lucro</li>
              <li>Menos agressivo que Martingale na maioria dos cenários</li>
              <li>Permite planejar ciclos de forma estruturada</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
            <h3 className="font-bold text-base mb-2 text-red-500">Desvantagens</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Após perdas, as apostas podem crescer muito</li>
              <li>Presume odd média constante (na prática variam)</li>
              <li>Não garante lucro — depende da taxa de acerto</li>
              <li>Mais complexo de implementar manualmente</li>
              <li>Pode dar falsa sensação de segurança</li>
            </ul>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">Como Escolher os Parâmetros Ideais</h2>
        <p className="text-base leading-relaxed">
          Meta baixa (10-15%) com muitas apostas (12-15) resulta em apostas pequenas e estáveis.
          Meta alta (30-50%) com poucas apostas (5-7) gera apostas maiores e voláteis.
          O sweet spot para a maioria é 15-25% com 8-12 apostas. O Masaniello funciona melhor com odds
          entre 1.80 e 2.50, onde a probabilidade implícita está entre 40% e 55%. Use a Calculadora Masaniello
          para testar combinações antes de começar um ciclo real.
        </p>
      </div>
    ),
  },

  'hedging-apostas-guia-completo': {
    title: 'Hedging em Apostas: Guia Completo',
    category: 'Gestão',
    readTime: '10 min',
    icon: TrendingUp,
    content: (
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <p className="text-base leading-relaxed">
          Hedging, ou aposta de cobertura, consiste em fazer uma aposta oposta à original para garantir
          lucro ou minimizar perdas, independentemente do resultado final. É uma das ferramentas mais poderosas
          na gestão de risco de apostadores experientes, mas também uma das mais mal compreendidas.
          Muitos fazem hedging sem calcular os valores corretos, transformando uma boa estratégia em operação
          com valor esperado negativo.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">O que é Hedging?</h2>
        <p className="text-base leading-relaxed">
          O exemplo mais clássico é em apostas de longo prazo (futures). Imagine que apostou R$ 100 na vitória
          do Palmeiras no Brasileirão a odd de 8.00 antes do campeonato. Após 20 rodadas, o Palmeiras é líder.
          A odd caiu para 1.50, e a do segundo colocado (Flamengo) está em 4.00.
        </p>
        <p className="text-base leading-relaxed">
          Agora você pode fazer hedging apostando R$ 200 no Flamengo a 4.00. Se o Palmeiras ganha:
          lucro de R$ 800 - R$ 200 - R$ 100 = R$ 500. Se o Flamengo ganha:
          lucro de R$ 800 - R$ 200 - R$ 100 = R$ 500. Lucro garantido de R$ 500 independente do resultado.
          O lucro garantido é menor que o potencial original (R$ 700), mas elimina o risco completamente.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">A Matemática do Hedging</h2>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono text-lg">
            H = (A x O1) / O2<br />
            Lucro garantido = (A x O1) - A - H
          </p>
        </div>
        <p className="text-base leading-relaxed">
          Onde A = valor apostado originalmente, O1 = odd original, O2 = odd da aposta de cobertura, H = valor da cobertura.
          No exemplo: H = (100 x 8.00) / 4.00 = R$ 200. Lucro = 800 - 100 - 200 = R$ 500 em ambos os cenários.
        </p>
        <p className="text-base leading-relaxed">
          Na prática, as odds disponíveis nem sempre permitem lucro igual em ambos os lados. Muitas vezes,
          o melhor é garantir lucro menor em um cenário e pequeno prejuízo no outro — o que ainda pode valer a pena.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Quando Fazer Hedging</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">1. Futures com Valor Alto</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Quando sua aposta de longo prazo está prestes a vencer e o ganho é significativo.
              Garantir parte desse lucro é quase sempre boa ideia, especialmente se representa
              porção substancial do bankroll.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">2. Cash Out é Pior que Hedging Manual</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              O botão "Cash Out" das casas tem comissão de 5-15%. Calcular o hedging manualmente
              em outra casa frequentemente resulta em valor melhor. Sempre compare antes de aceitar o Cash Out.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">3. Para Limitar Perdas</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hedging também minimiza perdas. Se sua aposta original vai perder, uma cobertura pode reduzir
              a perda total de R$ 100 para R$ 30. Útil em acumuladores, onde uma perda elimina o bilhete.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">Erros Comuns no Hedging</h2>
        <p className="text-base leading-relaxed">
          O erro mais frequente é fazer hedging sem calcular — apostar um valor "de olho". Isso quase
          sempre resulta em valor esperado negativo, pois a margem da casa é aplicada duas vezes.
          Outro erro é fazer hedging demais: toda vez que faz, aceita retorno menor por segurança.
          Se fizer em toda aposta, garantirá perdas a longo prazo. O hedging deve ser seletivo e calculado.
          Use a Calculadora de Hedging para automatizar esses cálculos instantaneamente.
        </p>
      </div>
    ),
  },

  'fibonacci-vs-martingale': {
    title: 'Fibonacci vs Martingale: Comparativo Completo',
    category: 'Análise',
    readTime: '13 min',
    icon: BarChart3,
    content: (
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <p className="text-base leading-relaxed">
          Fibonacci e Martingale são as duas progressões de apostas mais conhecidas. Ambas prometem
          recuperar perdas aumentando o tamanho das apostas após derrotas, mas funcionam de formas
          fundamentalmente diferentes. Este comparativo ajuda a entender os prós, contras e quando cada
          um é mais adequado — e por que nenhum é a "bala de prata" que muitos buscam.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Como Funciona Cada Sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Martingale</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Aposta 1 unidade. Cada perda, dobra. Cada vitória, volta a 1.<br /><br />
              Sequência: 1, 2, 4, 8, 16, 32, 64, 128, 256, 512...<br /><br />
              Uma única vitória recupera todas as perdas + 1 unidade de lucro.
              É o sistema mais agressivo.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Fibonacci</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Segue a sequência de Fibonacci. Cada perda, avança uma posição.
              Cada vitória, volta duas posições.<br /><br />
              Sequência: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55...<br /><br />
              Crescimento mais suave, mas recuperação mais lenta.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">Comparativo Numérico</h2>
        <p className="text-base leading-relaxed">
          Tabela com unidade base de R$ 10. A diferença cresce dramaticamente após 6-7 perdas.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-2 font-bold">Perdas</th>
                <th className="text-left p-2 font-bold">Martingale</th>
                <th className="text-left p-2 font-bold">Fibonacci</th>
                <th className="text-left p-2 font-bold">Diferença</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/30"><td className="p-2">1</td><td className="p-2">R$ 20</td><td className="p-2">R$ 10</td><td className="p-2">2,0x</td></tr>
              <tr className="border-b border-border/30"><td className="p-2">2</td><td className="p-2">R$ 40</td><td className="p-2">R$ 20</td><td className="p-2">2,0x</td></tr>
              <tr className="border-b border-border/30"><td className="p-2">3</td><td className="p-2">R$ 80</td><td className="p-2">R$ 30</td><td className="p-2">2,7x</td></tr>
              <tr className="border-b border-border/30"><td className="p-2">4</td><td className="p-2">R$ 160</td><td className="p-2">R$ 50</td><td className="p-2">3,2x</td></tr>
              <tr className="border-b border-border/30"><td className="p-2">5</td><td className="p-2">R$ 320</td><td className="p-2">R$ 80</td><td className="p-2">4,0x</td></tr>
              <tr className="border-b border-border/30"><td className="p-2">6</td><td className="p-2">R$ 640</td><td className="p-2">R$ 130</td><td className="p-2">4,9x</td></tr>
              <tr className="border-b border-border/30"><td className="p-2">7</td><td className="p-2">R$ 1.280</td><td className="p-2">R$ 210</td><td className="p-2">6,1x</td></tr>
              <tr><td className="p-2">8</td><td className="p-2">R$ 2.560</td><td className="p-2">R$ 340</td><td className="p-2">7,5x</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-relaxed">
          Após 8 perdas, Martingale exige R$ 2.560 (256x a unidade inicial!), Fibonacci pede R$ 340 (34x).
          Total investido: R$ 5.110 vs R$ 870. A diferença é colossal.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">O Problema Comum: Ruína Certeira</h2>
        <p className="text-base leading-relaxed">
          Ambos sofrem do mesmo problema: a premissa de que "eventualmente você ganha" não garante capital suficiente.
          Com odds de 2.00, a probabilidade de 8 perdas seguidas é 0,39% — mas em 1.000 apostas, há 98% de chance de ocorrer.
          Com odds de 1.80, a probabilidade sobe para 1,7% — em 500 apostas, 57% de chance.
        </p>
        <p className="text-base leading-relaxed">
          A Fibonacci é menos vulnerável (crescimento mais lento), mas recupera mais devagar.
          A Martingale recupera tudo com uma vitória; a Fibonacci precisa de múltiplas vitórias.
          Em fase ruim, a Fibonacci fica presa no meio da sequência por muitas apostas.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Veredito: Quando Usar Cada Um</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Use Martingale se:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Tem bankroll grande e limite de apostas alto</li>
              <li>Aposta em odds baixas (1.30-1.60) com alta taxa de acerto</li>
              <li>Quer recuperação rápida e entende o risco de ruína</li>
              <li>Usa com stop loss rigoroso (máximo 5-6 derrotas)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Use Fibonacci se:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Prefere crescimento mais controlado</li>
              <li>Bankroll moderado (não suporta dobradas consecutivas)</li>
              <li>Aposta em odds médias (1.80-2.50)</li>
              <li>Quer mais "fôlego" antes de atingir limites de tabela</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">Use nenhum dos dois se:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Quer apostar de forma profissional a longo prazo</li>
              <li>Seu objetivo é lucro consistente, não recuperação de perdas</li>
              <li>Prefere apostamento fixo (flat) baseado em porcentagem do bankroll</li>
            </ul>
          </div>
        </div>
        <p className="text-base leading-relaxed">
          Na prática, profissionais raramente usam qualquer progressão de recuperação.
          O apostamento fixo (1-3% do bankroll por aposta) é o padrão da indústria.
          Use nossas calculadoras Martingale e Fibonacci para simular ambos e ver com seus próprios números.
        </p>
      </div>
    ),
  },

  'como-identificar-value-bets': {
    title: 'Como Identificar Value Bets: Guia Prático',
    category: 'Análise',
    readTime: '11 min',
    icon: Lightbulb,
    content: (
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <p className="text-base leading-relaxed">
          Value bet é o conceito mais importante para quem quer lucrar consistentemente com apostas.
          Em termos simples, uma value bet ocorre quando a probabilidade real de um evento é maior do que
          a probabilidade implícita nas odds oferecidas pela casa de apostas. Se você identifica essas
          oportunidades sistematicamente e aposta nelas ao longo do tempo, o lucro matemático é inevitável.
          O problema é que identificá-las requer disciplina, modelo analítico e muita paciência.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">O que é Value Bet?</h2>
        <p className="text-base leading-relaxed">
          Imagine que uma casa oferece odd de 2.20 para a vitória do Corinthians. A probabilidade implícita é 1/2.20 = 45,5%.
          Após remover a margem da casa (digamos 8%), a probabilidade real da odd é 42,1%. Se sua análise indica
          que o Corinthians tem 50% de chance de ganhar, você encontrou uma value bet: 50% &gt; 42,1%.
        </p>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono text-lg">
            Value = (Sua prob. x Odd) - 1<br />
            Se Value &gt; 0, existe valor na aposta
          </p>
        </div>
        <p className="text-base leading-relaxed">
          No exemplo: (0.50 x 2.20) - 1 = 1.10 - 1 = 0.10 (ou 10% de valor).
          Isso significa que para cada R$ 100 apostados em value bets desse tamanho, o lucro esperado é R$ 10 a longo prazo.
          Parece pouco, mas acumulado em centenas de apostas, é o que separa apostadores lucrativos dos perdedores.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Como Calcular Valor Esperado (EV)</h2>
        <p className="text-base leading-relaxed">
          O Valor Esperado (Expected Value) é a métrica fundamental. A fórmula:
          EV = (Probabilidade de ganho x Lucro potencial) - (Probabilidade de perda x Valor apostado).
        </p>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono text-lg">
            EV = (p x (odd - 1) x A) - ((1 - p) x A)<br />
            Onde: p = sua prob. estimada, odd, A = valor apostado
          </p>
        </div>
        <p className="text-base leading-relaxed">
          Exemplo: você estima 50% para Corinthians (odd 2.20), aposta R$ 100.
          EV = (0.50 x 1.20 x 100) - (0.50 x 100) = R$ 60 - R$ 50 = +R$ 10.
          EV positivo indica value. EV negativo indica que a aposta é prejudicial a longo prazo.
          O segredo é acumular muitos EVs positivos — a variância de curto prazo é inevitável,
          mas a matemática favorece quem consistentemente aposta em EV positivo.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">5 Métodos para Encontrar Value Bets</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">1. Compare odds entre casas</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Diferentes casas oferecem odds diferentes para o mesmo evento. Se a maioria oferece 2.00
              e uma oferece 2.30, a última pode estar subvalorizando o resultado. Use comparadores de odds
              como primeiro filtro para encontrar discrepâncias.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">2. Modele suas próprias probabilidades</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use estatísticas (xG, forma recente, confrontos diretos) para estimar suas probabilidades.
              Um modelo simples de Poisson para gols ou um sistema de Elo ratings já são melhores
              do que seguir intuição. Compare suas estimativas com as odds do mercado.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">3. Acompanhe movimentos de odds</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Quando uma odd cai rapidamente sem motivo esportivo óbvio, pode indicar que dinheiro
              institucional está entrando. A odd original pode ter tido valor que está desaparecendo.
              Monitorar movimentos ajuda a identificar value antes que o mercado se ajuste.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">4. Foque em mercados menos eficientes</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Mercados de resultado final são muito eficientes. Mercados como escanteios, cartões
              ou ligas menores têm menos liquidez e mais ineficiências.
              É onde apostadores informados encontram value mais facilmente.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">5. Mantenha registros e calcule seu CLV</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Closing Line Value (CLV) mede se suas apostas batem consistentemente a odd de fechamento.
              Se suas odds médias são 2.10 e a odd de fechamento é 2.00, você tem CLV positivo —
              indicador forte de que está encontrando value real.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">Erros que Destroem Value</h2>
        <p className="text-base leading-relaxed">
          O maior erro é confundir "time que vai ganhar" com "value bet". Um favorito pode vencer frequentemente,
          mas se a odd é muito baixa, pode não ter valor. O segundo erro é não remover a margem da casa antes de comparar
          probabilidades. O terceiro é superestimar a qualidade da própria análise — lembre que as casas têm modelos
          sofisticados e equipes de traders. Use o Simulador de Probabilidades e o Gerador de Estratégias
          para testar suas estimativas antes de apostar dinheiro real.
        </p>
      </div>
    ),
  },

  'lucro-esperado-vs-retorno': {
    title: 'Lucro Esperado vs Retorno: Entenda a Diferença',
    category: 'Fundamentos',
    readTime: '9 min',
    icon: Lightbulb,
    content: (
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <p className="text-base leading-relaxed">
          "Ganhei R$ 500 esse mês" soa bem, mas sem contexto é inútil. Ganhou R$ 500 apostando R$ 1.000
          (50% de retorno) ou apostando R$ 50.000 (1% de retorno)? Entender as diferenças entre lucro esperado,
          ROI, yield e retorno é fundamental para avaliar se sua estratégia realmente funciona ou se foi sorte.
          Este artigo esclarece cada métrica e mostra qual usar em cada situação.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">As 4 Métricas Essenciais</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">1. Lucro/Prejuízo (L/P)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              O valor absoluto ganho ou perdido. Ganhou R$ 500 = L/P de +R$ 500. Simples, mas não considera
              quanto foi apostado. R$ 500 de lucro em R$ 1.000 apostado é excelente; em R$ 100.000 é ruim.
              Sozinho, o L/P não permite comparações nem avaliação de eficiência.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">2. ROI (Return on Investment)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ROI = (Lucro / Total Apostado) x 100. Se apostou R$ 10.000 e lucrou R$ 500, ROI = 5%.
              É a métrica mais usada porque é proporcional — permite comparação entre apostadores
              com bankrolls diferentes. Um ROI de 5% a longo prazo é excelente no mundo das apostas.
            </p>
            <div className="p-2 rounded bg-muted/30 mt-2">
              <p className="text-center font-mono text-sm">ROI = (Lucro Líquido / Total Apostado) x 100</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">3. Yield (Retorno por Aposta)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Yield = (Lucro / Soma das Stake Retornadas) x 100. O denominador inclui o valor apostado MAIS
              o lucro (ou seja, o retorno total). Se apostou R$ 10.000 e retornou R$ 10.500,
              Yield = 500/10.500 = 4,76%. É muito similar ao ROI mas com denominador ligeiramente maior,
              resultando em número um pouco menor. Usado mais na Europa.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <h3 className="font-bold text-base mb-2">4. Lucro Esperado (EV)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              EV = Soma de (Probabilidade x Retorno) para cada aposta. É uma métrica prospectiva —
              estima quanto você deve ganhar antes de os eventos acontecerem. Diferente do ROI e Yield,
              que são retrospectivos (medem o passado), o EV avalia a qualidade das decisões,
              não apenas os resultados. Um EV positivo consistente indica boa tomada de decisão,
              mesmo que o ROI de curto prazo seja negativo por variância.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">Qual Métrica Usar Quando?</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-2 font-bold">Situação</th>
                <th className="text-left p-2 font-bold">Métrica Ideal</th>
                <th className="text-left p-2 font-bold">Por quê</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/30"><td className="p-2">Avaliar eficiência geral</td><td className="p-2">ROI</td><td className="p-2">Proporcional, comparável</td></tr>
              <tr className="border-b border-border/30"><td className="p-2">Relatórios europeus</td><td className="p-2">Yield</td><td className="p-2">Padrão em sites europeus</td></tr>
              <tr className="border-b border-border/30"><td className="p-2">Decidir se deve apostar</td><td className="p-2">EV</td><td className="p-2">Prospectivo, avalia decisão</td></tr>
              <tr className="border-b border-border/30"><td className="p-2">Conversa com amigos</td><td className="p-2">L/P</td><td className="p-2">Fácil de entender</td></tr>
              <tr><td className="p-2">Gestão de bankroll</td><td className="p-2">ROI + EV</td><td className="p-2">Combina resultado e qualidade</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">O Perigo do Pequeno Número de Amostras</h2>
        <p className="text-base leading-relaxed">
          Um ROI de 15% em 50 apostas significa muito pouco — pode ser pura sorte. Um ROI de 3% em 2.000 apostas
          é estatisticamente significativo e indica edge real. Para ter confiança de 95% de que seu ROI reflete
          habilidade (não sorte), você precisa de centenas a milhares de apostas, dependendo do ROI observado
          e da odd média. Use o Analisador de Sequências para calcular a significância estatística dos seus resultados.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Lucro Esperado vs Realizado</h2>
        <p className="text-base leading-relaxed">
          A diferença entre EV e resultado real é a variância. Em 100 apostas com EV de +5%, seu resultado real
          pode variar de -20% a +30%. Em 1.000 apostas, a variação cai para -2% a +12%. Em 10.000, converge
          para perto dos 5%. Essa é a Lei dos Grandes Números em ação. Por isso, nunca julgue uma estratégia
          com menos de 500-1.000 apostas. A gestão de bankroll adequada (1-3% por aposta) garante que você
          sobreviva à variância negativa até que o EV se manifeste. Use a Gestão de Capital e o Analisador
          de Sequências para acompanhar essas métricas.
        </p>
      </div>
    ),
  },
}

export function ArticleContent({ slug }: { slug: string }) {
  const article = articles[slug]
  
  if (!article) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Artigo não encontrado</h1>
        <p className="text-muted-foreground mb-6">O artigo que você procura não existe.</p>
        <Link href="/artigos" className="text-neon hover:underline flex items-center justify-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar para artigos
        </Link>
      </div>
    )
  }

  const Icon = article.icon
  const ctaLinks = ctaLinksMap[slug] || []
  const articleUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link href="/artigos" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-neon transition-colors">
        <ArrowLeft className="h-4 w-4" /> Voltar para artigos
      </Link>

      {/* Article header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-neon/10 text-neon border-neon/20">
            {article.category}
          </Badge>
          <span className="text-xs text-muted-foreground">{article.readTime} de leitura</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-muted/30">
            <Icon className="h-6 w-6 text-neon" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">{article.title}</h1>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="text-xs text-muted-foreground">
            Atualizado em {new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <ShareButtons url={articleUrl} title={article.title} />
        </div>
      </div>

      {/* Separator */}
      <hr className="border-border/50" />

      {/* Article content */}
      {article.content}

      {/* Ad — Mid article */}
      <AdskeeperWidget widgetId="2056707" className="my-6" />

      {/* CTA — Experimente na Prática */}
      <ArticleCTA links={ctaLinks} />
    </div>
  )
}
