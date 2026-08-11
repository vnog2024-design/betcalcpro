/**
 * Pure calculation modules — extracted from UI components for testability.
 *
 * Each module contains ONLY mathematical logic, no React/state/UI.
 * UI components should import from here instead of inlining calculations.
 */

export { calculateMartingaleLevels, sampleChartData } from './martingale'
export type { GaleLevel } from './martingale'

export { calculateFibonacci } from './fibonacci'
export type { FibonacciLevel, FibonacciResult } from './fibonacci'

export { calculateBankroll } from './bankroll'
export type { BankrollResult, RiskLevel } from './bankroll'

export { calculateSoros } from './soros'
export type { SorosStep, SorosResult } from './soros'

export { buildCoefficientTable, calcInvestment, simulateMasaniello } from './masaniello'
export type { MasanielloStep, MasanielloSimulation, OpResult } from './masaniello'

export { calculateHedging } from './hedging'
export type { HedgingResult } from './hedging'

export { calculateRecoveryStrategies } from './recovery'
export type { RecoveryStep as RecoveryStrategyStep, StrategyResult } from './recovery'

export { calculateCycles, calculateBankrollSupport, minCycleMultiplier } from './cycles'
export type { CycleGale, CycleGroup, BankrollSupport } from './cycles'

export { calculateLossRecovery } from './loss-recovery'
export type { RecoveryStep as LossRecoveryStep, LossRecoveryResult } from './loss-recovery'

export { calculateTheoreticalProbabilities, runMonteCarlo, calculateStatsSummary } from './probability'
export type { ProbabilityEntry, SimulationRun, StatsSummary } from './probability'
