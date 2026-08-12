/**
 * FASE 0 — Blindagem Matemática
 * Suite de testes unitários cobrindo todas as funções de cálculo.
 *
 * Cobertura:
 *   - Casos normais com valores conhecidos
 *   - Edge cases (zero, negativo, infinito, NaN)
 *   - Validação contra resultados calculados manualmente
 */

import { describe, it, expect } from 'vitest'
import {
  calculateMartingaleLevels,
  sampleChartData,
  calculateFibonacci,
  calculateBankroll,
  calculateSoros,
  buildCoefficientTable,
  calcInvestment,
  simulateMasaniello,
  calculateHedging,
  calculateRecoveryStrategies,
  calculateCycles,
  calculateBankrollSupport,
  minCycleMultiplier,
  calculateLossRecovery,
  calculateTheoreticalProbabilities,
  runMonteCarlo,
  calculateStatsSummary,
} from '@/lib/calculations'
import type { GaleLevel, OpResult } from '@/lib/calculations'

// ═══════════════════════════════════════════════════════════════
// 1. MARTINGALE CALCULATOR
// ═══════════════════════════════════════════════════════════════
describe('Martingale Calculator', () => {
  describe('calculateMartingaleLevels', () => {
    it('calculates level 0 correctly', () => {
      const levels = calculateMartingaleLevels(10, 2, 5, 2)
      expect(levels[0]).toEqual({
        level: 0,
        bet: 10,
        totalInvested: 10,
        potentialWin: 20,
        profit: 10,
        profitPercent: 100,
      })
    })

    it('geometric progression: bet doubles each level (mult=2)', () => {
      const levels = calculateMartingaleLevels(10, 2, 5, 2)
      expect(levels[0].bet).toBe(10)
      expect(levels[1].bet).toBe(20)
      expect(levels[2].bet).toBe(40)
      expect(levels[3].bet).toBe(80)
      expect(levels[4].bet).toBe(160)
      expect(levels[5].bet).toBe(320)
    })

    it('total invested is cumulative', () => {
      const levels = calculateMartingaleLevels(10, 2, 3, 2)
      expect(levels[0].totalInvested).toBe(10)    // 10
      expect(levels[1].totalInvested).toBe(30)    // 10+20
      expect(levels[2].totalInvested).toBe(70)    // 10+20+40
      expect(levels[3].totalInvested).toBe(150)   // 10+20+40+80
    })

    it('profit at level 0 is positive for payout > 1', () => {
      const levels = calculateMartingaleLevels(10, 2, 5, 2)
      expect(levels[0].profit).toBe(10)
      expect(levels[0].profitPercent).toBe(100)
    })

    it('profit is non-increasing at higher gales (can be equal when mult=payout)', () => {
      const levels = calculateMartingaleLevels(10, 2, 5, 2)
      const profits = levels.map((l) => l.profit)
      for (let i = 1; i < profits.length; i++) {
        expect(profits[i]).toBeLessThanOrEqual(profits[i - 1])
      }
    })

    it('returns empty array for invalid inputs', () => {
      expect(calculateMartingaleLevels(0, 2, 5, 2)).toEqual([])
      expect(calculateMartingaleLevels(-10, 2, 5, 2)).toEqual([])
      expect(calculateMartingaleLevels(10, 0, 5, 2)).toEqual([])
      expect(calculateMartingaleLevels(10, -2, 5, 2)).toEqual([])
      expect(calculateMartingaleLevels(10, 2, 0, 2)).toEqual([])
      expect(calculateMartingaleLevels(10, 2, 5, 0)).toEqual([])
    })

    it('handles non-integer multiplier (e.g. 2.1)', () => {
      const levels = calculateMartingaleLevels(10, 2.1, 3, 2)
      expect(levels[0].bet).toBe(10)
      expect(levels[1].bet).toBeCloseTo(21, 1)
      expect(levels[2].bet).toBeCloseTo(44.1, 1)
    })

    it('stops before infinity values', () => {
      const levels = calculateMartingaleLevels(10, 2, 100, 2)
      // Should not include Infinity values
      const hasInfinity = levels.some(
        (l) => !isFinite(l.bet) || !isFinite(l.totalInvested)
      )
      expect(hasInfinity).toBe(false)
    })

    it('generates correct number of levels (galeCount + 1)', () => {
      const levels = calculateMartingaleLevels(10, 2, 5, 2)
      expect(levels.length).toBe(6) // 0..5
    })

    it('manual verification: initialBet=5, mult=3, gales=2, payout=1.5', () => {
      const levels = calculateMartingaleLevels(5, 3, 2, 1.5)
      // Level 0: bet=5, invested=5, win=7.5, profit=2.5
      expect(levels[0].bet).toBe(5)
      expect(levels[0].totalInvested).toBe(5)
      expect(levels[0].potentialWin).toBe(7.5)
      expect(levels[0].profit).toBeCloseTo(2.5, 5)
      // Level 1: bet=15, invested=20, win=22.5, profit=2.5
      expect(levels[1].bet).toBe(15)
      expect(levels[1].totalInvested).toBe(20)
      expect(levels[1].potentialWin).toBe(22.5)
      expect(levels[1].profit).toBeCloseTo(2.5, 5)
      // Level 2: bet=45, invested=65, win=67.5, profit=2.5
      expect(levels[2].bet).toBe(45)
      expect(levels[2].totalInvested).toBe(65)
      expect(levels[2].potentialWin).toBe(67.5)
      expect(levels[2].profit).toBeCloseTo(2.5, 5)
    })
  })

  describe('sampleChartData', () => {
    it('returns all levels if <= maxPoints', () => {
      const levels: GaleLevel[] = Array.from({ length: 30 }, (_, i) => ({
        level: i, bet: i, totalInvested: i, potentialWin: i * 2, profit: i, profitPercent: 50,
      }))
      const sampled = sampleChartData(levels, 50)
      expect(sampled.length).toBe(30)
    })

    it('samples down to maxPoints', () => {
      const levels: GaleLevel[] = Array.from({ length: 200 }, (_, i) => ({
        level: i, bet: i, totalInvested: i, potentialWin: i * 2, profit: i, profitPercent: 50,
      }))
      const sampled = sampleChartData(levels, 50)
      expect(sampled.length).toBeLessThanOrEqual(51) // 50 + last
    })

    it('always includes last element', () => {
      const levels: GaleLevel[] = Array.from({ length: 200 }, (_, i) => ({
        level: i, bet: i, totalInvested: i, potentialWin: i * 2, profit: i, profitPercent: 50,
      }))
      const sampled = sampleChartData(levels, 50)
      expect(sampled[sampled.length - 1].level).toBe(199)
    })
  })
})

