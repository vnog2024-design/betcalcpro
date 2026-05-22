'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, BookOpen, Calculator, TrendingUp, BarChart3, Lightbulb, AlertTriangle } from 'lucide-react'
import { AdInContent } from '@/components/shared/ad-banner'

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

        <h2 className="text-xl font-bold mt-8 mb-3">O que é Probabilidade?</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">Conceitos Fundamentais</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">Probabilidade Condicional</h2>
        <p className="text-base leading-relaxed">
          A probabilidade condicional P(A|B) é a probabilidade do evento A ocorrer, sabendo que o evento B já ocorreu. 
          A fórmula é: P(A|B) = P(A e B) / P(B). Este conceito é fundamental para o Teorema de Bayes, que permite 
          atualizar probabilidades com base em novas informações. O Teorema de Bayes tem aplicações em diagnóstico 
          médico, filtros de spam, inteligência artificial e muitas outras áreas.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Aplicações Práticas</h2>
        <p className="text-base leading-relaxed">
          A teoria das probabilidades tem inúmeras aplicações práticas no dia a dia: previsão do tempo (probabilidade 
          de chuva), análise de risco em seguros e finanças, controle de qualidade na indústria, algoritmos de 
          machine learning, criptografia, e muito mais. Compreender os fundamentos da probabilidade é essencial 
          para tomar decisões mais informadas em qualquer área que envolva incerteza.
        </p>

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

        <h2 className="text-xl font-bold mt-8 mb-3">Princípios Fundamentais</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">Calculando o Tamanho da Posição</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">Stop Loss e Take Profit</h2>
        <p className="text-base leading-relaxed">
          Stop loss é o nível de preço onde você automaticamente sai de uma operação para limitar perdas. 
          Take profit é o nível onde você garante o lucro. A relação entre o take profit e o stop loss 
          (chamada de relação risco-retorno) deve ser favorável — geralmente busca-se pelo menos 2:1, 
          ou seja, o ganho potencial deve ser pelo menos o dobro da perda potencial.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">O Drawdown Máximo</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">Propriedades Matemáticas</h2>
        <p className="text-base leading-relaxed">
          A sequência de Fibonacci possui propriedades matemáticas notáveis:
        </p>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li className="flex gap-2"><span className="text-neon">•</span> A razão entre termos consecutivos converge para o número áureo (φ ≈ 1,618033988...)</li>
          <li className="flex gap-2"><span className="text-neon">•</span> A soma dos primeiros n termos é igual ao termo (n+2) menos 1</li>
          <li className="flex gap-2"><span className="text-neon">•</span> O quadrado de qualquer termo é aproximadamente igual ao produto dos termos adjacentes, mais ou menos 1</li>
          <li className="flex gap-2"><span className="text-neon">•</span> Dois termos consecutivos são sempre primos entre si (não têm divisores comuns)</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">O Número Áureo (φ)</h2>
        <p className="text-base leading-relaxed">
          A proporção áurea, representada pela letra grega φ (phi), é aproximadamente 1,618. Ela surge 
          naturalmente na sequência de Fibonacci: à medida que os números crescem, a razão entre termos 
          consecutivos se aproxima cada vez mais de φ. Este número aparece em incontáveis fenômenos 
          naturais e é considerado uma das proporções mais harmônicas da matemática.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Fibonacci na Natureza</h2>
        <p className="text-base leading-relaxed">
          A sequência de Fibonacci aparece em diversos fenômenos naturais: o número de pétalas de muitas 
          flores (3, 5, 8, 13, 21), a disposição das sementes no girassol, as espirais de conchas marinhas 
          (nautilus), a ramificação de árvores e até a estrutura de furacões. A natureza parece &quot;preferir&quot; 
          esta sequência por sua eficiência matemática no empacotamento e crescimento.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Aplicações Práticas</h2>
        <p className="text-base leading-relaxed">
          A sequência de Fibonacci e o número áureo têm aplicações em diversas áreas: análise técnica de 
          mercados financeiros (níveis de suporte e resistência), design e arquitetura (proporções áureas), 
          algoritmos de computação (busca fibonacci), e como base para sistemas de progressão em gestão 
          de capital. É importante notar que, embora fascinante, a sequência de Fibonacci não possui 
          propriedades mágicas — sua utilidade vem de suas propriedades matemáticas reais.
        </p>
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

        <h2 className="text-xl font-bold mt-8 mb-3">Como Funciona a Progressão</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">Análise Estatística</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">A Matemática da Ruína</h2>
        <p className="text-base leading-relaxed">
          Com probabilidade de 50% por evento, a chance de 10 perdas consecutivas é (0,5)^10 = 0,0977%, 
          ou aproximadamente 1 em 1.024. Isso parece pequeno, mas considere que em 1.000 sequências de 
          operações, é estatisticamente esperado que pelo menos uma sequência de 10 perdas ocorra. Com uma 
          aposta inicial de R$10, 10 perdas consecutivas exigiriam uma aposta de R$5.120 no 11º nível, 
          com um prejuízo acumulado de R$10.230.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">A Martingale como Ferramenta Educacional</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">Medidas de Tendência Central</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">Medidas de Dispersão</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">Distribuição Normal</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">Como Funciona</h2>
        <p className="text-base leading-relaxed">
          O método de Monte Carlo funciona em três passos básicos:
        </p>
        <ol className="space-y-3 text-base text-muted-foreground list-decimal list-inside">
          <li><strong className="text-foreground">Definir o modelo:</strong> Especificar as variáveis de entrada e suas distribuições de probabilidade</li>
          <li><strong className="text-foreground">Gerar amostras aleatórias:</strong> Simular milhares ou milhões de cenários possíveis usando números aleatórios</li>
          <li><strong className="text-foreground">Analisar os resultados:</strong> Calcular estatísticas (média, variância, percentis) a partir dos resultados simulados</li>
        </ol>

        <h2 className="text-xl font-bold mt-8 mb-3">Exemplo Prático: Estimativa de Pi</h2>
        <p className="text-base leading-relaxed">
          Uma das demonstrações mais elegantes do método Monte Carlo é a estimativa do valor de π. 
          Imagine um quadrado de lado 1 com um círculo inscrito. A razão entre as áreas é π/4. 
          Gerando pontos aleatórios dentro do quadrado e contando quantos caem dentro do círculo, 
          podemos estimar π. Com 1 milhão de pontos, a estimativa converge para 3,14159... com 
          precisão crescente.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Aplicações</h2>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li className="flex gap-2"><span className="text-neon">•</span> Finanças: precificação de derivativos, análise de risco de portfólio (VaR)</li>
          <li className="flex gap-2"><span className="text-neon">•</span> Engenharia: análise de confiabilidade de sistemas complexos</li>
          <li className="flex gap-2"><span className="text-neon">•</span> Física: simulação de partículas, termodinâmica</li>
          <li className="flex gap-2"><span className="text-neon">•</span> Logística: otimização de rotas e cadeias de suprimento</li>
          <li className="flex gap-2"><span className="text-neon">•</span> Inteligência artificial: métodos de amostragem em ML</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">Limitações</h2>
        <p className="text-base leading-relaxed">
          A principal limitação do Monte Carlo é a necessidade de muitas simulações para convergir, 
          especialmente para eventos raros. A qualidade dos resultados depende da qualidade do modelo 
          e das distribuições de probabilidade escolhidas. Além disso, eventos com probabilidade muito 
          baixa podem não ser adequadamente representados sem um número extremamente alto de simulações.
        </p>
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

        <h2 className="text-xl font-bold mt-8 mb-3">1. Viés do Sobrevivente</h2>
        <p className="text-base leading-relaxed">
          O viés do sobrevivente ocorre quando focamos apenas nos &quot;sobreviventes&quot; de um processo e 
          ignoramos os que falharam. Exemplo clássico: durante a Segunda Guerra, analistas queriam 
          reforçar as partes dos aviões que voltavam com mais buracos. O estatístico Abraham Wald 
          mostrou que deveriam reforçar as partes SEM buracos — os aviões que voltaram sobreviveram 
          apesar dos danos; os que foram atingidos nas partes intactas não voltaram.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">2. Falácia do Jogador</h2>
        <p className="text-base leading-relaxed">
          A falácia do jogador é a crença de que resultados passados de eventos independentes influenciam 
          resultados futuros. &quot;Saiu vermelho 5 vezes seguidas, então a próxima deve ser preto&quot; — errado! 
          Cada evento é independente. A roleta não tem memória. A probabilidade é sempre a mesma, 
          independentemente do histórico. Essa falácia é extremamente comum e pode levar a decisões ruins.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">3. Regressão à Média</h2>
        <p className="text-base leading-relaxed">
          A regressão à média é o fenômeno onde valores extremos tendem a ser seguidos por valores mais 
          próximos da média. Se alguém tem um desempenho excepcional, é provável que o próximo desempenho 
          seja mais próximo da média — não porque a pessoa piorou, mas porque o desempenho extremo 
          envolve sorte que não se repete. Ignorar a regressão à média leva a falsas causalidades.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">4. Correlação não é Causalidade</h2>
        <p className="text-base leading-relaxed">
          Duas variáveis podem estar correlacionadas sem que uma cause a outra. O número de afogamentos 
          e vendas de sorvete estão correlacionados — não porque sorvete causa afogamento, mas porque 
          ambos aumentam no verão. Sempre questione se uma correlação implica causalidade ou se há uma 
          variável confundidora (neste caso, a temperatura).
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">5. Lei dos Grandes Números Mal Compreendida</h2>
        <p className="text-base leading-relaxed">
          A lei dos grandes números diz que a média de muitos eventos converge para a probabilidade teórica. 
          Isso NÃO significa que desvios serão &quot;compensados&quot;. Se uma moeda cai 10 vezes em cara, 
          não é verdade que as próximas 10 serão coroa para &quot;equilibrar&quot;. A convergência ocorre 
          pela diluição, não pela compensação — as 10 caras extras se tornam insignificantes 
          quando divididas por milhares de lançamentos.
        </p>
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

        <h2 className="text-xl font-bold mt-8 mb-3">Fórmula do Valor Esperado</h2>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono text-lg">
            E(X) = Σ (xᵢ × P(xᵢ))
          </p>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Onde xᵢ são os valores possíveis e P(xᵢ) são suas probabilidades
          </p>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-3">Exemplo Prático</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">Aplicações do Valor Esperado</h2>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Seguros:</strong> Prêmios são calculados com base no valor esperado de sinistros</li>
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Investimentos:</strong> Retorno esperado de um ativo é seu valor esperado</li>
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Decisões empresariais:</strong> Avaliar projetos pelo valor esperado de retorno</li>
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Análise de risco:</strong> Comparar valor esperado com variância para decisões informadas</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">Valor Esperado e Variância</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">O Problema</h2>
        <p className="text-base leading-relaxed">
          Imagine que você está em um programa de TV e há 3 portas. Atrás de uma porta há um prêmio (um carro) 
          e atrás das outras duas há bodes. Você escolhe uma porta (digamos, a porta 1). O apresentador, que 
          sabe o que está atrás de cada porta, abre uma das outras portas revelando um bode (digamos, a porta 3). 
          Ele então pergunta: &quot;Você quer trocar para a porta 2?&quot;
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">A Resposta Contra-Intuitiva</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">Por Que Funciona?</h2>
        <p className="text-base leading-relaxed">
          A chave está em entender que o apresentador NÃO abre uma porta aleatoriamente — ele sempre abre 
          uma porta com bode. Quando você escolhe inicialmente, há 1/3 de chance de ter escolhido o carro 
          e 2/3 de chance de ter escolhido um bode. Se escolheu o carro (1/3), trocar faz você perder. 
          Se escolheu um bode (2/3), trocar faz você ganhar, pois o apresentador já eliminou o outro bode.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Simulação com 100 Portas</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">Exemplo com Moeda</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">LGN Fraca vs. Forte</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">Aplicações Práticas</h2>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Seguros:</strong> Com muitos segurados, o custo médio por apólice converge para o previsto</li>
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Qualidade:</strong> Amostras grandes representam melhor a população</li>
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Pesquisas:</strong> Mais entrevistados = resultados mais precisos</li>
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Casinos:</strong> A &quot;vantagem da casa&quot; se manifesta no longo prazo</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">Interpretação Equivocada Comum</h2>
        <p className="text-base leading-relaxed">
          A LGN NÃO diz que desvios serão &quot;compensados&quot;. Se uma moeda cair 10 vezes em cara, a LGN não 
          garante que as próximas 10 serão coroa. A convergência ocorre pela diluição: as 10 caras extras 
          se tornam insignificantes quando divididas por milhares de lançamentos. A moeda não tem memória — 
          cada lançamento é independente.
        </p>

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

        <h2 className="text-xl font-bold mt-8 mb-3">Características da Distribuição Normal</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">A Regra 68-95-99,7</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">Teorema Central do Limite</h2>
        <p className="text-base leading-relaxed">
          O Teorema Central do Limite (TCL) explica por que a distribuição normal aparece em tantos lugares. 
          Ele afirma que a média de um grande número de variáveis aleatórias independentes, independentemente 
          de suas distribuições individuais, converge para uma distribuição normal. É por isso que a 
          distribuição normal é tão ubíqua — ela emerge naturalmente quando muitos fatores independentes 
          se combinam.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Pontuação Z (Z-Score)</h2>
        <p className="text-base leading-relaxed">
          A pontuação Z mede quantos desvios padrão um valor está acima ou abaixo da média. A fórmula é:
        </p>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono text-lg">
            Z = (X - μ) / σ
          </p>
        </div>
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

        <h2 className="text-xl font-bold mt-8 mb-3">O Dilema do Prisioneiro</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">Conceitos Fundamentais</h2>
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

        <h2 className="text-xl font-bold mt-8 mb-3">Aplicações no Mundo Real</h2>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Economia:</strong> Leilões, negociação, oligopólios, regulação</li>
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Biologia:</strong> Evolução, seleção natural, comportamento animal</li>
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Ciência Política:</strong> Votação, negociações internacionais, dissuasão</li>
          <li className="flex gap-2"><span className="text-neon">•</span> <strong className="text-foreground">Tecnologia:</strong> Design de mecanismos, sistemas de reputação, blockchain</li>
        </ul>

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
        <div className="text-xs text-muted-foreground">
          Atualizado em {new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Separator */}
      <hr className="border-border/50" />

      {/* Ad — After header */}
      <AdInContent />

      {/* Article content */}
      {article.content}

      {/* Ad — After content */}
      <AdInContent />
    </div>
  )
}
