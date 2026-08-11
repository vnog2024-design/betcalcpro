/**
 * Probability Theoretical Calculations
 *
 * P(n consecutive wins) = p^n
 * P(n consecutive losses) = (1-p)^n
 * Expected value per round = p - (1-p) = 2p - 1
 *
 * Source: Fundamental probability theory (Bernoulli trials).
 */

export interface ProbabilityEntry {
  consecutive: number
  winProb: number
  lossProb: number
  expectedValue: number
}

export function calculateTheoreticalProbabilities(
  probabilityPercent: number,
  maxConsecutive: number
): ProbabilityEntry[] {
  const p = probabilityPercent / 100
  if (isNaN(p) || p <= 0 || p >= 1) return []

  const entries: ProbabilityEntry[] = []
  const max = Math.min(maxConsecutive + 5, 15)

  for (let n = 1; n <= max; n++) {
    entries.push({
      consecutive: n,
      winProb: Math.pow(p, n),
      lossProb: Math.pow(1 - p, n),
      expectedValue: p - (1 - p),
    })
  }

  return entries
}

/** Monte Carlo simulation result for a single run */
export interface SimulationRun {
  finalBalance: number
  maxWinStreak: number
  maxLossStreak: number
  hitConsecWins: boolean
}

/** Run N Monte Carlo simulations */
export function runMonteCarlo(
  probabilityPercent: number,
  numSims: number,
  consecutiveTarget: number,
  startBalance: number,
  betAmount: number,
  roundsPerSim: number = 100
): SimulationRun[] {
  const p = probabilityPercent / 100
  if (p <= 0 || p >= 1 || numSims <= 0 || consecutiveTarget <= 0 || startBalance <= 0 || betAmount <= 0) {
    return []
  }

  const results: SimulationRun[] = []

  for (let sim = 0; sim < numSims; sim++) {
    let balance = startBalance
    let maxWinStreak = 0
    let maxLossStreak = 0
    let currentWinStreak = 0
    let currentLossStreak = 0
    let hitConsecWins = false

    for (let r = 0; r < roundsPerSim; r++) {
      if (balance < betAmount) break

      const isWin = Math.random() < p
      if (isWin) {
        balance += betAmount
        currentWinStreak++
        currentLossStreak = 0
        if (currentWinStreak > maxWinStreak) maxWinStreak = currentWinStreak
        if (currentWinStreak >= consecutiveTarget) hitConsecWins = true
      } else {
        balance -= betAmount
        currentLossStreak++
        currentWinStreak = 0
        if (currentLossStreak > maxLossStreak) maxLossStreak = currentLossStreak
      }
    }

    results.push({ finalBalance: balance, maxWinStreak, maxLossStreak, hitConsecWins })
  }

  return results
}

/** Statistics summary from Monte Carlo results */
export interface StatsSummary {
  avgBalance: number
  profitCount: number
  lossCount: number
  bustCount: number
  profitPct: number
  lossPct: number
  bustPct: number
  avgMaxWinStreak: number
  avgMaxLossStreak: number
  hitConsecWinsPct: number
  variance: number
  stdDev: number
}

export function calculateStatsSummary(
  results: SimulationRun[],
  initialBalance: number
): StatsSummary | null {
  if (results.length === 0) return null

  const n = results.length
  const avgBalance = results.reduce((s, r) => s + r.finalBalance, 0) / n
  const profitCount = results.filter((r) => r.finalBalance > initialBalance).length
  const lossCount = results.filter((r) => r.finalBalance < initialBalance).length
  const bustCount = results.filter((r) => r.finalBalance <= 0).length

  const variance = results.reduce((s, r) => s + Math.pow(r.finalBalance - avgBalance, 2), 0) / n

  return {
    avgBalance,
    profitCount,
    lossCount,
    bustCount,
    profitPct: (profitCount / n) * 100,
    lossPct: (lossCount / n) * 100,
    bustPct: (bustCount / n) * 100,
    avgMaxWinStreak: results.reduce((s, r) => s + r.maxWinStreak, 0) / n,
    avgMaxLossStreak: results.reduce((s, r) => s + r.maxLossStreak, 0) / n,
    hitConsecWinsPct: (results.filter((r) => r.hitConsecWins).length / n) * 100,
    variance,
    stdDev: Math.sqrt(variance),
  }
}