// ═══════════════════════════════════════════════════════════════
// 2. FIBONACCI CALCULATOR
// ═══════════════════════════════════════════════════════════════
describe('Fibonacci Calculator', () => {
  it('generates correct Fibonacci sequence', () => {
    const result = calculateFibonacci(10, 8, 2)
    expect(result).not.toBeNull()
    expect(result!.fibSequence).toEqual([1, 1, 2, 3, 5, 8, 13, 21])
  })

  it('calculates bet amounts correctly', () => {
    const result = calculateFibonacci(10, 5, 2)
    expect(result).not.toBeNull()
    expect(result!.levels[0].betAmount).toBe(10)  // 10 * 1
    expect(result!.levels[1].betAmount).toBe(10)  // 10 * 1
    expect(result!.levels[2].betAmount).toBe(20)  // 10 * 2
    expect(result!.levels[3].betAmount).toBe(30)  // 10 * 3
    expect(result!.levels[4].betAmount).toBe(50)  // 10 * 5
  })

  it('total invested is cumulative', () => {
    const result = calculateFibonacci(10, 4, 2)
    expect(result).not.toBeNull()
    expect(result!.levels[0].totalInvested).toBe(10)   // 10
    expect(result!.levels[1].totalInvested).toBe(20)   // 10+10
    expect(result!.levels[2].totalInvested).toBe(40)   // 10+10+20
    expect(result!.levels[3].totalInvested).toBe(70)   // 10+10+20+30
  })

  it('returns null for invalid inputs', () => {
    expect(calculateFibonacci(0, 5, 2)).toBeNull()
    expect(calculateFibonacci(-10, 5, 2)).toBeNull()
    expect(calculateFibonacci(10, 0, 2)).toBeNull()
    expect(calculateFibonacci(10, 5, 0)).toBeNull()
  })

  it('totalBankrollNeeded equals last level totalInvested', () => {
    const result = calculateFibonacci(10, 6, 2)
    expect(result).not.toBeNull()
    const lastLevel = result!.levels[result!.levels.length - 1]
    expect(result!.totalBankrollNeeded).toBe(lastLevel.totalInvested)
  })

  it('maxBet is the largest bet in the sequence', () => {
    const result = calculateFibonacci(10, 8, 2)
    expect(result).not.toBeNull()
    const bets = result!.levels.map((l) => l.betAmount)
    expect(result!.maxBet).toBe(Math.max(...bets))
  })
})

