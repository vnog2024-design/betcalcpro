'use client'

import { useAppStore, type ToolPage } from '@/store/app-store'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Footer } from '@/components/layout/footer'
import { LandingPage } from '@/components/landing/landing-page'
import { MartingaleCalculator } from '@/components/tools/martingale-calculator'
import { BankrollCalculator } from '@/components/tools/bankroll-calculator'
import { CrashSimulator } from '@/components/tools/crash-simulator'
import { DoubleSimulator } from '@/components/tools/double-simulator'
import { FibonacciCalculator } from '@/components/tools/fibonacci-calculator'
import { MasanielloCalculator } from '@/components/tools/masaniello-calculator'
import { LossRecoveryCalculator } from '@/components/tools/loss-recovery-calculator'
import { SorosCalculator } from '@/components/tools/soros-calculator'
import { RecoveryCalculator } from '@/components/tools/recovery-calculator'
import { SequenceAnalyzer } from '@/components/tools/sequence-analyzer'
import { ProbabilitySimulator } from '@/components/tools/probability-simulator'
import { StrategyGenerator } from '@/components/tools/strategy-generator'
import { UserPanel } from '@/components/tools/user-panel'
import { AdBanner } from '@/components/shared/ad-banner'
import { Toaster } from '@/components/ui/toaster'

const toolComponents: Record<ToolPage, React.ComponentType> = {
  home: LandingPage,
  martingale: MartingaleCalculator,
  bankroll: BankrollCalculator,
  'crash-simulator': CrashSimulator,
  'double-simulator': DoubleSimulator,
  fibonacci: FibonacciCalculator,
  masaniello: MasanielloCalculator,
  'loss-recovery': LossRecoveryCalculator,
  soros: SorosCalculator,
  recovery: RecoveryCalculator,
  'sequence-analyzer': SequenceAnalyzer,
  'probability-simulator': ProbabilitySimulator,
  'strategy-generator': StrategyGenerator,
  'user-panel': UserPanel,
}

export default function Home() {
  const { currentPage, sidebarOpen, setSidebarOpen } = useAppStore()
  const CurrentComponent = toolComponents[currentPage] || LandingPage

  return (
    <div className="min-h-screen flex flex-col bg-background grid-pattern">
      <Header />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-h-0 overflow-y-auto">
          {/* Top ad banner */}
          <AdBanner slot="top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <CurrentComponent />
          </div>

          {/* Bottom ad banner */}
          <AdBanner slot="bottom" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4" />
        </main>
      </div>
      <Footer />
      <Toaster />
    </div>
  )
}
