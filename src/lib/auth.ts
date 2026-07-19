import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'betcalc-admin-secret-key-2024-change-in-production'
)

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createToken(username: string): Promise<string> {
  return new SignJWT({ username, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<{ username: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as { username: string; role: string }
  } catch {
    return null
  }
}

export function getSessionCookieName(): string {
  return 'admin_session'
}

// Admin credentials from environment (works on Vercel without DB)
export function getAdminCredentials(): { username: string; passwordHash: string } {
  const username = process.env.ADMIN_USERNAME || 'admin'
  // In production, use the hash from env. In dev, use default.
  const passwordHash = process.env.ADMIN_PASSWORD_HASH || ''
  return { username, passwordHash }
}

// Verify admin login against env vars and/or DB-stored hash
export async function verifyAdminLogin(username: string, password: string): Promise<boolean> {
  const creds = getAdminCredentials()
  
  if (username !== creds.username) return false
  
  // 1. Check env var hash first
  if (creds.passwordHash) {
    return verifyPassword(password, creds.passwordHash)
  }
  
  // 2. Check DB-stored hash (set by change-password endpoint)
  try {
    const { getData } = await import('./store')
    const data = await getData('admin_password_hash') as { hash: string } | null
    if (data?.hash) {
      return verifyPassword(password, data.hash)
    }
  } catch {
    // DB unavailable
  }
  
  // 3. Fallback: default password for first setup
  return password === 'admin123'
}

// Check if default password is still in use
export function isUsingDefaultPassword(): boolean {
  return !process.env.ADMIN_PASSWORD_HASH
}