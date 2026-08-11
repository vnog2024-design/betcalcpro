# Referência de Fórmulas — BetCalc Pro

> Documentação viva. Última atualização: 2026-08-12 (FASE 0 — Blindagem Matemática)

## 1. Progressão Martingale

**Arquivo:** `src/lib/calculations/martingale.ts`

| Campo | Fórmula | Descrição |
|--------|---------|------------|
| Aposta no nível n | `bet_n = initialBet × multiplier^n` | Progressão geométrica |
| Total investido | `Σ bet_i` (i=0 até n) | Soma acumulada |
| Retorno potencial | `bet × payout` | Retorno bruto se ganhar |
| Lucro | `potentialWin - totalInvested` | Lucro líquido se ganhar no nível n |
| Lucro % | `(profit / totalInvested) × 100` | ROI percentual |

**Entrada:** `initialBet`, `multiplier`, `galeCount`, `targetPayout`
**Saída:** `GaleLevel[]` — { level, bet, totalInvested, potentialWin, profit, profitPercent }

**Edge cases:**
- Input ≤ 0 → retorna array vazio
- Para de gerar se `bet` ou `totalInvested` atingir `Infinity`

**Fonte:** Progressão geométrica padrão aplicada a apostas.

---

## 2. Progressão Fibonacci

**Arquivo:** `src/lib/calculations/fibonacci.ts`

| Campo | Fórmula | Descrição |
|--------|---------|------------|
| Sequência | `fib[0]=1, fib[1]=1, fib[i] = fib[i-1] + fib[i-2]` | Sequência de Fibonacci |
| Aposta no nível n | `initialBet × fib[n]` | Proporcional ao número de Fibonacci |
| Total investido | `Σ bet_i` | Soma acumulada |
| Retorno potencial | `bet × payout` | Retorno bruto |
| Lucro | `potentialReturn - totalInvested` | Lucro líquido |

**Entrada:** `initialBet`, `numLevels`, `targetPayout`
**Saída:** `FibonacciResult` — { levels, fibSequence, totalBankrollNeeded, maxProfit, maxBet }

**Edge cases:** `initialBet ≤ 0 || numLevels ≤ 0 || targetPayout ≤ 0` → retorna `null`

**Fonte:** Sequência de Fibonacci padrão aplicada a progressões de apostas.

---

## 3. Gestão de Bankroll

**Arquivo:** `src/lib/calculations/bankroll.ts`

| Campo | Fórmula | Descrição |
|--------|---------|------------|
| Tamanho da aposta | `bankroll × (riskPercent / 100)` | Porcentagem fixa da banca |
| Perda máxima diária | `bankroll × (maxLossPercent / 100)` | Limite de perda diária |
| Meta de lucro | `bankroll × (targetProfitPercent / 100)` | Meta de lucro diária |
| Apostas até quebra | `⌊maxDailyLoss / betSize⌋` | Quantas apostas até atingir o limite |

**Níveis pré-definidos:** Conservador (1%), Moderado (2%), Agressivo (5%)

**Entrada:** `bankroll`, `riskPercent`, `targetProfitPercent`, `maxLossPercent`
**Saída:** `BankrollResult` — resultados para cada nível + customizado

**Edge cases:** `bankroll ≤ 0` → retorna `null`. Divisão por zero protegida por `maxDailyLoss > 0 && betSize > 0`.

**Fonte:** Gestão de risco simplificada (regra fixa de porcentagem).

---

## 4. Compostagem Soros

**Arquivo:** `src/lib/calculations/soros.ts`

| Campo | Fórmula | Descrição |
|--------|---------|------------|
| Aposta | `workingCapital` | Aposta 100% do capital de trabalho |
| Lucro bruto | `bet × (multiplier - 1)` | Lucro da operação |
| Valor protegido | `grossProfit × (1 - sorosPercentage)` | Porção retirada |
| Valor reinvestido | `grossProfit × sorosPercentage` | Porção reinvestida |
| Novo capital de trabalho | `bet + reinvestedAmount` | Capital para próxima operação |
| Total se ganhar tudo | `newWorkingCapital + accumulatedProtected` | Patrimônio total |
| Pior caso (perda no passo 1) | `0 - initialBankroll` | Perde toda a banca |
| Crescimento total | `((finalBankroll - initial) / initial) × 100` | Crescimento percentual |

**Entrada:** `initialBankroll`, `multiplier`, `sorosPercentage`, `numSteps`
**Saída:** `SorosResult` — { steps, totalGrowth, totalProfit, worstCaseRemaining, worstCaseNet }

