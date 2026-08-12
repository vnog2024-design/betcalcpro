/**
 * Bankroll Management Calculator
 *
 * Formulas:
 *   betSize = bankroll * (riskPercent / 100)
 *   maxDailyLossAmount = bankroll * (maxLossPercent / 100)
 *   profitTarget = bankroll * (targetProfitPercent / 100)
 *   betsBeforeBust = floor(maxDailyLossAmount / betSize)
 *
 * Source: Standard bankroll management (Kelly Criterion simplified to fixed %).
 */

export interface RiskLevel {
  name: string
  percent: number
  color: string
}

export interface BankrollResult {
  bankroll: number
  results: {
    riskLevel: RiskLevel
    betSize: number
    maxDailyLossAmount: number
    profitTarget: number
    betsBeforeBust: number
  }[]
  custom: {
    betSize: number
    maxDailyLossAmount: number
    profitTarget: number
    betsBeforeBust: number
  }
}

const RISK_LEVELS: RiskLevel[] = [
  { name: 'Conservador', percent: 1, color: 'text-green-500' },
  { name: 'Moderado', percent: 1.5, color: 'text-yellow-500' },
  { name: 'Agressivo', percent: 2, color: 'text-red-500' },
]

export function calculateBankroll(
  bankroll: number,
  riskPercent: number,
  targetProfitPercent: number,
  maxLossPercent: number
): BankrollResult | null {
  if (bankroll <= 0) return null

  const results = RISK_LEVELS.map((riskLevel) => {
    const betSize = bankroll * (riskLevel.percent / 100)
    const maxDailyLossAmount = bankroll * (maxLossPercent / 100)
    const profitTarget = bankroll * (targetProfitPercent / 100)
    const betsBeforeBust =
      maxDailyLossAmount > 0 && betSize > 0
        ? Math.floor(maxDailyLossAmount / betSize)
        : 0

    return { riskLevel, betSize, maxDailyLossAmount, profitTarget, betsBeforeBust }
  })

  const customBetSize = bankroll * (riskPercent / 100)
  const customMaxDailyLoss = bankroll * (maxLossPercent / 100)
  const customProfitTarget = bankroll * (targetProfitPercent / 100)
  const customBetsBeforeBust =
    customMaxDailyLoss > 0 && customBetSize > 0
      ? Math.floor(customMaxDailyLoss / customBetSize)
      : 0

  return {
    bankroll,
    results,
    custom: {
      betSize: customBetSize,
      maxDailyLossAmount: customMaxDailyLoss,
      profitTarget: customProfitTarget,
      betsBeforeBust: customBetsBeforeBust,
    },
  }
}