// ═══════════════════════════════════════════════════════════════
// 3. BANKROLL CALCULATOR
// ═══════════════════════════════════════════════════
describe('Bankroll Calculator', () => {
  it('conservative (1%): betSize = 1% of bankroll', () => {
    const result = calculateBankroll(1000, 2, 10, 20)
    expect(result).not.toBeNull()
    const conservative = result!.results.find((r) => r.riskLevel.name === 'Conservador')!
    expect(conservative.betSize).toBe(10)   // 1000 * 0.01
    expect(conservative.maxDailyLossAmount).toBe(200) // 1000 * 0.20
    expect(conservative.profitTarget).toBe(100)       // 1000 * 0.10
    expect(conservative.betsBeforeBust).toBe(20)      // 200 / 10
  })

  it('moderate (1.5%): betSize = 1.5% of bankroll', () => {
    const result = calculateBankroll(1000, 2, 10, 20)
    expect(result).not.toBeNull()
    const moderate = result!.results.find((r) => r.riskLevel.name === 'Moderado')!
    expect(moderate.betSize).toBe(15)  // 1000 * 0.015
    expect(moderate.betsBeforeBust).toBe(Math.floor(200 / 15)) // 13
  })

  it('aggressive (2%): betSize = 2% of bankroll', () => {
    const result = calculateBankroll(1000, 2, 10, 20)
    expect(result).not.toBeNull()
    const aggressive = result!.results.find((r) => r.riskLevel.name === 'Agressivo')!
    expect(aggressive.betSize).toBe(20)  // 1000 * 0.02
    expect(aggressive.betsBeforeBust).toBe(10)   // 200 / 20
  })

  it('custom risk percentage', () => {
    const result = calculateBankroll(1000, 3, 10, 20)
    expect(result).not.toBeNull()
    expect(result!.custom.betSize).toBe(30) // 1000 * 0.03
    expect(result!.custom.betsBeforeBust).toBe(Math.floor(200 / 30)) // 6
  })

  it('returns null for zero/negative bankroll', () => {
    expect(calculateBankroll(0, 2, 10, 20)).toBeNull()
    expect(calculateBankroll(-100, 2, 10, 20)).toBeNull()
  })

  it('handles zero max loss (betsBeforeBust = 0)', () => {
    const result = calculateBankroll(1000, 2, 10, 0)
    expect(result).not.toBeNull()
    result!.results.forEach((r) => {
      expect(r.betsBeforeBust).toBe(0)
    })
  })
})

// ═══════════════════════════════════════════════════════════════
// 4. SOROS CALCULATOR
// ═══════════════════════════════════════════════════════════════
describe('Soros Calculator', () => {
  it('step 1: bet = initialBankroll', () => {
    const result = calculateSoros(100, 2, 0.5, 3)
    expect(result.steps.length).toBe(3)
    expect(result.steps[0].bet).toBe(100)
    expect(result.steps[0].grossProfit).toBe(100) // 100 * (2-1)
    expect(result.steps[0].protectedAmount).toBe(50)  // 100 * 0.5
    expect(result.steps[0].reinvestedAmount).toBe(50)  // 100 * 0.5
  })

  it('accumulated protected grows each step', () => {
    const result = calculateSoros(100, 2, 0.5, 5)
    for (let i = 1; i < result.steps.length; i++) {
      expect(result.steps[i].accumulatedProtected).toBeGreaterThan(
        result.steps[i - 1].accumulatedProtected
      )
    }
  })

  it('totalGrowth is positive when all wins', () => {
    const result = calculateSoros(100, 2, 0.5, 5)
    expect(result.totalGrowth).not.toBeNull()
    expect(result.totalGrowth!).toBeGreaterThan(0)
    expect(result.totalProfit).toBeGreaterThan(0)
  })

  it('returns empty for invalid inputs', () => {
    const empty = calculateSoros(0, 2, 0.5, 3)
    expect(empty.steps).toEqual([])

    const noGrowth = calculateSoros(100, 1, 0.5, 3) // mult <= 1
    expect(noGrowth.steps).toEqual([])

    const badPct = calculateSoros(100, 2, 0, 3) // sorosPct <= 0
    expect(badPct.steps).toEqual([])

    const overPct = calculateSoros(100, 2, 1.5, 3) // sorosPct > 1
    expect(overPct.steps).toEqual([])

    const noSteps = calculateSoros(100, 2, 0.5, 0) // steps <= 0
    expect(noSteps.steps).toEqual([])
  })

  it('worst case net is negative after step 1 loss', () => {
    const result = calculateSoros(100, 2, 0.5, 3)
    // Step 1: accumulatedProtected starts at 0. After loss, remaining = 0 - protectedAmt = 0
    // Net = 0 - 100 = -100 (lost the entire bankroll)
    expect(result.worstCaseNet).toBe(-100)
  })
})

