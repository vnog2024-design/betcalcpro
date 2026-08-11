/**
 * Loss Recovery Calculator (percentage-based)
 *
 * Each step recovers a fraction of the loss:
 *   recoveryTarget = totalLoss * recoveryPercentage
 *   betAmount = recoveryTarget / (multiplier - 1)
 *   potentialRecovery = betAmount * (multiplier - 1)
 *   remainingLoss = totalLoss - cumulativeRecovery
 *
 * Source: Standard percentage-based loss recovery mathematics.
 */

export interface RecoveryStep {
  step: number
  betAmount: number
  potentialRecovery: number
  cumulativeRecovery: number
  remainingLoss: number
  recoveryPercent: number
}

export interface LossRecoveryResult {
  steps: RecoveryStep[]
  totalWagered: number
  totalSteps: number
  finalRecoveryPercent: number
}

const MAX_STEPS = 50

export function calculateLossRecovery(
  amountLost: number,
  recoveryPercentage: number,
  targetMultiplier: number
): LossRecoveryResult {
  if (amountLost <= 0 || recoveryPercentage <= 0 || recoveryPercentage > 1 || targetMultiplier <= 1) {
    return { steps: [], totalWagered: 0, totalSteps: 0, finalRecoveryPercent: 0 }
  }

  const steps: RecoveryStep[] = []
  let cumulativeRecovery = 0
  let remainingLoss = amountLost

  while (remainingLoss > 0.01 && steps.length < MAX_STEPS) {
    const recoveryTarget = amountLost * recoveryPercentage
    const betAmount = recoveryTarget / (targetMultiplier - 1)
    const potentialRecovery = betAmount * (targetMultiplier - 1)

    cumulativeRecovery += potentialRecovery
    remainingLoss = Math.max(0, amountLost - cumulativeRecovery)
    const recoveryPercent = Math.min(100, (cumulativeRecovery / amountLost) * 100)

    steps.push({
      step: steps.length + 1,
      betAmount,
      potentialRecovery,
      cumulativeRecovery,
      remainingLoss,
      recoveryPercent,
    })

    // If recovery target is too small relative to loss, it will loop forever
    // Check if we're making progress
    if (potentialRecovery <= 0) break
  }

  const totalWagered = steps.reduce((sum, s) => sum + s.betAmount, 0)
  const lastStep = steps[steps.length - 1]

  return {
    steps,
    totalWagered,
    totalSteps: steps.length,
    finalRecoveryPercent: lastStep ? lastStep.recoveryPercent : 0,
  }
}