'use client'

import { AdBannerBottom, AdInContent, AdSidebar } from '@/components/ads/ad-unit'

// Re-export from centralized ad system
// These components use AD_SLOTS from ad-config.ts
// After AdSense approval, update the slots in src/components/ads/ad-config.ts

export { AdBannerBottom as AdBanner, AdInContent, AdSidebar }
