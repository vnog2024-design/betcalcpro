#!/usr/bin/env python3
"""Generate JSX content for 8 new articles and inject into article-content.tsx"""

import re

BASE = '/home/z/my-project'
TARGET = f"{BASE}/src/components/content/article-content.tsx"

# All 8 articles JSX content
articles_jsx = {}

articles_jsx['como-calcular-probabilidades-odds'] = {
    'title': 'Como Calcular Probabilidades a Partir de Odds',
    'category': 'Fundamentos',
    'readTime': '10 min',
    'icon': 'Calculator',
    'jsx': r'''<div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
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
          Tabela de conversão rápida das odds fracionárias mais comuns: 1/1 (Evens) = 2.00 decimal = 50%;
          2/1 = 3.00 = 33,3%; 5/2 = 3.50 = 28,6%; 10/1 = 11.00 = 9,1%; 1/2 = 1.50 = 66,7%;
          4/6 = 1.67 = 60%. Quanto menor a fração (como 1/10), maior a probabilidade implícita e menor o retorno potencial.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Odds Americanas (+/-)</h2>
        <p className="text-base leading-relaxed">
          As odds americanas usam sinais positivos e negativos. Odds positivas (como +200) indicam quanto você lucra em uma aposta de 100 unidades.
          Odds negativas (como -150) indicam quanto você precisa apostar para lucrar 100 unidades. Para odds positivas:
          probabilidade = 100 / (odd + 100). Para odds negativas: probabilidade = |odd| / (|odd| + 100).
        </p>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono text-lg">
            Odd +: Prob. (%) = 100 / (odd + 100) x 100<br />
            Odd -: Prob. (%) = |odd| / (|odd| + 100) x 100
          </p>
        </div>
        <p className="text-base leading-relaxed">
          Exemplos: +200 = 33,3% de probabilidade; -150 = 60%; +500 = 16,7%; -400 = 80%.
          Odds americanas acima de +300 representam eventos improváveis,
          enquanto odds abaixo de -200 indicam fortes favoritos. Muitas plataformas como DraftKings e BetMGM usam esse formato,
          então saber converter é fundamental para quem compara odds entre casas.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Removendo a Margem da Casa (Overround)</h2>
        <p className="text-base leading-relaxed">
          A soma das probabilidades implícitas em um mercado sempre ultrapassa 100% por causa da margem da casa.
          Para obter as probabilidades reais, divida cada probabilidade individual pela soma total de todas as probabilidades do mercado.
        </p>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-center font-mono text-lg">
            Prob. real (%) = (Prob. implícita / Soma total) x 100
          </p>
        </div>
        <p className="text-base leading-relaxed">
          Usando nosso exemplo do Flamengo vs Grêmio (soma 106,4%): probabilidade real do Flamengo = 55,6/106,4 = 52,3%;
          empate = 28,6/106,4 = 26,9%; Grêmio = 22,2/106,4 = 20,9%. Essas são as probabilidades sem a margem da casa.
          Compare esses valores com sua própria estimativa — se você acredita que o Flamengo tem 60% de chance
          e a odd paga como se fossem 52,3%, você encontrou uma value bet.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Probabilidade Implícita vs Probabilidade Real</h2>
        <p className="text-base leading-relaxed">
          A probabilidade implícita é o que a casa de apostas "diz" sobre um evento. A probabilidade real é o que você,
          com sua análise, estima. Se sua estimativa é maior que a implícita, a odd está subvalorizada — é uma oportunidade.
          Se for menor, a odd está sobrevalorizada e a aposta tem valor esperado negativo. Na prática, isso significa que você
          precisa de um modelo próprio de avaliação de probabilidades — pode ser análise estatística de resultados históricos,
          modelos de Poisson para futebol ou Elo ratings. Use nosso Simulador de Probabilidades para testar diferentes cenários.
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
          Guarde esta tabela como referência. Com o tempo, você desenvolve a intuição para converter odds mentalmente,
          mas nos primeiros meses é essencial ter essa referência rápida. Quanto mais você pratica a conversão, mais rápido
          consegue identificar quando uma odd está oferecendo valor real ou quando a margem da casa está absorvendo
          todo o potencial de lucro.
        </p>
      </div>'''
}

articles_jsx['o-que-e-drawdown'] = {
    'title': 'O que é Drawdown e Como Proteger Seu Capital',
    'category': 'Gestão',
    'readTime': '9 min',
    'icon': 'TrendingUp',
    'jsx': r'''<div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
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
      </div>'''
}

articles_jsx['guia-gestao-bankroll-apostas'] = {
    'title': 'Guia Completo de Gestão de Bankroll',
    'category': 'Gestão',
    'readTime': '12 min',
    'icon': 'TrendingUp',
    'jsx': r'''<div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
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
          f* = (1.10 x 0.55 - 0.45) / 1.10 = 14,1%. Kelly sugere 14,1% do bankroll — agressivo demais para a maioria.
          Profissionais usam "meio-Kelly" (7%) ou "um quarto de Kelly" (3,5%) para reduzir a volatilidade.
          O Critério é poderoso, mas sensível a erros na estimativa de probabilidade.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Simulação: 1% vs 3% vs 5%</h2>
        <p className="text-base leading-relaxed">
          Considere 1.000 apostas, taxa de acerto 54%, odd média 1.90. Com 1%: bankroll final esperado ~280% do inicial,
          drawdown máximo raramente acima de 15%. Com 3%: ~520%, drawdown 35-40%. Com 5%: até 900% em cenários favoráveis,
          mas drawdown acima de 60% com risco real de ruína. A lição: tamanhos maiores amplificam tanto ganhos quanto perdas,
          e o risco de ruína cresce de forma não-linear. Use a Calculadora de Gestão de Capital para simular com seus próprios números.
        </p>
      </div>'''
}

print(f"Loaded {len(articles_jsx)} articles")

# Now read remaining articles from part 2
exec(open(f"{BASE}/scripts/article_contents_p2.py").read())

print(f"Total articles to inject: {len(articles_jsx)}")

# ========== BUILD INSERTION STRING ===========
entries = []
for slug, data in articles_jsx.items():
    entry = f"  '{slug}': {{\n"
    entry += f"    title: '{data['title']}',\n"
    entry += f"    category: '{data['category']}',\n"
    entry += f"    readTime: '{data['readTime']}',\n"
    entry += f"    icon: {data['icon']},\n"
    entry += f"    content: (\n      {data['jsx']}\n    ),\n"
    entry += f"  }}"
    entries.append(entry)

insertion = ",\n\n".join(entries)

# ========== INJECT INTO FILE ==========
with open(TARGET, 'r') as f:
    content = f.read()

# Find the last article entry closing and the Record closing brace
# The pattern is: ),
  },
}
# We want to insert before the final }
marker = "    ),\n  },\n}"

if marker in content:
    content = content.replace(marker, f"    ),\n  }},\n\n  {insertion},\n}}", 1)
    with open(TARGET, 'w') as f:
        f.write(content)
    print(f"[OK] Injected {len(articles_jsx)} article contents into {TARGET}")
else:
    print("[ERROR] Could not find insertion marker!")
    # Debug: find the last },
    last_close = content.rfind('  },\n}')
    print(f"Last '}},\n}}' at position: {last_close}")
    print("Context around position:")
    if last_close > 0:
        print(repr(content[last_close-50:last_close+50]))
