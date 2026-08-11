/**
 * Hedging Calculator (Dual-Outcome Arbitrage/Cover)
 *
 * Core principle: Apportion bet between two outcomes A and B
 * so profit is equal regardless of which wins.
 *
 *   ratio = pB / pA
 *   outcomeB = total / (1 + ratio)
 *   outcomeA = total - outcomeB
 *   profit = outcomeA * (pA - 1) - outcomeB
 *
 * Gale recovery uses same ratio to recover prior losses.
 *
 * Source: Arbitrage/hedging mathematics for dual-outcome events.
 */

export interface HedgingResult {
  primaryOutcomeA: number
  primaryOutcomeB: number
  primaryTotal: number
  primaryProfit: number
  galeOutcomeA: number
  galeOutcomeB: number
  galeTotal: number
  galeProfit: number
  gale2OutcomeA: number
  gale2OutcomeB: number
  gale2Total: number
  gale2Profit: number
  targetCash: number
  entriesNeeded: number
  totalRisk: number
}

export function calculateHedging(
  bankroll: number,
  targetPercent: number,
  riskPercent: number,
  payoutA: number,
  payoutB: number
): HedgingResult | null {
  if (bankroll <= 0 || riskPercent <= 0 || payoutA <= 1 || payoutB <= 1) return null
  if (payoutB <= payoutA) return null

  const targetCash = bankroll * (targetPercent / 100)
  let pTotal = bankroll * (riskPercent / 100)
  if (pTotal < 0.01) pTotal = 0.01

  const ratio = payoutB / payoutA

  // Primary
  const primaryOutcomeB = pTotal / (1 + ratio)
  const primaryOutcomeA = pTotal - primaryOutcomeB
  const primaryProfit = primaryOutcomeA * (payoutA - 1) - primaryOutcomeB

  // Gale 1
  const galeDenom = ratio * (payoutA - 1) - 1
  if (galeDenom <= 0) return null

  const galeOutcomeB = (primaryProfit + pTotal) / galeDenom
  const galeOutcomeA = ratio * galeOutcomeB
  const galeTotal = galeOutcomeA + galeOutcomeB
  const galeProfit = galeOutcomeA * (payoutA - 1) - galeOutcomeB - pTotal

  // Gale 2
  const gale2TotalLoss = pTotal + galeTotal
  const gale2OutcomeB = (primaryProfit + gale2TotalLoss) / galeDenom
  const gale2OutcomeA = ratio * gale2OutcomeB
  const gale2Total = gale2OutcomeA + gale2OutcomeB
  const gale2Profit = gale2OutcomeA * (payoutA - 1) - gale2OutcomeB - gale2TotalLoss

  const entriesNeeded = primaryProfit > 0 ? Math.ceil(targetCash / primaryProfit) : Infinity

  return {
    primaryOutcomeA,
    primaryOutcomeB,
    primaryTotal: pTotal,
    primaryProfit,
    galeOutcomeA,
    galeOutcomeB,
    galeTotal,
    galeProfit,
    gale2OutcomeA,
    gale2OutcomeB,
    gale2Total,
    gale2Profit,
    targetCash,
    entriesNeeded,
    totalRisk: pTotal + galeTotal + gale2Total,
  }
}
