/**
 * Data store for admin panel — works on both local dev and Vercel.
 * 
 * Priority:
 * 1. @vercel/kv (Vercel KV / Redis) — persists across deployments
 * 2. Neon PostgreSQL (DATABASE_URL) — persists across deployments
 * 3. File system — works locally, ephemeral on Vercel
 * 
 * To set up Vercel KV (recommended for production):
 * 1. Go to Vercel Dashboard → Storage → Create Database → KV
 * 2. Set KV_REST_API_URL and KV_REST_API_TOKEN in Vercel env vars
 * 3. Redeploy
 */

let kv: ReturnType<typeof import('@vercel/kv')['kv']> | null = null
let kvAvailable: boolean | null = null
let pgAvailable: boolean | null = null

async function getKV() {
  if (kvAvailable === false) return null
  if (kv) return kv
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

// ── Neon PostgreSQL fallback (uses DATABASE_URL already configured) ──

async function getPG(): Promise<import('pg').PoolClient | null> {
  if (pgAvailable === false) return null
  try {
    const { Pool } = await import('pg')
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })
    const client = await pool.connect()
    pgAvailable = true
    // Release pool resources (we just needed to test the connection)
    pool.end()
    return client
  } catch {
    pgAvailable = false
    return null
  }
}

async function pgQuery<T = unknown>(text: string, params: unknown[] = []): Promise<T | null> {
  try {
    const { Pool } = await import('pg')
    const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1, idleTimeoutMillis: 10000 })
    const result = await pool.query(text, params)
    await pool.end()
    return result.rows[0] as T || null
  } catch {
    pgAvailable = false
    return null
  }
}

// ── Low-level helpers ──

async function getData(key: string): Promise<unknown | null> {
  // 1. Try KV
  const redis = await getKV()
  if (redis) {
    try {
      const raw = await redis.get(key)
      return raw ? JSON.parse(raw as string) : null
    } catch {
      return null
    }
  }

  // 2. Try Neon PostgreSQL
  if (pgAvailable !== false && process.env.DATABASE_URL) {
    try {
      const row = await pgQuery<{ value: string }>(
        'SELECT value FROM app_store WHERE key = $1',
        [key]
      )
      if (row) return JSON.parse(row.value)
      return null
    } catch {
      pgAvailable = false
    }
  }

  // 3. File system fallback (local dev only)
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

async function setData(key: string, value: unknown): Promise<void> {
  // 1. Try KV
  const redis = await getKV()
  if (redis) {
    await redis.set(key, JSON.stringify(value))
    return
  }

  // 2. Try Neon PostgreSQL
  if (pgAvailable !== false && process.env.DATABASE_URL) {
    try {
      const { Pool } = await import('pg')
      const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1, idleTimeoutMillis: 10000 })
      await pool.query(`
        CREATE TABLE IF NOT EXISTS app_store (
          key TEXT PRIMARY KEY,
          value JSONB NOT NULL,
          updated_at TIMESTAMPTZ DEFAULT now()
        )
      `)
      await pool.query(
        'INSERT INTO app_store (key, value) VALUES ($1, $2::jsonb) ON CONFLICT (key) DO UPDATE SET value = $2::jsonb, updated_at = now()',
        [key, JSON.stringify(value)]
      )
      await pool.end()
      pgAvailable = true
      return
    } catch {
      pgAvailable = false
      // Fall through to file system
    }
  }

  // 3. File system fallback (local dev only)
  try {
    const { promises: fs } = await import('fs')
    const path = await import('path')
    const dir = path.join(process.cwd(), 'data')
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(path.join(dir, `${key}.json`), JSON.stringify(value, null, 2), 'utf-8')
  } catch {
    // Silently fail on Vercel read-only filesystem
  }
}

// ── Posts ──

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

const POSTS_KEY = 'admin_posts'
const ADS_KEY = 'admin_ads'

