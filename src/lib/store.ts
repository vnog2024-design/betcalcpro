/**
 * Data store — simplified.
 * 
 * Posts and Ads: managed via Prisma (db.ts).
 * Admin password hash: stored via generic key-value (KV / filesystem fallback).
 * 
 * To set up Vercel KV (recommended for production):
 * 1. Go to Vercel Dashboard > Storage > Create Database > KV
 * 2. Set KV_REST_API_URL and KV_REST_API_TOKEN in Vercel env vars
 * 3. Redeploy
 */

// ── Vercel KV (optional, for key-value data like admin_password_hash) ──

let kv: ReturnType<typeof import('@vercel/kv')['kv']> | null = null
let kvAvailable: boolean | null = null

async function getKV() {
  if (kvAvailable === false) return null
  if (kv) return kv
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    kvAvailable = false
    return null
  }
  try {
    const mod = await import('@vercel/kv')
    kv = mod.kv
    kvAvailable = true
    return kv
  } catch {
    kvAvailable = false
    return null
  }
}

// ── Low-level key-value helpers (used only for admin_password_hash) ──

export async function getData(key: string): Promise<unknown | null> {
  const redis = await getKV()
  if (redis) {
    try {
      const raw = await redis.get(key)
      return raw ? JSON.parse(raw as string) : null
    } catch {
      return null
    }
  }

  // File system fallback (local dev only)
  try {
    const { promises: fs } = await import('fs')
    const path = await import('path')
    const dir = path.join(process.cwd(), 'data')
    await fs.mkdir(dir, { recursive: true })
    const content = await fs.readFile(path.join(dir, `${key}.json`), 'utf-8')
    return JSON.parse(content)
  } catch {
    return null
  }
}

export async function setData(key: string, value: unknown): Promise<void> {
  const redis = await getKV()
  if (redis) {
    await redis.set(key, JSON.stringify(value))
    return
  }

  // File system fallback (local dev only)
  try {
    const { promises: fs } = await import('fs')
    const path = await import('path')
    const dir = path.join(process.cwd(), 'data')
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(path.join(dir, `${key}.json`), JSON.stringify(value, null, 2), 'utf-8')
  } catch {
    // Silently fail on read-only filesystem
  }
}

// ── Posts (Prisma-backed) ──

export interface PostData {
  id: string
  slug: string
  title: string
  description: string
  content: string
  category: string
  readTime: string
  iconName: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export interface AdConfigData {
  key: string
  value: string
  label: string
  enabled: boolean
}

function toPostData(p: { id: string; slug: string; title: string; description: string; content: string; category: string; readTime: string; iconName: string; published: boolean; createdAt: Date; updatedAt: Date }): PostData {
  return {
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }
}

function toAdConfigData(a: { key: string; value: string; label: string; enabled: boolean }): AdConfigData {
  return { ...a }
}

export const PostsStore = {
  async getAll(): Promise<PostData[]> {
    const { db } = await import('./db')
    const posts = await db.post.findMany({ orderBy: { updatedAt: 'desc' } })
    return posts.map(toPostData)
  },

  async getById(id: string): Promise<PostData | undefined> {
    const { db } = await import('./db')
    const post = await db.post.findUnique({ where: { id } })
    return post ? toPostData(post) : undefined
  },

  async create(data: Omit<PostData, 'id' | 'createdAt' | 'updatedAt'>): Promise<PostData> {
    const { db } = await import('./db')
    try {
      const post = await db.post.create({ data })
      return toPostData(post)
    } catch (e: any) {
      if (e?.code === 'P2002') throw new Error('Ja existe uma postagem com esse slug')
      throw e
    }
  },

  async update(id: string, data: Partial<PostData>): Promise<PostData | undefined> {
    const { db } = await import('./db')
    const { createdAt, updatedAt, ...rest } = data as any
    try {
      const post = await db.post.update({ where: { id }, data: rest })
      return toPostData(post)
    } catch (e: any) {
      if (e?.code === 'P2002') throw new Error('Ja existe uma postagem com esse slug')
      return undefined
    }
  },

  async delete(id: string): Promise<boolean> {
    const { db } = await import('./db')
    try {
      await db.post.delete({ where: { id } })
      return true
    } catch {
      return false
    }
  },
}

// ── Ads (Prisma-backed, with hardcoded defaults for initialization) ──

const PRELOADER_SCRIPT = '<script src="https://jsc.adskeeper.com/site/1104734.js" async></' + 'script>'

function getAdDefaults(): Array<{ key: string; value: string; label: string; enabled: boolean }> {
  return [
    { key: 'header_code',   label: 'Codigo no Header',                  value: PRELOADER_SCRIPT, enabled: true },
    { key: 'header_banner',  label: 'Widget do Cabecalho',               value: '2056714', enabled: true },
    { key: 'sidebar',        label: 'Widget da Barra Lateral',            value: '2056714', enabled: true },
    { key: 'below_article',  label: 'Widget Embaixo do Artigo',          value: '2056714', enabled: true },
    { key: 'feed',           label: 'Feed',                               value: '2056714', enabled: true },
    { key: 'standard_block', label: 'Bloco de Anuncios Padrao',          value: '2056714', enabled: true },
    { key: 'mobile_widget',  label: 'Widget de Site para Celular',       value: '2056714', enabled: true },
    { key: 'notification',   label: 'Notificacao no Site',                value: '2056714', enabled: false },
    { key: 'exit_popup',     label: 'Sair do Pop-up',                    value: '2056714', enabled: false },
    { key: 'interstitial',   label: 'Interstitial',                       value: '2056714', enabled: false },
    { key: 'videowall',      label: 'Videowall',                          value: '2056714', enabled: false },
  ]
}

export const AdsStore = {
  /** Initialize default ad slots in DB if they don't exist. */
  async initDefaults(): Promise<void> {
    const { db } = await import('./db')
    const defaults = getAdDefaults()
    for (const ad of defaults) {
      await db.adConfig.upsert({
        where: { key: ad.key },
        update: {},
        create: ad,
      })
    }
  },

  async getAll(): Promise<AdConfigData[]> {
    const { db } = await import('./db')
    const ads = await db.adConfig.findMany()
    if (ads.length === 0) {
      // If DB is empty, return defaults (without persisting)
      return getAdDefaults().map(toAdConfigData)
    }
    return ads.map(toAdConfigData)
  },

  getDefaults(): AdConfigData[] {
    return getAdDefaults().map(toAdConfigData)
  },

  async getEnabled(): Promise<Record<string, string>> {
    const ads = await this.getAll()
    const result: Record<string, string> = {}
    for (const ad of ads) {
      if (ad.enabled && ad.value) result[ad.key] = ad.value
    }
    return result
  },

  async upsertMany(updates: Array<{ key: string; value?: string; enabled?: boolean; label?: string; position?: string }>): Promise<void> {
    const { db } = await import('./db')
    for (const u of updates) {
      const data: { value?: string; enabled?: boolean; label?: string } = {}
      if (u.value !== undefined) data.value = u.value
      if (u.enabled !== undefined) data.enabled = u.enabled
      if (u.label !== undefined) data.label = u.label
      await db.adConfig.upsert({
        where: { key: u.key },
        update: data,
        create: { key: u.key, value: u.value || '', label: u.label || u.key, enabled: u.enabled ?? false },
      })
    }
  },

  async delete(key: string): Promise<boolean> {
    const { db } = await import('./db')
    try {
      await db.adConfig.delete({ where: { key } })
      return true
    } catch {
      return false
    }
  },
}