**Edge cases:** `bankroll ≤ 0 || multiplier ≤ 1 || sorosPct ≤ 0 || sorosPct > 1 || steps ≤ 0` → retorna array vazio.

**Fonte:** Estratégia de composição inspirada em George Soros — proteger parte do lucro, reinvestir o restante.

---

## 5. Método Masaniello

**Arquivo:** `src/lib/calculations/masaniello.ts`

### Tabela de Coeficientes NE

Regra de preenchimento (programação dinâmica, bottom-right → top-left):

```
NE[e][w] = 1                                           se w ≥ winsNeeded (meta atingida)
NE[e][w] = payout^(totalOps - e)                       se remainingWins == remainingEvents (deve ganhar todos)
NE[e][w] = (O × NE[e+1][w] × NE[e+1][w+1]) / (NE[e+1][w] + (O-1) × NE[e+1][w+1])  caso contrário
NE[e][w] = Infinity                                   se denominador ou dividendo = 0
```

### Cálculo do Investimento

```
A = NE[eventsDone + 1][winsSoFar + 1]
B = NE[eventsDone + 1][winsSoFar]
fraction = 1 - (payout × A) / (B + (payout - 1) × A)
invest = min(bank × fraction, bank)
```

### Atualização do Capital

```
Win:  capital = capital + invest × (payout - 1)
Loss: capital = capital - invest
```

**Entrada:** `capital`, `totalOps`, `winsNeeded`, `payout`, `results[]`
**Saída:** `MasanielloSimulation` — { steps, currentBank, maxBank, winsSoFar, lossesSoFar, eventsDoneSoFar, nextBet, targetReached, broke, allDone, profit }

**Edge cases:**
- `totalOps ≤ 0 || winsNeeded ≤ 0 || payout ≤ 1` → `null`
- `winsNeeded > totalOps` → `null`
- `A || B == 0 || Infinity` → investimento = 0
- `fraction ≤ 0` → investimento = 0

**Fonte:** Sistema de apostas Masaniello — plano de staking matemático italiano.

---

## 6. Cobertura (Hedging)

**Arquivo:** `src/lib/calculations/hedging.ts`

### Entrada Principal

```
ratio = payoutB / payoutA
outcomeB = totalInvested / (1 + ratio)
outcomeA = totalInvested - outcomeB
profit = outcomeA × (payoutA - 1) - outcomeB
```

### Gale 1 (Recuperação)

```
galeDenom = ratio × (payoutA - 1) - 1
// Requer galeDenom > 0
outcomeB = (primaryProfit + totalInvested) / galeDenom
outcomeA = ratio × outcomeB
galeProfit = outcomeA × (payoutA - 1) - outcomeB - totalInvested
```

### Gale 2 (Segunda Recuperação)

```
gale2TotalLoss = primaryTotal + galeTotal
// Mesma fórmula do Gale 1 com gale2TotalLoss
```

**Entrada:** `bankroll`, `targetPercent`, `riskPercent`, `payoutA`, `payoutB`
**Saída:** `HedgingResult` — valores para entrada principal, gale 1, gale 2, entriesNeeded, totalRisk

**Edge cases:**
- `bankroll ≤ 0 || risk ≤ 0 || payoutA ≤ 1 || payoutB ≤ 1` → `null`
- `payoutB ≤ payoutA` → `null` (B deve pagar mais que A)
- `galeDenom ≤ 0` → `null`

**Propriedade verificada:** `outcomeA + outcomeB = totalInvested` (conservação do capital investido)

**Fonte:** Matemática de arbitragem/cobertura para eventos de dois resultados.

---

## 7. Recuperação de Perdas (3 Estratégias)

**Arquivo:** `src/lib/calculations/recovery.ts`

### Plana (Flat)

```
bet = initialBankroll × riskPct  (constante)
```

### Progressiva

```
bet = currentBankroll × riskPct  (cresce com a banca)
```

### Agressiva

```
remaining = targetBankroll - currentBankroll
recoveryTarget = remaining × riskPct × 2
bet = min(recoveryTarget / (odds - 1), bankroll × 0.5)
```

**Atualização:** `bankroll = bankroll + bet × (odds - 1)` (assumindo vitória)

**Entrada:** `currentBankroll`, `targetBankroll`, `odds`, `riskPercentage`
**Saída:** `StrategyResult[]` — 3 estratégias com steps, finalBankroll, maxDrawdown

**Edge cases:**
- `current ≤ 0 || target ≤ current || odds ≤ 1 || riskPct ≤ 0 || riskPct ≥ 1` → array vazio
- Máximo 100 passos por estratégia
- Agressiva: aposta limitada a 50% da banca