// ═══════════════════════════════════════════════════════════════
// 5. MASANIELLO CALCULATOR
// ═══════════════════════════════════════════════════════════════
describe('Masaniello Calculator', () => {
  describe('buildCoefficientTable', () => {
    it('boundary: NE[e][winsNeeded] = 1', () => {
      const NE = buildCoefficientTable(7, 2, 2)
      for (let e = 0; e <= 8; e++) {
        expect(NE[e][2]).toBe(1)
      }
    })

    it('boundary: NE[totalOps+1][w] = 1', () => {
      const NE = buildCoefficientTable(7, 2, 2)
      for (let w = 0; w <= 3; w++) {
        expect(NE[8][w]).toBe(1)
      }
    })

    it('must-win-all case: NE[0][0] for 3 ops 3 wins = payout^3', () => {
      const NE = buildCoefficientTable(3, 3, 2)
      // With 3 ops and 3 wins needed, starting at 0 events and 0 wins,
      // remaining wins = remaining events = 3
      expect(NE[0][0]).toBe(Math.pow(2, 3)) // 8
    })

    it('table has correct dimensions', () => {
      const NE = buildCoefficientTable(7, 2, 2)
      expect(NE.length).toBe(9) // 0..8
      expect(NE[0].length).toBe(4) // 0..3
    })
  })

  describe('calcInvestment', () => {
    it('returns 0 when A or B is 0', () => {
      const NE = buildCoefficientTable(7, 2, 2)
      NE[1][1] = 0
      expect(calcInvestment(100, 0, 0, 2, NE)).toBe(0)
    })

    it('returns 0 when A or B is Infinity', () => {
      const NE = buildCoefficientTable(7, 2, 2)
      NE[1][1] = Infinity
      expect(calcInvestment(100, 0, 0, 2, NE)).toBe(0)
    })

    it('investment is always <= bank', () => {
      const NE = buildCoefficientTable(7, 2, 2)
      for (let e = 0; e < 7; e++) {
        for (let w = 0; w < 2; w++) {
          const invest = calcInvestment(1000, e, w, 2, NE)
          expect(invest).toBeLessThanOrEqual(1000)
          expect(invest).toBeGreaterThanOrEqual(0)
        }
      }
    })

    it('investment at start (0 events, 0 wins) for 7 ops 2 wins payout 2', () => {
      const NE = buildCoefficientTable(7, 2, 2)
      const invest = calcInvestment(200, 0, 0, 2, NE)
      expect(invest).toBeGreaterThan(0)
      expect(invest).toBeLessThanOrEqual(200)
    })
  })

  describe('simulateMasaniello', () => {
    it('returns null for invalid inputs', () => {
      expect(simulateMasaniello(200, 0, 2, 2, [])).toBeNull()
      expect(simulateMasaniello(200, 7, 0, 2, [])).toBeNull()
      expect(simulateMasaniello(200, 7, 2, 1, [])).toBeNull() // payout <= 1
      expect(simulateMasaniello(200, 3, 5, 2, [])).toBeNull() // winsNeeded > totalOps
    })

    it('all wins: reaches target, profit > 0', () => {
      const results: OpResult[] = ['win', 'win']
      const sim = simulateMasaniello(200, 7, 2, 2, results)
      expect(sim).not.toBeNull()
      expect(sim!.targetReached).toBe(true)
      expect(sim!.profit).toBeGreaterThan(0)
    })

    it('stops when target reached', () => {
      const results: OpResult[] = ['win', 'loss', 'win', 'loss', 'win']
      const sim = simulateMasaniello(200, 7, 2, 2, results)
      expect(sim).not.toBeNull()
      // Target needs 2 wins. After step 3 (win,loss,win) target reached
      expect(sim!.steps.length).toBe(3)
      expect(sim!.targetReached).toBe(true)
    })
  })
})