function genId(): string {
  return `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
}

export const PostsStore = {
  async getAll(): Promise<PostData[]> {
    const data = await getData(POSTS_KEY) as PostData[] | null
    return (data || []).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  },

  async getById(id: string): Promise<PostData | undefined> {
    const posts = await this.getAll()
    return posts.find((p) => p.id === id)
  },

  async create(data: Omit<PostData, 'id' | 'createdAt' | 'updatedAt'>): Promise<PostData> {
    const posts = await this.getAll()
    if (posts.find((p) => p.slug === data.slug)) {
      throw new Error('Já existe uma postagem com esse slug')
    }
    const now = new Date().toISOString()
    const post: PostData = { ...data, id: genId(), createdAt: now, updatedAt: now }
    posts.push(post)
    await setData(POSTS_KEY, posts)
    return post
  },

  async update(id: string, data: Partial<PostData>): Promise<PostData | undefined> {
    const posts = await this.getAll()
    const idx = posts.findIndex((p) => p.id === id)
    if (idx === -1) return undefined

    if (data.slug && data.slug !== posts[idx].slug) {
      if (posts.find((p) => p.slug === data.slug && p.id !== id)) {
        throw new Error('Já existe uma postagem com esse slug')
      }
    }

    posts[idx] = { ...posts[idx], ...data, updatedAt: new Date().toISOString() }
    await setData(POSTS_KEY, posts)
    return posts[idx]
  },

  async delete(id: string): Promise<boolean> {
    const posts = await this.getAll()
    const filtered = posts.filter((p) => p.id !== id)
    if (filtered.length === posts.length) return false
    await setData(POSTS_KEY, filtered)
    return true
  },
}

export const AdsStore = {
  async getAll(): Promise<AdConfigData[]> {
    const data = await getData(ADS_KEY) as AdConfigData[] | null
    if (data && data.length > 0) return data
    return this.getDefaults()
  },

  getDefaults(): AdConfigData[] {
    return [
      { key: 'header_code', label: 'Header (<head>) — Cole aqui o preloader do Adskeeper: <script async src="https://jsc.adskeeper.com/site/SEU_SITE_ID.js"><\/script>. Tambem aceita pixels, meta tags e outros scripts.', value: '', enabled: false },
      { key: 'ads_txt', label: 'Ads.txt — Conteudo do arquivo ads.txt para verificacao de anunciantes (Google AdSense + Adskeeper)', value: '', enabled: false },
      { key: 'banner_top', label: 'Banner Topo (728x90) — Anuncio horizontal acima do conteudo principal. Cole o codigo do widget Adskeeper ou AdSense aqui.', value: '', enabled: false },
      { key: 'banner_middle', label: 'Banner Meio (728x90) — Anuncio horizontal apos resultado da ferramenta. Ideal para Adskeeper native ad.', value: '', enabled: false },
      { key: 'banner_bottom', label: 'Banner Rodape (728x90) — Anuncio horizontal acima do rodape. Boa posicao para recovery ads.', value: '', enabled: false },
      { key: 'in_content', label: 'In-Content (fluid) — Anuncio nativo entre formulario e resultado. Melhor performace com Adskeeper native.', value: '', enabled: false },
      { key: 'in_article', label: 'In-Article (fluid) — Anuncio dentro do corpo de artigos, entre paragrafos. Formato nativo recomendado.', value: '', enabled: false },
      { key: 'sidebar_ad', label: 'Sidebar (300x250) — Anuncio nativo no final da barra lateral. Adskeeper recomendado para esta posicao.', value: '', enabled: false },
      { key: 'in_feed', label: 'In-Feed (fluid) — Anuncio nativo entre os cards de artigos. Aparece a cada 4 artigos na listagem.', value: '', enabled: false },
      { key: 'videowall_code', label: 'Videowall (Tela Cheia) — Anuncio em tela cheia na entrada do site. Adskeeper video ad recomendado.', value: '', enabled: false },
    ]
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
    const ads = await this.getAll()
    const map = new Map(ads.map((a) => [a.key, a]))

    for (const u of updates) {
      const existing = map.get(u.key)
      if (existing) {
        if (u.value !== undefined) existing.value = u.value
        if (u.enabled !== undefined) existing.enabled = u.enabled
        if (u.label !== undefined) existing.label = u.label
        if (u.position !== undefined) (existing as any).position = u.position
      } else {
        map.set(u.key, {
          key: u.key,
          value: u.value || '',
          label: u.label || u.key,
          enabled: u.enabled ?? false,
          ...(u.position ? { position: u.position } : {}),
        })
      }
    }

    await setData(ADS_KEY, Array.from(map.values()))
  },

  async delete(key: string): Promise<boolean> {
    const ads = await this.getAll()
    const filtered = ads.filter((a) => a.key !== key)
    if (filtered.length === ads.length) return false
    await setData(ADS_KEY, filtered)
    return true
  },

  /** Ensure default ad slots exist (merge with stored data, never overwrite user edits) */
  async initDefaults(): Promise<void> {
    const stored = await getData(ADS_KEY) as AdConfigData[] | null
    if (!stored || stored.length === 0) {
      await setData(ADS_KEY, this.getDefaults())
      return
    }
    const storedMap = new Map(stored.map(a => [a.key, a]))
    for (const def of this.getDefaults()) {
      if (!storedMap.has(def.key)) {
        stored.push(def)
      }
    }
    await setData(ADS_KEY, stored)
  },
}