**Fonte:** Estratégias padrão de recuperação de perdas em apostas.

---

## 8. Ciclos (Martingale em Ciclos)

**Arquivo:** `src/lib/calculations/cycles.ts`

```
// Dentro de cada ciclo (Martingale normal):
bet_n = currentBet × galeMultiplier
cycleInvested += bet_n
potentialReturn = bet_n × payout
totalInvested = cycleInvested + totalLossFromPrevCycles
netProfit = potentialReturn - totalInvested

// Entre ciclos:
cycleLoss = totalInvested (último gale do ciclo)
totalLossFromPrevCycles = cycleLoss
nextEntryBet = lastBet × cycleMultiplier

// Multiplicador mínimo de ciclo:
minCycleMult = 1 / (payout - 1)
```

**Entrada:** `initialBet`, `payout`, `galeMultiplier`, `galesPerCycle`, `cycleMultiplier`, `numCycles`
**Saída:** `CycleGroup[]` — cada grupo com gales, cycleLoss, totalLossFromPrevCycles, nextEntryBet

**Edge cases:** Qualquer input ≤ 0 → array vazio. Para se `!isFinite(currentBet)`.

**Fonte:** Martingale modificado com gestão de ciclos.

---

## 9. Recuperação de Perdas (Porcentagem)

**Arquivo:** `src/lib/calculations/loss-recovery.ts`

```
recoveryTarget = totalLoss × recoveryPercentage
betAmount = recoveryTarget / (multiplier - 1)
potentialRecovery = betAmount × (multiplier - 1)
cumulativeRecovery += potentialRecovery
remainingLoss = max(0, totalLoss - cumulativeRecovery)
recoveryPercent = min(100, (cumulativeRecovery / totalLoss) × 100)
```

**Entrada:** `amountLost`, `recoveryPercentage`, `targetMultiplier`
**Saída:** `LossRecoveryResult` — { steps, totalWagered, totalSteps, finalRecoveryPercent }

**Edge cases:**
- `amountLost ≤ 0 || recoveryPct ≤ 0 || recoveryPct > 1 || mult ≤ 1` → resultado vazio
- Máximo 50 passos
- Para se `potentialRecovery ≤ 0`
- `remainingLoss` nunca negativo (Math.max com 0)
- `recoveryPercent` nunca excede 100 (Math.min com 100)

**Fonte:** Recuperação de perdas baseada em porcentagem fixa por passo.

---

## 10. Probabilidade e Simulação Monte Carlo

**Arquivo:** `src/lib/calculations/probability.ts`

### Probabilidades Teóricas

```
P(n vitórias consecutivas) = p^n
P(n derrotas consecutivas) = (1-p)^n
Valor esperado por rodada = p - (1-p) = 2p - 1
```

### Simulação Monte Carlo

```
Para cada simulação (N simulações):
  Para cada rodada (máx 100):
    Se balance < bet: parar
    isWin = random() < p
    Se win: balance += bet
    Se loss: balance -= bet
    Rastrear: sequências de vitórias/derrotas
```

### Estatísticas

```
avgBalance = média dos saldos finais
variance = média((finalBalance - avgBalance)²)
stdDev = √variance
profitPct = (profitCount / total) × 100
bustPct = (bustCount / total) × 100
```

**Entrada:** `probability%`, `numSims`, `consecutiveTarget`, `startBalance`, `betAmount`
**Saída:** `SimulationRun[]`, `ProbabilityEntry[]`, `StatsSummary`

**Edge cases:** `p ≤ 0 || p ≥ 1 || numSims ≤ 0 || ...` → array vazio. Balance floor: `balance < bet` para o loop.

**Fonte:** Teoria das probabilidades (ensaios de Bernoulli) e método de Monte Carlo.

---

## Funções Não Testáveis (UI-dependent)

As seguintes funções estão nos componentes de UI e dependem de estado React. Não foram extraídas porque contêm apenas lógica de apresentação:

- `formatCurrency()` — formatação de moeda (presente em múltiplos arquivos, idêntica)
- `generateOutcome()` (double-simulator) — geração aleatória com pesos fixos
- `getFibonacciBet()` (double-simulator) — lookup em array pré-definido
- `generateMultiplier()` (crash-simulator) — distribuição exponencial
- `generateStrategies()` (strategy-generator) — templates com multiplicadores fixos
- `parsedSequence()` / `analysis()` (sequence-analyzer) — parsing e estatísticas de sequências textuais

Estas funções não contém lógica matemática complexa e estão cobertas indiretamente pelos testes de regressão visual.