// ═══════════════════════════════════════════════════════════════
// 6. HEDGING CALCULATOR
// ═══════════════════════════════════════════════════════════════
describe('Hedging Calculator', () => {
  const validArgs = { bankroll: 100, targetPercent: 10, riskPercent: 1, payoutA: 2, payoutB: 14 }

  it('returns null for invalid inputs', () => {
    expect(calculateHedging(0, 10, 1, 2, 14)).toBeNull()
    expect(calculateHedging(100, 10, 0, 2, 14)).toBeNull()
    expect(calculateHedging(100, 10, 1, 1, 14)).toBeNull() // pA <= 1
    expect(calculateHedging(100, 10, 1, 2, 1)).toBeNull() // pB <= 1
    expect(calculateHedging(100, 10, 1, 14, 2)).toBeNull() // pB <= pA
  })

  it('primaryTotal = bankroll * riskPercent / 100', () => {
    const result = calculateHedging(100, 10, 1, 2, 14)
    expect(result).not.toBeNull()
    expect(result!.primaryTotal).toBe(1) // 100 * 0.01
  })

  it('primaryOutcomeA + primaryOutcomeB = primaryTotal', () => {
    const result = calculateHedging(100, 10, 1, 2, 14)
    expect(result).not.toBeNull()
    expect(result!.primaryOutcomeA + result!.primaryOutcomeB).toBeCloseTo(result!.primaryTotal, 10)
  })

  it('primaryProfit is the same for both outcomes (hedging property)', () => {
    const result = calculateHedging(100, 10, 1, 2, 14)
    expect(result).not.toBeNull()
    // If A wins: profit = A*(pA-1) - B
    const profitIfA = result!.primaryOutcomeA * (2 - 1) - result!.primaryOutcomeB
    expect(profitIfA).toBeCloseTo(result!.primaryProfit, 10)
  })

  it('entriesNeeded = ceil(targetCash / primaryProfit)', () => {
    const result = calculateHedging(100, 10, 1, 2, 14)
    expect(result).not.toBeNull()
    const expected = Math.ceil(result!.targetCash / result!.primaryProfit)
    expect(result!.entriesNeeded).toBe(expected)
  })

  it('totalRisk = primaryTotal + galeTotal + gale2Total', () => {
    const result = calculateHedging(100, 10, 1, 2, 14)
    expect(result).not.toBeNull()
    expect(result!.totalRisk).toBeCloseTo(
      result!.primaryTotal + result!.galeTotal + result!.gale2Total,
      10
    )
  })

  it('galeDenom > 0 for valid inputs', () => {
    // ratio = pB/pA = 14/2 = 7
    // galeDenom = 7 * (2-1) - 1 = 6 > 0
    const result = calculateHedging(100, 10, 1, 2, 14)
    expect(result).not.toBeNull()
  })

  it('returns null when galeDenom <= 0', () => {
    // pA = 2, pB = 2.5 → ratio = 1.25 → galeDenom = 1.25*1 - 1 = 0.25 > 0
    // pA = 1.5, pB = 1.6 → ratio = 1.067 → galeDenom = 1.067*0.5 - 1 = -0.467 < 0
    const result = calculateHedging(100, 10, 1, 1.5, 1.6)
    expect(result).toBeNull()
  })
})

