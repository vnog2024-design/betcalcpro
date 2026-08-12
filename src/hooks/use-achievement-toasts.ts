'use client'

import { useEffect, useRef } from 'react'
import { useAppStore } from '@/store/app-store'
import { useToast } from '@/hooks/use-toast'
import { trackAchievement } from '@/lib/analytics'

/**
 * Watches for newly unlocked achievements and shows a toast.
 * Must be used once at the app root level.
 */
export function useAchievementToasts() {
  const achievements = useAppStore((s) => s.achievements)
  const { toast } = useToast()
  const previousRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    const currentIds = new Set(
      achievements.filter((a) => a.unlockedAt).map((a) => a.id)
    )

    // Find newly unlocked achievements (in current but not in previous)
    for (const id of currentIds) {
      if (!previousRef.current.has(id)) {
        const achievement = achievements.find((a) => a.id === id)
        if (achievement) {
          toast({
            title: `${achievement.icon} ${achievement.title}`,
            description: achievement.description,
          })
          trackAchievement(achievement.id, achievement.title)
        }
      }
    }

    previousRef.current = currentIds
  }, [achievements, toast])
}
