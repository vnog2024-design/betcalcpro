'use client'

import { useMemo } from 'react'
import { useAppStore, setCurrentPage, type ToolPage, toolInfo } from '@/store/app-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import {
  User, Trophy, Star, History, LogOut, Crown, Target, TrendingUp,
} from 'lucide-react'
import { AdInContent } from '@/components/shared/ad-banner'

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'agora'
  if (minutes < 60) return `${minutes}min atrás`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h atrás`
  const days = Math.floor(hours / 24)
  return `${days}d atrás`
}

export function UserPanel() {
  const {
    userName,
    userEmail,
    isLoggedIn,
    setUser,
    logout,
    calculationHistory,
    clearHistory,
    favorites,
    removeFavorite,
    achievements,
    setCurrentPage,
  } = useAppStore()

  // Stats
  const totalCalculations = calculationHistory.length

  const mostUsedTool = useMemo(() => {
    if (calculationHistory.length === 0) return null
    const counts: Record<string, number> = {}
    for (const entry of calculationHistory) {
      counts[entry.tool] = (counts[entry.tool] || 0) + 1
    }
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
    return sorted[0] ? { toolId: sorted[0][0], count: sorted[0][1] } : null
  }, [calculationHistory])

  const memberSince = useMemo(() => {
    if (calculationHistory.length === 0) return null
    const oldest = calculationHistory[calculationHistory.length - 1]
    return oldest?.timestamp ?? null
  }, [calculationHistory])

  const unlockedCount = achievements.filter((a) => a.unlockedAt).length
  const achievementProgress = achievements.length > 0 ? (unlockedCount / achievements.length) * 100 : 0

  const initials = useMemo(() => {
    if (!userName) return '??'
    return userName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }, [userName])

  const handleLogin = () => {
    setUser('Usuário Demo', 'demo@casinotools.com')
  }

  const handleLogout = () => {
    logout()
  }

  const getToolName = (toolId: string): string => {
    const key = toolId as ToolPage
    return toolInfo[key]?.name ?? toolId
  }

  const briefResult = (result: Record<string, unknown>): string => {
    const entries = Object.entries(result).slice(0, 2)
    if (entries.length === 0) return '—'
    return entries
      .map(([k, v]) => {
        const label = k.replace(/([A-Z])/g, ' $1').trim()
        const value = typeof v === 'number' ? `R$ ${v.toFixed(2)}` : String(v)
        return `${label}: ${value}`
      })
      .join(' | ')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <User className="h-7 w-7 text-neon" />
            Meu <span className="gradient-neon-text">Painel</span>
          </h1>
          <p className="text-base text-muted-foreground mt-1">
            Seu dashboard pessoal com histórico, conquistas e favoritos
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile + Stats */}
        <div className="lg:col-span-1 space-y-4">
          {/* Profile Section */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <User className="h-4 w-4 text-neon" /> Perfil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoggedIn ? (
                <div className="flex flex-col items-center gap-3">
                  <Avatar className="h-20 w-20 border-2 border-neon/50 neon-glow">
                    <AvatarFallback className="bg-neon/10 text-neon text-xl font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <p className="font-bold text-lg">{userName}</p>
                    <p className="text-sm text-muted-foreground">{userEmail}</p>
                  </div>
                  <Badge className="bg-neon/10 text-neon border-neon/20 text-[10px]">
                    <Crown className="h-3 w-3 mr-1" /> Membro
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full border-border/50 text-muted-foreground hover:text-red-400 hover:border-red-400/50 text-sm"
                  >
                    <LogOut className="h-3 w-3 mr-1" /> Sair
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Avatar className="h-20 w-20 border-2 border-border">
                    <AvatarFallback className="bg-muted/50 text-muted-foreground text-xl">
                      ??
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm text-muted-foreground text-center">
                    Faça login para salvar seu progresso e desbloquear conquistas
                  </p>
                  <Button
                    onClick={handleLogin}
                    className="w-full gradient-neon text-black font-bold text-sm"
                  >
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Login com Google
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats Overview */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-neon-blue" /> Estatísticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/30">
                  <div className="h-9 w-9 rounded-lg bg-neon/10 flex items-center justify-center shrink-0">
                    <Target className="h-4 w-4 text-neon" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground">Total de Cálculos</p>
                    <p className="text-xl font-black gradient-neon-text">{totalCalculations}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/30">
                  <div className="h-9 w-9 rounded-lg bg-neon-blue/10 flex items-center justify-center shrink-0">
                    <Star className="h-4 w-4 text-neon-blue" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground">Ferramenta Mais Usada</p>
                    <p className="text-base font-bold truncate">
                      {mostUsedTool ? getToolName(mostUsedTool.toolId) : '—'}
                    </p>
                    {mostUsedTool && (
                      <p className="text-[10px] text-muted-foreground">
                        {mostUsedTool.count} cálculos
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/30">
                  <div className="h-9 w-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Crown className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground">Membro Desde</p>
                    <p className="text-base font-bold">
                      {memberSince ? formatDate(memberSince) : '—'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Achievements + History + Favorites */}
        <div className="lg:col-span-2 space-y-4">
          {/* Achievements Section */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-500" /> Conquistas
                </CardTitle>
                <Badge className="bg-neon/10 text-neon border-neon/20 text-[10px]">
                  {unlockedCount}/{achievements.length}
                </Badge>
              </div>
              <div className="mt-2">
                <Progress value={achievementProgress} className="h-2 bg-muted/50 [&>[data-slot=progress-indicator]]:bg-neon" />
                <p className="text-[10px] text-muted-foreground mt-1">
                  {achievementProgress.toFixed(0)}% concluído
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {achievements.map((achievement) => {
                  const isUnlocked = !!achievement.unlockedAt
                  return (
                    <div
                      key={achievement.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                        isUnlocked
                          ? 'border-neon/30 bg-neon/5 neon-glow'
                          : 'border-border/30 bg-muted/10 opacity-60'
                      }`}
                    >
                      <div
                        className={`h-10 w-10 rounded-lg flex items-center justify-center text-xl shrink-0 ${
                          isUnlocked
                            ? 'bg-neon/10'
                            : 'bg-muted/30 grayscale'
                        }`}
                      >
                        {achievement.icon}
                      </div>
                      <div className="min-w-0">
                        <p
                          className={`text-sm font-bold ${
                            isUnlocked ? 'text-neon' : 'text-muted-foreground'
                          }`}
                        >
                          {achievement.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                          {achievement.description}
                        </p>
                        {isUnlocked && (
                          <p className="text-[9px] text-neon/70 mt-1">
                            Desbloqueada em {formatDate(achievement.unlockedAt!)}
                          </p>
                        )}
                        {!isUnlocked && (
                          <Badge variant="outline" className="mt-1 text-[9px] text-muted-foreground border-border/50">
                            Bloqueada
                          </Badge>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Favorites & History in a 2-column grid on larger screens */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {/* Favorites */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Star className="h-4 w-4 text-neon" /> Favoritos
                </CardTitle>
              </CardHeader>
              <CardContent>
                {favorites.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 py-6 text-center">
                    <Star className="h-8 w-8 text-muted-foreground/30" />
                    <p className="text-sm text-muted-foreground">
                      Nenhuma ferramenta favoritada
                    </p>
                    <p className="text-[10px] text-muted-foreground/70">
                      Favorite ferramentas para acessá-las rapidamente
                    </p>
                  </div>
                ) : (
                  <ScrollArea className="max-h-64">
                    <div className="space-y-2 pr-2">
                      {favorites.map((fav) => {
                        const info = toolInfo[fav.toolId]
                        return (
                          <div
                            key={fav.id}
                            className="flex items-center justify-between gap-2 p-2.5 rounded-lg border border-border/30 bg-muted/10 hover:bg-muted/20 transition-colors group"
                          >
                            <button
                              onClick={() => setCurrentPage(fav.toolId)}
                              className="flex items-center gap-2 min-w-0 flex-1 text-left"
                            >
                              <div className="h-7 w-7 rounded-md bg-neon/10 flex items-center justify-center shrink-0">
                                <Star className="h-3 w-3 text-neon fill-neon" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold truncate group-hover:text-neon transition-colors">
                                  {info?.name ?? fav.toolId}
                                </p>
                                <p className="text-[10px] text-muted-foreground truncate">
                                  {info?.description ?? ''}
                                </p>
                              </div>
                            </button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFavorite(fav.toolId)}
                              className="h-6 w-6 p-0 text-muted-foreground hover:text-red-400 shrink-0"
                            >
                              <span className="text-sm">×</span>
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>

            {/* Calculation History */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <History className="h-4 w-4 text-neon-blue" /> Histórico
                  </CardTitle>
                  {calculationHistory.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearHistory}
                      className="h-6 text-[10px] text-muted-foreground hover:text-red-400 px-2"
                    >
                      Limpar
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {calculationHistory.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 py-6 text-center">
                    <History className="h-8 w-8 text-muted-foreground/30" />
                    <p className="text-sm text-muted-foreground">
                      Nenhum cálculo realizado
                    </p>
                    <p className="text-[10px] text-muted-foreground/70">
                      Use as ferramentas para criar seu histórico
                    </p>
                  </div>
                ) : (
                  <ScrollArea className="max-h-64">
                    <div className="space-y-2 pr-2">
                      {calculationHistory.map((entry, idx) => (
                        <div key={entry.id}>
                          <div className="flex items-start gap-3 p-2.5 rounded-lg border border-border/30 bg-muted/10 hover:bg-muted/20 transition-colors">
                            <div className="h-7 w-7 rounded-md bg-neon-blue/10 flex items-center justify-center shrink-0">
                              <History className="h-3 w-3 text-neon-blue" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <p className="text-sm font-semibold truncate">
                                  {getToolName(entry.tool)}
                                </p>
                                <span className="text-[9px] text-muted-foreground whitespace-nowrap">
                                  {timeAgo(entry.timestamp)}
                                </span>
                              </div>
                              <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                                {briefResult(entry.result)}
                              </p>
                              <p className="text-[9px] text-muted-foreground/60 mt-0.5">
                                {formatDate(entry.timestamp)}
                              </p>
                            </div>
                          </div>
                          {idx < calculationHistory.length - 1 && (
                            <Separator className="my-1 bg-border/20" />
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>

          <AdInContent />

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="border-neon/20 bg-neon/5">
              <CardContent className="p-3 text-center">
                <Target className="h-4 w-4 text-neon mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">Cálculos</p>
                <p className="text-xl font-black gradient-neon-text">{totalCalculations}</p>
              </CardContent>
            </Card>
            <Card className="border-neon-blue/20 bg-neon-blue/5">
              <CardContent className="p-3 text-center">
                <Trophy className="h-4 w-4 text-neon-blue mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">Conquistas</p>
                <p className="text-xl font-black neon-text-blue">{unlockedCount}</p>
              </CardContent>
            </Card>
            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardContent className="p-3 text-center">
                <Star className="h-4 w-4 text-amber-500 mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">Favoritos</p>
                <p className="text-xl font-black text-amber-500">{favorites.length}</p>
              </CardContent>
            </Card>
            <Card className="border-purple-500/20 bg-purple-500/5">
              <CardContent className="p-3 text-center">
                <TrendingUp className="h-4 w-4 text-purple-400 mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">Progresso</p>
                <p className="text-xl font-black text-purple-400">{achievementProgress.toFixed(0)}%</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
