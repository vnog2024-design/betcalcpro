/**
 * Martingale Progression Calculator
 *
 * Formula: bet_n = initialBet * multiplier^n
 * Total invested = sum(bet_0 ... bet_n)
 * Profit = (bet * payout) - totalInvested
 *
 * Source: Standard geometric progression applied to betting.
 */

export interface GaleLevel {
  level: number
  bet: number
  totalInvested: number
  potentialWin: number
  profit: number
  profitPercent: number
}

export function calculateMartingaleLevels(
  initialBet: number,
  multiplier: number,
  galeCount: number,
  targetPayout: number
): GaleLevel[] {
  if (initialBet <= 0 || multiplier <= 0 || galeCount <= 0 || targetPayout <= 0) return []

  const levels: GaleLevel[] = []
  let currentBet = initialBet
  let totalInvested = 0

  for (let i = 0; i <= galeCount; i++) {
    totalInvested += currentBet
    const potentialWin = currentBet * targetPayout
    const profit = potentialWin - totalInvested
    const profitPercent = totalInvested > 0 ? (profit / totalInvested) * 100 : 0

    levels.push({
      level: i,
      bet: currentBet,
      totalInvested,
      potentialWin,
      profit,
      profitPercent,
    })

    currentBet = currentBet * multiplier

    // Prevent infinite values
    if (!isFinite(currentBet) || !isFinite(totalInvested)) break
  }

  return levels
}

/** Sample chart data to maxPoints for performance */
export function sampleChartData(levels: GaleLevel[], maxPoints = 50): GaleLevel[] {
  if (levels.length <= maxPoints) return levels

  const step = (levels.length - 1) / (maxPoints - 1)
  const sampled: GaleLevel[] = []

  for (let i = 0; i < maxPoints; i++) {
    const idx = Math.round(i * step)
    sampled.push(levels[idx])
  }

  // Always include last
  sampled.push(levels[levels.length - 1])
  return sampled
}
