/**
 * Fibonacci Progression Calculator
 *
 * Generates Fibonacci sequence and applies to betting progression.
 * bet_n = initialBet * fib[n]
 * Total invested = sum(bet_0 ... bet_n)
 * Profit = (bet * payout) - totalInvested
 *
 * Source: Standard Fibonacci sequence (1, 1, 2, 3, 5, 8, 13, ...)
 */

export interface FibonacciLevel {
  level: number
  fibNumber: number
  betAmount: number
  totalInvested: number
  potentialReturn: number
  profit: number
}

export interface FibonacciResult {
  levels: FibonacciLevel[]
  fibSequence: number[]
  totalBankrollNeeded: number
  maxProfit: number
  maxBet: number
}

export function calculateFibonacci(
  initialBet: number,
  numLevels: number,
  targetPayout: number
): FibonacciResult | null {
  if (initialBet <= 0 || numLevels <= 0 || targetPayout <= 0) return null

  // Generate Fibonacci sequence
  const fibSequence: number[] = [1, 1]
  for (let i = 2; i < numLevels; i++) {
    fibSequence.push(fibSequence[i - 1] + fibSequence[i - 2])
  }

  const levels: FibonacciLevel[] = []
  let totalInvested = 0
  let maxProfit = -Infinity
  let maxBet = 0

  for (let i = 0; i < numLevels; i++) {
    const fibNum = fibSequence[i]
    const betAmount = initialBet * fibNum
    totalInvested += betAmount
    const potentialReturn = betAmount * targetPayout
    const profit = potentialReturn - totalInvested

    if (profit > maxProfit) maxProfit = profit
    if (betAmount > maxBet) maxBet = betAmount

    levels.push({
      level: i,
      fibNumber: fibNum,
      betAmount,
      totalInvested,
      potentialReturn,
      profit,
    })
  }

  return {
    levels,
    fibSequence,
    totalBankrollNeeded: totalInvested,
    maxProfit,
    maxBet,
  }
}
