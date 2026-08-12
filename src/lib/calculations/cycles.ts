/**
 * Cycles Calculator — Martingale with cycle-based progression.
 *
 * Each cycle runs N gales of Martingale.
 * After a cycle loss, the entry bet for the next cycle is multiplied.
 *   cycleLoss = totalInvested at the last gale of the cycle
 *   nextEntryBet = lastBet * cycleMultiplier
 *
 * Source: Modified Martingale with cycle-based bankroll management.
 */

export interface CycleGale {
  gale: number
  bet: number
  cycleInvested: number
  totalInvested: number
  potentialReturn: number
  netProfit: number
}

export interface CycleGroup {
  cycle: number
  gales: CycleGale[]
  cycleLoss: number
  totalLossFromPrevCycles: number
  nextEntryBet: number
}

export interface BankrollSupport {
  supportedCycles: number
  breaksAt: { cycle: number; gale: number; totalInvested: number } | null
}

export function calculateCycles(
  initialBet: number,
  payout: number,
  galeMultiplier: number,
  galesPerCycle: number,
  cycleMultiplier: number,
  numCycles: number,
  bankrollLimit?: number
): CycleGroup[] {
  if (
    initialBet <= 0 ||
    payout <= 1 ||
    galeMultiplier <= 0 ||
    galesPerCycle <= 0 ||
    cycleMultiplier <= 0 ||
    numCycles <= 0
  ) {
    return []
  }

  const groups: CycleGroup[] = []
  let currentBet = initialBet
  let totalLossFromPrevCycles = 0

  for (let c = 1; c <= numCycles; c++) {
    const gales: CycleGale[] = []
    let cycleInvested = 0
    let lastBet = currentBet

    for (let g = 0; g <= galesPerCycle; g++) {
      cycleInvested += currentBet
      const potentialReturn = currentBet * payout
      const totalInvested = cycleInvested + totalLossFromPrevCycles
      const netProfit = potentialReturn - totalInvested

      gales.push({
        gale: g + 1,
        bet: currentBet,
        cycleInvested,
        totalInvested,
        potentialReturn,
        netProfit,
      })

      lastBet = currentBet
      currentBet *= galeMultiplier

      if (!isFinite(currentBet)) break
    }

    const cycleLoss = cycleInvested + totalLossFromPrevCycles
    const nextEntryBet = lastBet * cycleMultiplier

    groups.push({
      cycle: c,
      gales,
      cycleLoss,
      totalLossFromPrevCycles,
      nextEntryBet,
    })

    totalLossFromPrevCycles = cycleLoss
    currentBet = nextEntryBet

    if (!isFinite(currentBet)) break
  }

  return groups
}

/** Check how many cycles the bankroll can support */
export function calculateBankrollSupport(
  initialBet: number,
  payout: number,
  galeMultiplier: number,
  galesPerCycle: number,
  cycleMultiplier: number,
  numCycles: number,
  bankroll: number
): BankrollSupport {
  const groups = calculateCycles(
    initialBet, payout, galeMultiplier, galesPerCycle, cycleMultiplier, numCycles
  )

  for (const group of groups) {
    for (const gale of group.gales) {
      if (gale.totalInvested > bankroll) {
        return {
          supportedCycles: group.cycle - 1,
          breaksAt: { cycle: group.cycle, gale: gale.gale, totalInvested: gale.totalInvested },
        }
      }
    }
  }

  return { supportedCycles: groups.length, breaksAt: null }
}

/** Minimum cycle multiplier to theoretically recover */
export function minCycleMultiplier(payout: number): number {
  return payout > 1 ? 1 / (payout - 1) : Infinity
}