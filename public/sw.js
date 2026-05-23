// BetCalc Pro Service Worker
// Only caches in production. In development (localhost), passes through all requests.

const IS_DEV = self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1'
const CACHE_NAME = 'betcalc-v4'
const APP_VERSION = 'v4' // bump this to force cache clear for all users

const STATIC_ASSETS = [
  '/manifest.json',
  '/logo-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/apple-touch-icon.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512-512.png',
]

// Install: only pre-cache static assets in production
self.addEventListener('install', (event) => {
  if (IS_DEV) {
    // In dev, skip caching entirely and take over immediately
    self.skipWaiting()
    return
  }
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  )
  self.skipWaiting()
})

// Activate: clean old caches and take control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

// Fetch: in dev mode, NEVER cache — always pass through to network
self.addEventListener('fetch', (event) => {
  const { request } = event

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Skip Chrome extension requests
  if (request.url.startsWith('chrome-extension://')) return

  // Skip external requests (AdSense, analytics, fonts CDN)
  if (request.url.includes('google') || request.url.includes('googlesyndication') || request.url.includes('fonts.googleapis.com') || request.url.includes('fonts.gstatic.com')) return

  // DEVELOPMENT: Always go to network, never cache
  if (IS_DEV) return

  // PRODUCTION: Smart caching strategies

  // Network first, cache fallback for navigation (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Only cache successful responses
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          }
          return response
        })
        .catch(() => caches.match('/'))
    )
    return
  }

  // Stale-while-revalidate for Next.js static chunks
  // This shows cached version immediately but updates cache in background
  if (request.url.includes('/_next/static/')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          }
          return response
        }).catch(() => cached)

        return cached || fetchPromise
      })
    )
    return
  }

  // Cache first for truly static assets (images, icons, manifest)
  if (
    request.url.includes('/logo') ||
    request.url.includes('/favicon') ||
    request.url.includes('/android-chrome') ||
    request.url.includes('/apple-touch-icon') ||
    request.url.includes('/manifest.json') ||
    request.url.includes('/og-image') ||
    request.url.includes('.png') ||
    request.url.includes('.jpg') ||
    request.url.includes('.svg') ||
    request.url.includes('.ico')
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          }
          return response
        })
      })
    )
    return
  }

  // Network first for everything else
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
        }
        return response
      })
      .catch(() => caches.match(request))
  )
})

// Listen for version check messages from the app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CHECK_VERSION') {
    event.source.postMessage({ type: 'SW_VERSION', version: APP_VERSION })
  }
  if (event.data && event.data.type === 'FORCE_UPDATE') {
    // Clear all caches and force reload
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))).then(() => {
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => client.postMessage({ type: 'UPDATE_DONE' }))
      })
    })
  }
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
