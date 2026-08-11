/**
 * Soros Compounding Calculator
 *
 * At each step:
 *   grossProfit = bet * (multiplier - 1)
 *   protectedAmt = grossProfit * (1 - sorosPercentage)
 *   reinvestedAmt = grossProfit * sorosPercentage
 *   newWorkingCapital = bet + reinvestedAmt
 *
 * Source: George Soros-style compounding — protect a portion of profits,
 * reinvest the rest.
 */

export interface SorosStep {
  step: number
  bet: number
  grossProfit: number
  protectedAmount: number
  reinvestedAmount: number
  accumulatedProtected: number
  newWorkingCapital: number
  totalIfWin: number
  remainingIfLoss: number
  netResultIfLoss: number
}

export interface SorosResult {
  steps: SorosStep[]
  totalGrowth: number | null
  totalProfit: number
  worstCaseRemaining: number
  worstCaseNet: number
}

export function calculateSoros(
  initialBankroll: number,
  multiplier: number,
  sorosPercentage: number,
  numSteps: number
): SorosResult {
  const steps: SorosStep[] = []

  if (
    initialBankroll <= 0 ||
    multiplier <= 1 ||
    sorosPercentage <= 0 ||
    sorosPercentage > 1 ||
    numSteps <= 0
  ) {
    return { steps: [], totalGrowth: null, totalProfit: 0, worstCaseRemaining: 0, worstCaseNet: 0 }
  }

  let workingCapital = initialBankroll
  let accumulatedProtected = 0

  for (let i = 1; i <= numSteps; i++) {
    const bet = workingCapital
    const grossProfit = bet * (multiplier - 1)
    const protectedAmt = grossProfit * (1 - sorosPercentage)
    const reinvestedAmt = grossProfit * sorosPercentage
    const newWorkingCapital = bet + reinvestedAmt
    accumulatedProtected += protectedAmt
    const totalIfWin = newWorkingCapital + accumulatedProtected

    const remainingIfLoss = accumulatedProtected - protectedAmt
    const netResultIfLoss = remainingIfLoss - initialBankroll

    steps.push({
      step: i,
      bet,
      grossProfit,
      protectedAmount: protectedAmt,
      reinvestedAmount: reinvestedAmt,
      accumulatedProtected,
      newWorkingCapital,
      totalIfWin,
      remainingIfLoss,
      netResultIfLoss,
    })

    workingCapital = newWorkingCapital
  }

  const finalBankroll = steps.length > 0 ? steps[steps.length - 1].newWorkingCapital + steps[steps.length - 1].accumulatedProtected : initialBankroll
  const totalGrowth =
    initialBankroll > 0 && steps.length > 0
      ? ((finalBankroll - initialBankroll) / initialBankroll) * 100
      : null
  const totalProfit = finalBankroll - initialBankroll
  const worstCaseRemaining = steps.length > 0 ? steps[0].remainingIfLoss : 0
  const worstCaseNet = steps.length > 0 ? steps[0].netResultIfLoss : 0

  return { steps, totalGrowth, totalProfit, worstCaseRemaining, worstCaseNet }
}
