import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ToolPage = 
  | 'home'
  | 'martingale'
  | 'bankroll'
  | 'crash-simulator'
  | 'double-simulator'
  | 'fibonacci'
  | 'masaniello'
  | 'loss-recovery'
  | 'soros'
  | 'recovery'
  | 'sequence-analyzer'
  | 'probability-simulator'
  | 'strategy-generator'
  | 'user-panel'
  | 'privacy'
  | 'terms'
  | 'responsible-gaming'
  | 'contact'
  | 'about'
  | 'cookies'

export interface CalculationHistory {
  id: string
  tool: string
  params: Record<string, unknown>
  result: Record<string, unknown>
  timestamp: number
}

export interface FavoriteTool {
  id: string
  toolId: ToolPage
  addedAt: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: number
}

interface AppState {
  currentPage: ToolPage
  sidebarOpen: boolean
  setCurrentPage: (page: ToolPage) => void
  setSidebarOpen: (open: boolean) => void
  calculationHistory: CalculationHistory[]
  addHistory: (entry: CalculationHistory) => void
  clearHistory: () => void
  favorites: FavoriteTool[]
  addFavorite: (toolId: ToolPage) => void
  removeFavorite: (toolId: ToolPage) => void
  isFavorite: (toolId: ToolPage) => boolean
  achievements: Achievement[]
  unlockAchievement: (id: string) => void
  userName: string | null
  userEmail: string | null
  isLoggedIn: boolean
  setUser: (name: string, email: string) => void
  logout: () => void
  theme: 'dark' | 'light'
  setTheme: (theme: 'dark' | 'light') => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentPage: 'home',
      sidebarOpen: false,
      setCurrentPage: (page) => set({ currentPage: page, sidebarOpen: false }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      calculationHistory: [],
      addHistory: (entry) =>
        set((state) => ({
          calculationHistory: [entry, ...state.calculationHistory].slice(0, 100),
        })),
      clearHistory: () => set({ calculationHistory: [] }),
      favorites: [],
      addFavorite: (toolId) =>
        set((state) => ({
          favorites: [...state.favorites, { id: toolId, toolId, addedAt: Date.now() }],
        })),
      removeFavorite: (toolId) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f.toolId !== toolId),
        })),
      isFavorite: (toolId) => get().favorites.some((f) => f.toolId === toolId),
      achievements: [
        { id: 'first-calc', title: 'Primeiro Cálculo', description: 'Realize seu primeiro cálculo', icon: '🎯' },
        { id: 'martingale-master', title: 'Mestre Martingale', description: 'Use a calculadora Martingale 10 vezes', icon: '🏆' },
        { id: 'explorer', title: 'Explorador', description: 'Use 5 ferramentas diferentes', icon: '🧭' },
        { id: 'high-roller', title: 'High Roller', description: 'Calcule uma banca acima de R$10.000', icon: '💰' },
        { id: 'strategist', title: 'Estrategista', description: 'Salve 3 estratégias', icon: '🧠' },
        { id: 'veteran', title: 'Veterano', description: 'Realize 50 cálculos', icon: '⭐' },
      ],
      unlockAchievement: (id) =>
        set((state) => ({
          achievements: state.achievements.map((a) =>
            a.id === id && !a.unlockedAt ? { ...a, unlockedAt: Date.now() } : a
          ),
        })),
      userName: null,
      userEmail: null,
      isLoggedIn: false,
      setUser: (name, email) => set({ userName: name, userEmail: email, isLoggedIn: true }),
      logout: () => set({ userName: null, userEmail: null, isLoggedIn: false }),
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'betcalc-storage',
      partialize: (state) => ({
        calculationHistory: state.calculationHistory,
        favorites: state.favorites,
        achievements: state.achievements,
        userName: state.userName,
        userEmail: state.userEmail,
        isLoggedIn: state.isLoggedIn,
        theme: state.theme,
      }),
    }
  )
)

export const toolInfo: Record<ToolPage, { name: string; description: string; icon: string; category: string }> = {
  home: { name: 'Início', description: 'Página principal', icon: 'Home', category: 'nav' },
  martingale: { name: 'Martingale', description: 'Calculadora Martingale com níveis ilimitados', icon: 'TrendingUp', category: 'calculators' },
  bankroll: { name: 'Gestão de Banca', description: 'Calcule sua banca ideal e gerencie riscos', icon: 'Wallet', category: 'calculators' },
  'crash-simulator': { name: 'Simulador Crash', description: 'Simule estratégias para jogos Crash', icon: 'Zap', category: 'simulators' },
  'double-simulator': { name: 'Simulador Double', description: 'Simule estratégias para jogos Double', icon: 'Dice5', category: 'simulators' },
  fibonacci: { name: 'Fibonacci', description: 'Calculadora de progressão Fibonacci', icon: 'BarChart3', category: 'calculators' },
  masaniello: { name: 'Masaniello', description: 'Calculadora Masaniello para gestão avançada', icon: 'Calculator', category: 'calculators' },
  'loss-recovery': { name: 'Recuperação Loss %', description: 'Calcule recuperação de perdas com percentual', icon: 'RotateCcw', category: 'calculators' },
  soros: { name: 'Soros', description: 'Calculadora de estratégia Soros', icon: 'Coins', category: 'calculators' },
  recovery: { name: 'Recuperação', description: 'Calculadora de recuperação de banca', icon: 'Shield', category: 'calculators' },
  'sequence-analyzer': { name: 'Analisador Sequência', description: 'Analise padrões em sequências de resultados', icon: 'Search', category: 'simulators' },
  'probability-simulator': { name: 'Simulador Probabilístico', description: 'Simule probabilidades e cenários', icon: 'Percent', category: 'simulators' },
  'strategy-generator': { name: 'Gerador Estratégias', description: 'Gere estratégias personalizadas', icon: 'Sparkles', category: 'simulators' },
  'user-panel': { name: 'Meu Painel', description: 'Seu painel pessoal', icon: 'User', category: 'nav' },
  'privacy': { name: 'Privacidade', description: 'Política de Privacidade', icon: 'Shield', category: 'legal' },
  'terms': { name: 'Termos', description: 'Termos de Uso', icon: 'FileText', category: 'legal' },
  'responsible-gaming': { name: 'Jogo Responsável', description: 'Compromisso com jogo responsável', icon: 'Heart', category: 'legal' },
  'contact': { name: 'Contato', description: 'Fale conosco', icon: 'Mail', category: 'legal' },
  'about': { name: 'Sobre Nós', description: 'Quem somos', icon: 'Info', category: 'legal' },
  'cookies': { name: 'Cookies', description: 'Política de Cookies', icon: 'Cookie', category: 'legal' },
}
