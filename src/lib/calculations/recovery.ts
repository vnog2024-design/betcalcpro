/**
 * Recovery Calculator — 3 strategies to recover losses.
 *
 * Flat:       fixed bet = bankroll * riskPct
 * Progressive: variable bet = currentBankroll * riskPct (grows with bankroll)
 * Aggressive:  target-oriented bet = min(recoveryTarget / (odds-1), bankroll * 0.5)
 *
 * Source: Standard loss recovery strategies in betting mathematics.
 */

export interface RecoveryStep {
  step: number
  bet: number
  bankrollAfterWin: number
  bankrollAfterLoss: number
  maxDrawdown: number
}

export interface StrategyResult {
  name: string
  steps: RecoveryStep[]
  finalBankroll: number
  totalSteps: number
  maxDrawdown: number
}

const MAX_STEPS = 100

function runRecovery(
  startBankroll: number,
  targetBankroll: number,
  odds: number,
  riskPct: number,
  mode: 'flat' | 'progressive' | 'aggressive'
): RecoveryStep[] {
  const steps: RecoveryStep[] = []
  let bankroll = startBankroll
  let maxDrawdown = 0

  for (let i = 0; i < MAX_STEPS; i++) {
    let bet: number

    if (mode === 'flat') {
      bet = startBankroll * riskPct
    } else if (mode === 'progressive') {
      bet = bankroll * riskPct
    } else {
      // Aggressive
      const remaining = targetBankroll - bankroll
      const recoveryTarget = remaining * riskPct * 2
      bet = Math.min(recoveryTarget / (odds - 1), bankroll * 0.5)
    }

    if (bet <= 0 || bet > bankroll) break

    const bankrollAfterWin = bankroll + bet * (odds - 1)
    const bankrollAfterLoss = bankroll - bet
    maxDrawdown = Math.max(maxDrawdown, startBankroll - Math.min(bankrollAfterLoss, bankroll))

    steps.push({
      step: i + 1,
      bet,
      bankrollAfterWin,
      bankrollAfterLoss,
      maxDrawdown,
    })

    bankroll = bankrollAfterWin
    if (bankroll >= targetBankroll) break
  }

  return steps
}

export function calculateRecoveryStrategies(
  currentBankroll: number,
  targetBankroll: number,
  odds: number,
  riskPercentage: number
): StrategyResult[] {
  if (
    currentBankroll <= 0 ||
    targetBankroll <= currentBankroll ||
    odds <= 1 ||
    riskPercentage <= 0 ||
    riskPercentage >= 1
  ) {
    return []
  }

  const modes: Array<{ name: string; mode: 'flat' | 'progressive' | 'aggressive' }> = [
    { name: 'Recuperação Plana', mode: 'flat' },
    { name: 'Recuperação Progressiva', mode: 'progressive' },
    { name: 'Recuperação Agressiva', mode: 'aggressive' },
  ]

  return modes.map(({ name, mode }) => {
    const steps = runRecovery(currentBankroll, targetBankroll, odds, riskPercentage, mode)
    const finalStep = steps[steps.length - 1]
    return {
      name,
      steps,
      finalBankroll: finalStep ? finalStep.bankrollAfterWin : currentBankroll,
      totalSteps: steps.length,
      maxDrawdown: steps.length > 0 ? Math.max(...steps.map((s) => s.maxDrawdown)) : 0,
    }
  })
}