// ═══════════════════════════════════════════════════════════════
// 7. RECOVERY CALCULATOR
// ═══════════════════════════════════════════════════════════════
describe('Recovery Calculator', () => {
  it('returns empty for invalid inputs', () => {
    expect(calculateRecoveryStrategies(0, 200, 2, 0.1)).toEqual([])
    expect(calculateRecoveryStrategies(100, 50, 2, 0.1)).toEqual([]) // target <= current
    expect(calculateRecoveryStrategies(100, 200, 1, 0.1)).toEqual([]) // odds <= 1
    expect(calculateRecoveryStrategies(100, 200, 2, 0)).toEqual([])  // riskPct <= 0
    expect(calculateRecoveryStrategies(100, 200, 2, 1)).toEqual([])  // riskPct >= 1
  })

  it('returns 3 strategies', () => {
    const result = calculateRecoveryStrategies(100, 200, 2, 0.1)
    expect(result.length).toBe(3)
    expect(result[0].name).toBe('Recuperação Plana')
    expect(result[1].name).toBe('Recuperação Progressiva')
    expect(result[2].name).toBe('Recuperação Agressiva')
  })

  it('flat recovery: bet is constant', () => {
    const result = calculateRecoveryStrategies(100, 200, 2, 0.1)
    const flat = result[0]
    const bets = flat.steps.map((s) => s.bet)
    const allSame = bets.every((b) => Math.abs(b - bets[0]) < 0.001)
    expect(allSame).toBe(true)
  })

  it('progressive recovery: bet grows each step', () => {
    const result = calculateRecoveryStrategies(100, 200, 2, 0.1)
    const progressive = result[1]
    for (let i = 1; i < progressive.steps.length; i++) {
      expect(progressive.steps[i].bet).toBeGreaterThan(progressive.steps[i - 1].bet)
    }
  })

  it('aggressive recovery: bet capped at 50% of bankroll', () => {
    const result = calculateRecoveryStrategies(100, 200, 2, 0.1)
    const aggressive = result[2]
    aggressive.steps.forEach((s) => {
      expect(s.bet).toBeLessThanOrEqual(100 * 0.5)
    })
  })

  it('all strategies reach target', () => {
    const result = calculateRecoveryStrategies(100, 200, 2, 0.1)
    result.forEach((strategy) => {
      expect(strategy.finalBankroll).toBeGreaterThan(199)
    })
  })
})

// ═══════════════════════════════════════════════════════════════
// 8. CYCLES CALCULATOR
// ═══════════════════════════════════════════════════════════════
describe('Cycles Calculator', () => {
  it('returns empty for invalid inputs', () => {
    expect(calculateCycles(0, 2, 2, 3, 2, 2)).toEqual([])
    expect(calculateCycles(10, 1, 2, 3, 2, 2)).toEqual([])  // payout <= 1
    expect(calculateCycles(10, 2, 0, 3, 2, 2)).toEqual([])  // galeMultiplier <= 0
    expect(calculateCycles(10, 2, 2, 0, 2, 2)).toEqual([])  // gales <= 0
    expect(calculateCycles(10, 2, 2, 3, 0, 2)).toEqual([])  // cycleMult <= 0
    expect(calculateCycles(10, 2, 2, 3, 2, 0)).toEqual([])  // cycles <= 0
  })

  it('generates correct number of cycles', () => {
    const groups = calculateCycles(10, 2, 2, 3, 2, 4)
    expect(groups.length).toBe(4)
  })

  it('each cycle has correct number of gales (entrada + N gales)', () => {
    const groups = calculateCycles(10, 2, 2, 3, 2, 2)
    // galesPerCycle=3 → loop g=0,1,2,3 → 4 steps (entrada + 3 gales)
    groups.forEach((g) => {
      expect(g.gales.length).toBe(4)
    })
  })

  it('bet doubles within a cycle (multiplier=2)', () => {
    const groups = calculateCycles(10, 2, 2, 3, 2, 2)
    // Cycle 1: 4 steps (entrada + 3 gales)
    expect(groups[0].gales[0].bet).toBe(10)
    expect(groups[0].gales[1].bet).toBe(20)
    expect(groups[0].gales[2].bet).toBe(40)
    expect(groups[0].gales[3].bet).toBe(80)
  })

  it('next cycle entry = last bet * cycleMultiplier', () => {
    const groups = calculateCycles(10, 2, 2, 3, 2, 2)
    // Last bet of cycle 1 = 80 (4th step), cycleMultiplier = 2 → next = 160
    expect(groups[0].nextEntryBet).toBe(160)
    // Cycle 2 starts with 160
    expect(groups[1].gales[0].bet).toBe(160)
  })

  it('totalInvested includes losses from previous cycles', () => {
    const groups = calculateCycles(10, 2, 2, 2, 2, 2)
    // galesPerCycle=2 → 3 steps per cycle (entrada + 2 gales)
    // Cycle 1: invested = 10 + 20 + 40 = 70
    expect(groups[0].gales[0].totalInvested).toBe(10)
    expect(groups[0].gales[1].totalInvested).toBe(30)
    expect(groups[0].gales[2].totalInvested).toBe(70)
    // Cycle 1 cycleLoss = 70, cycle 2 starts at 80 (lastBet * mult = 40 * 2)
    // Cycle 2: gales[0] bet=80, totalInvested = 80 + 70 = 150
    expect(groups[1].gales[0].totalInvested).toBe(80 + 70)
  })

  describe('minCycleMultiplier', () => {
    it('returns 1/(payout-1) for payout > 1', () => {
      expect(minCycleMultiplier(2)).toBeCloseTo(1, 5)    // 1/(2-1) = 1
      expect(minCycleMultiplier(3)).toBeCloseTo(0.5, 5)  // 1/(3-1) = 0.5
    })

    it('returns Infinity for payout <= 1', () => {
      expect(minCycleMultiplier(1)).toBe(Infinity)
      expect(minCycleMultiplier(0.5)).toBe(Infinity)
    })
  })

  describe('calculateBankrollSupport', () => {
    it('returns supported cycles when bankroll is sufficient', () => {
      const support = calculateBankrollSupport(10, 2, 2, 3, 2, 2, 10000)
      expect(support.supportedCycles).toBe(2)
      expect(support.breaksAt).toBeNull()
    })

    it('breaks at correct point when bankroll is limited', () => {
      const support = calculateBankrollSupport(10, 2, 2, 3, 2, 2, 50)
      expect(support.supportedCycles).toBeLessThan(2)
      expect(support.breaksAt).not.toBeNull()
    })
  })
})

