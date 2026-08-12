/**
 * GA4 Event Tracking Utilities for BetCalc Pro.
 * Respects consent mode — only fires when analytics_storage is granted.
 */

/**
 * Track a custom GA4 event. Only fires if gtag is available and consent is granted.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === 'undefined') return
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  if (!gtag) return

  gtag('event', eventName, {
    ...params,
    event_category: 'engagement',
  })
}

/** Predefined event names for consistency */
export const Events = {
  // Tool usage
  TOOL_OPEN: 'tool_open',
  TOOL_CALCULATE: 'tool_calculate',
  TOOL_EXPORT: 'tool_export',
  TOOL_SHARE: 'tool_share',

  // Navigation
  ARTICLE_READ: 'article_read',
  NAVIGATE_FAQ: 'navigate_faq',
  NAVIGATE_CONTACT: 'navigate_contact',

  // Engagement
  THEME_CHANGE: 'theme_change',
  PWA_INSTALL_PROMPT: 'pwa_install_prompt',
  PWA_INSTALLED: 'pwa_installed',
  ACHIEVEMENT_UNLOCKED: 'achievement_unlocked',

  // Conversion
  NEWSLETTER_SUBSCRIBE: 'newsletter_subscribe',
  COOKIE_CONSENT_ACCEPT: 'cookie_consent_accept',
  COOKIE_CONSENT_REJECT: 'cookie_consent_reject',
} as const

/** Shorthand: track when a tool page is opened */
export function trackToolOpen(toolName: string) {
  trackEvent(Events.TOOL_OPEN, { tool_name: toolName })
}

/** Shorthand: track when a calculation is performed */
export function trackToolCalculate(toolName: string, params?: Record<string, string | number>) {
  trackEvent(Events.TOOL_CALCULATE, { tool_name: toolName, ...params })
}

/** Shorthand: track achievement unlock */
export function trackAchievement(achievementId: string, achievementTitle: string) {
  trackEvent(Events.ACHIEVEMENT_UNLOCKED, {
    achievement_id: achievementId,
    achievement_title: achievementTitle,
  })
}

/** Shorthand: track newsletter subscription */
export function trackNewsletterSubscribe(source: string) {
  trackEvent(Events.NEWSLETTER_SUBSCRIBE, { source })
}