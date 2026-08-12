# Remaining 5 articles - loaded by article_contents.py

articles_jsx['sistema-masaniello-pratica'] = {
    'title': 'Como Funciona o Sistema Masaniello na Prática',
    'category': 'Análise',
    'readTime': '11 min',
    'icon': 'BarChart3',
    'jsx': r'''<div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
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
      </div>'''
}

articles_jsx['hedging-apostas-guia-completo'] = {
    'title': 'Hedging em Apostas: Guia Completo',
    'category': 'Gestão',
    'readTime': '10 min',
    'icon': 'TrendingUp',
    'jsx': r'''<div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
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
      </div>'''
}

articles_jsx['fibonacci-vs-martingale'] = {
    'title': 'Fibonacci vs Martingale: Comparativo Completo',
    'category': 'Análise',
    'readTime': '13 min',
    'icon': 'BarChart3',
    'jsx': r'''<div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
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
      </div>'''
}

articles_jsx['como-identificar-value-bets'] = {
    'title': 'Como Identificar Value Bets: Guia Prático',
    'category': 'Análise',
    'readTime': '11 min',
    'icon': 'Lightbulb',
    'jsx': r'''<div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
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
          que o Corinthians tem 50% de chance de ganhar, você encontrou uma value bet: 50% > 42,1%.
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
              Mercados de resultado final são muito eficientes. Mercados como escanteios, cartões,
              cantos de escanteio ou ligas menores têm menos liquidez e mais ineficiências.
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
      </div>'''
}

articles_jsx['lucro-esperado-vs-retorno'] = {
    'title': 'Lucro Esperado vs Retorno: Entenda a Diferença',
    'category': 'Fundamentos',
    'readTime': '9 min',
    'icon': 'Lightbulb',
    'jsx': r'''<div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
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
      </div>'''
}