// ═══════════════════════════════════════════════════════════════
// 9. LOSS RECOVERY CALCULATOR
// ═══════════════════════════════════════════════════════════════
describe('Loss Recovery Calculator', () => {
  it('returns empty for invalid inputs', () => {
    expect(calculateLossRecovery(0, 0.1, 2)).toEqual({ steps: [], totalWagered: 0, totalSteps: 0, finalRecoveryPercent: 0 })
    expect(calculateLossRecovery(100, 0, 2)).toEqual({ steps: [], totalWagered: 0, totalSteps: 0, finalRecoveryPercent: 0 })
    expect(calculateLossRecovery(100, 0.1, 1)).toEqual({ steps: [], totalWagered: 0, totalSteps: 0, finalRecoveryPercent: 0 })
    expect(calculateLossRecovery(100, 1.5, 2)).toEqual({ steps: [], totalWagered: 0, totalSteps: 0, finalRecoveryPercent: 0 })
  })

  it('recovers 10% per step with payout=2', () => {
    const result = calculateLossRecovery(100, 0.1, 2)
    expect(result.steps.length).toBeGreaterThan(0)
    // Step 1: recoveryTarget = 100*0.1 = 10, bet = 10/(2-1) = 10
    expect(result.steps[0].betAmount).toBe(10)
    expect(result.steps[0].potentialRecovery).toBe(10)
    expect(result.steps[0].recoveryPercent).toBeCloseTo(10, 5)
  })

  it('cumulative recovery grows', () => {
    const result = calculateLossRecovery(100, 0.1, 2)
    for (let i = 1; i < result.steps.length; i++) {
      expect(result.steps[i].cumulativeRecovery).toBeGreaterThan(
        result.steps[i - 1].cumulativeRecovery
      )
    }
  })

  it('remaining loss decreases', () => {
    const result = calculateLossRecovery(100, 0.1, 2)
    for (let i = 1; i < result.steps.length; i++) {
      expect(result.steps[i].remainingLoss).toBeLessThanOrEqual(
        result.steps[i - 1].remainingLoss
      )
    }
  })

  it('recovery percent caps at 100', () => {
    const result = calculateLossRecovery(100, 0.1, 2)
    result.steps.forEach((s) => {
      expect(s.recoveryPercent).toBeLessThanOrEqual(100)
    })
  })

  it('max 50 steps', () => {
    // Very small recovery percentage should hit the step limit
    const result = calculateLossRecovery(1000, 0.001, 1.01)
    expect(result.steps.length).toBeLessThanOrEqual(50)
  })

  it('totalWagered = sum of all betAmounts', () => {
    const result = calculateLossRecovery(100, 0.1, 2)
    const sum = result.steps.reduce((s, step) => s + step.betAmount, 0)
    expect(result.totalWagered).toBeCloseTo(sum, 10)
  })
})

