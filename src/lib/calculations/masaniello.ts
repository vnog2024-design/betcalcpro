/**
 * Masaniello Method Calculator
 *
 * Builds a NE (Necessity Equation) coefficient table using dynamic programming.
 * Then calculates optimal bet size at each step.
 *
 * NE table rules:
 *   NE[e][w] = 1 if w >= winsNeeded (target reached)
 *   NE[e][w] = O^(totalOps-e) if remainingWins === remainingEvents (must win all remaining)
 *   NE[e][w] = (O * NE[e+1][w] * NE[e+1][w+1]) / (NE[e+1][w] + (O-1) * NE[e+1][w+1])
 *
 * Investment formula:
 *   fraction = 1 - (O * NE[e+1][w+1]) / (NE[e+1][w] + (O-1) * NE[e+1][w+1])
 *   invest = bank * min(max(fraction, 0), 1)
 *
 * Source: Masaniello betting system — Italian mathematical staking plan.
 */

export interface MasanielloStep {
  opNumber: number
  betAmount: number
  ifWinCapital: number
  ifLoseCapital: number
  ifWinReturn: number
  winsNeeded: number
  opsRemaining: number
}

/**
 * Build the NE coefficient table.
 * NE[eventsDone][winsSoFar] represents the multiplicative factor.
 */
export function buildCoefficientTable(
  totalOps: number,
  winsNeeded: number,
  payout: number
): number[][] {
  const NE: number[][] = []
  for (let e = 0; e <= totalOps + 1; e++) {
    NE[e] = new Array(winsNeeded + 2).fill(0)
  }

  // Boundary: wins >= winsNeeded -> 1
  for (let e = 0; e <= totalOps + 1; e++) {
    NE[e][winsNeeded] = 1
    NE[e][winsNeeded + 1] = 1
  }
  // Beyond all events -> 1
  for (let w = 0; w <= winsNeeded + 1; w++) {
    NE[totalOps + 1][w] = 1
  }

  // All remaining events must be wins
  for (let e = 0; e <= totalOps; e++) {
    for (let w = 0; w <= winsNeeded; w++) {
      const remWins = winsNeeded - w
      const remEvents = totalOps - e
      if (remWins > 0 && remWins === remEvents) {
        NE[e][w] = Math.pow(payout, remEvents)
      }
    }
  }

  // Fill from bottom-right to top-left
  for (let e = totalOps; e >= 0; e--) {
    for (let w = winsNeeded - 1; w >= 0; w--) {
      const remWins = winsNeeded - w
      const remEvents = totalOps - e
      if (remWins > 0 && remWins === remEvents) continue
      if (w >= winsNeeded) continue

      const below = NE[e + 1][w]
      const belowRight = NE[e + 1][w + 1]

      if (below === 0 || belowRight === 0) {
        NE[e][w] = Infinity
      } else {
        NE[e][w] = (payout * below * belowRight) / (below + (payout - 1) * belowRight)
      }
    }
  }

  return NE
}

/**
 * Calculate the investment amount at a given state.
 */
export function calcInvestment(
  bank: number,
  eventsDone: number,
  winsSoFar: number,
  payout: number,
  NE: number[][]
): number {
  const A = NE[eventsDone + 1][winsSoFar + 1]
  const B = NE[eventsDone + 1][winsSoFar]

  if (!A || !B || A === 0 || B === 0 || !isFinite(A) || !isFinite(B)) return 0

  const fraction = 1 - (payout * A) / (B + (payout - 1) * A)

  if (fraction <= 0 || !isFinite(fraction)) return 0

  return Math.min(bank * fraction, bank)
}

export type OpResult = 'win' | 'loss'

export interface MasanielloSimulation {
  steps: MasanielloStep[]
  currentBank: number
  maxBank: number
  winsSoFar: number
  lossesSoFar: number
  eventsDoneSoFar: number
  nextBet: number
  targetReached: boolean
  broke: boolean
  allDone: boolean
  profit: number
}

/**
 * Run a full Masaniello simulation with given results.
 */
export function simulateMasaniello(
  capital: number,
  totalOps: number,
  winsNeeded: number,
  payout: number,
  results: OpResult[]
): MasanielloSimulation | null {
  if (totalOps <= 0 || winsNeeded <= 0 || payout <= 1) return null
  if (winsNeeded > totalOps) return null

  const NE = buildCoefficientTable(totalOps, winsNeeded, payout)
  const steps: MasanielloStep[] = []
  let currentBank = capital
  let maxBank = capital
  let wCount = 0
  let lCount = 0
  let eCount = 0
  let broke = false
  let targetReached = false

  for (const result of results) {
    if (eCount >= totalOps || currentBank <= 0 || targetReached) break

    const invest = calcInvestment(currentBank, eCount, wCount, payout, NE)

    if (result === 'win') {
      currentBank = currentBank + invest * (payout - 1)
      wCount++
    } else {
      currentBank = currentBank - invest
      lCount++
    }

    if (currentBank > maxBank) maxBank = currentBank
    if (currentBank <= 0) broke = true

    const remainingWins = winsNeeded - wCount
    const remainingEvents = totalOps - (eCount + 1)
    targetReached = remainingWins <= 0

    eCount++

    steps.push({
      opNumber: eCount,
      betAmount: invest,
      ifWinCapital: currentBank, // already applied
      ifLoseCapital: result === 'loss' ? currentBank : currentBank - invest * (payout - 1) - invest + invest,
      ifWinReturn: invest * payout,
      winsNeeded: Math.max(0, remainingWins),
      opsRemaining: Math.max(0, remainingEvents),
    })
  }

  const nextBet =
    eCount < totalOps && currentBank > 0 && !targetReached
      ? calcInvestment(currentBank, eCount, wCount, payout, NE)
      : 0

  return {
    steps,
    currentBank,
    maxBank,
    winsSoFar: wCount,
    lossesSoFar: lCount,
    eventsDoneSoFar: eCount,
    nextBet,
    targetReached,
    broke,
    allDone: eCount >= totalOps || targetReached || broke,
    profit: currentBank - capital,
  }
}