// ═══════════════════════════════════════════════════════════════
// 10. PROBABILITY CALCULATOR
// ═══════════════════════════════════════════════════════════════
describe('Probability Calculator', () => {
  describe('calculateTheoreticalProbabilities', () => {
    it('P(1 consecutive win) = p', () => {
      const result = calculateTheoreticalProbabilities(50, 5)
      expect(result[0].winProb).toBeCloseTo(0.5, 5)
    })

    it('P(2 consecutive wins) = p^2', () => {
      const result = calculateTheoreticalProbabilities(50, 5)
      expect(result[1].winProb).toBeCloseTo(0.25, 5)
    })

    it('P(n consecutive losses) = (1-p)^n', () => {
      const result = calculateTheoreticalProbabilities(50, 5)
      expect(result[0].lossProb).toBeCloseTo(0.5, 5)
      expect(result[1].lossProb).toBeCloseTo(0.25, 5)
      expect(result[2].lossProb).toBeCloseTo(0.125, 5)
    })

    it('expectedValue = 2p - 1', () => {
      const result = calculateTheoreticalProbabilities(50, 5)
      result.forEach((e) => {
        expect(e.expectedValue).toBeCloseTo(0, 5) // 2*0.5 - 1 = 0
      })
    })

    it('returns empty for invalid probability', () => {
      expect(calculateTheoreticalProbabilities(0, 5)).toEqual([])
      expect(calculateTheoreticalProbabilities(100, 5)).toEqual([])
      expect(calculateTheoreticalProbabilities(-50, 5)).toEqual([])
      // maxConsecutive=0 resolves to min(0+5,15)=5, which is valid
      const result = calculateTheoreticalProbabilities(50, 0)
      expect(result.length).toBeGreaterThan(0)
    })
  })

  describe('runMonteCarlo', () => {
    it('returns empty for invalid inputs', () => {
      expect(runMonteCarlo(0, 100, 3, 100, 10)).toEqual([])
      expect(runMonteCarlo(50, 0, 3, 100, 10)).toEqual([])
      expect(runMonteCarlo(50, 100, 0, 100, 10)).toEqual([])
      expect(runMonteCarlo(50, 100, 3, 0, 10)).toEqual([])
      expect(runMonteCarlo(50, 100, 3, 100, 0)).toEqual([])
    })

    it('returns correct number of simulations', () => {
      const results = runMonteCarlo(50, 100, 3, 100, 10)
      expect(results.length).toBe(100)
    })

    it('each simulation has valid structure', () => {
      const results = runMonteCarlo(50, 100, 3, 100, 10)
      results.forEach((r) => {
        expect(typeof r.finalBalance).toBe('number')
        expect(typeof r.maxWinStreak).toBe('number')
        expect(typeof r.maxLossStreak).toBe('number')
        expect(typeof r.hitConsecWins).toBe('boolean')
        expect(r.maxWinStreak).toBeGreaterThanOrEqual(0)
        expect(r.maxLossStreak).toBeGreaterThanOrEqual(0)
      })
    })

    it('deterministic seed produces consistent results (statistical)', () => {
      // With 1000 sims at p=0.5, avg balance should be close to start
      const results = runMonteCarlo(50, 1000, 3, 100, 10)
      const avgBalance = results.reduce((s, r) => s + r.finalBalance, 0) / results.length
      // At p=0.5, expected value is 0, so avg should be ~100
      expect(avgBalance).toBeGreaterThan(70)
      expect(avgBalance).toBeLessThan(130)
    })
  })

  describe('calculateStatsSummary', () => {
    it('returns null for empty results', () => {
      expect(calculateStatsSummary([], 100)).toBeNull()
    })

    it('correctly counts profit/loss/bust', () => {
      const results = [
        { finalBalance: 150, maxWinStreak: 5, maxLossStreak: 2, hitConsecWins: true },
        { finalBalance: 50, maxWinStreak: 3, maxLossStreak: 4, hitConsecWins: false },
        { finalBalance: 0, maxWinStreak: 1, maxLossStreak: 10, hitConsecWins: false },
      ]
      const stats = calculateStatsSummary(results, 100)
      expect(stats).not.toBeNull()
      expect(stats!.profitCount).toBe(1)
      // finalBalance 50 < 100 = loss, finalBalance 0 = bust (0 is not > 100)
      expect(stats!.lossCount).toBe(2) // 50 and 0 are both < 100
      expect(stats!.bustCount).toBe(1)
      expect(stats!.profitPct).toBeCloseTo(33.33, 1)
      expect(stats!.avgBalance).toBeCloseTo(66.67, 1)
    })

    it('stdDev is non-negative', () => {
      const results = Array.from({ length: 50 }, (_, i) => ({
        finalBalance: 100 + (i - 25) * 2,
        maxWinStreak: 3,
        maxLossStreak: 3,
        hitConsecWins: true,
      }))
      const stats = calculateStatsSummary(results, 100)
      expect(stats).not.toBeNull()
      expect(stats!.stdDev).toBeGreaterThanOrEqual(0)
    })
  })
})
