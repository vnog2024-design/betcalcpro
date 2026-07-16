import { NextResponse } from 'next/server'
import { hashPassword, verifyPassword, verifyAdminLogin, createToken, isUsingDefaultPassword } from '@/lib/auth'

/**
 * Debug endpoint — helps identify what's causing 500 errors on Vercel.
 * Access: GET /api/admin/debug
 * Remove this file after debugging is complete.
 */
export const runtime = 'nodejs'
export const maxDuration = 10

export async function GET() {
  const results: Record<string, string> = {}

  // Test 1: Basic Node.js
  results['node_version'] = process.version
  results['platform'] = process.platform

  // Test 2: Environment
  results['node_env'] = process.env.NODE_ENV || 'not set'
  results['database_url_prefix'] = (process.env.DATABASE_URL || 'not set').substring(0, 30)
  results['has_jwt_secret'] = process.env.JWT_SECRET ? 'yes' : 'no (uses default)'
  results['has_admin_user'] = process.env.ADMIN_USERNAME ? `yes (${process.env.ADMIN_USERNAME})` : 'no (uses default: admin)'
  results['has_admin_hash'] = process.env.ADMIN_PASSWORD_HASH ? 'yes' : 'no (uses default password)'

  // Test 3: bcryptjs
  try {
    const hash = await hashPassword('test123')
    const match = await verifyPassword('test123', hash)
    results['bcryptjs'] = `ok (hash+verify works: ${match})`
  } catch (e: any) {
    results['bcryptjs'] = `ERROR: ${e.message}`
  }

  // Test 4: jose JWT
  try {
    const token = await createToken('debug-user')
    results['jose_jwt'] = `ok (token created, length: ${token.length})`
  } catch (e: any) {
    results['jose_jwt'] = `ERROR: ${e.message}`
  }

  // Test 5: Full login flow
  try {
    const valid = await verifyAdminLogin('admin', 'admin123')
    results['login_test'] = `ok (admin/admin123 valid: ${valid})`
  } catch (e: any) {
    results['login_test'] = `ERROR: ${e.message}`
  }

  // Test 6: isUsingDefaultPassword
  try {
    results['default_pwd'] = isUsingDefaultPassword() ? 'yes (using default)' : 'no (custom hash set)'
  } catch (e: any) {
    results['default_pwd'] = `ERROR: ${e.message}`
  }

  // Test 7: Prisma client
  try {
    const { PrismaClient } = await import('@prisma/client')
    results['prisma_import'] = `ok (PrismaClient loaded)`
  } catch (e: any) {
    results['prisma_import'] = `ERROR: ${e.message}`
  }

  // Test 8: Vercel KV
  try {
    await import('@vercel/kv')
    results['vercel_kv'] = 'module loaded (may not be configured)'
  } catch (e: any) {
    results['vercel_kv'] = `not available: ${e.message.substring(0, 60)}`
  }

  return NextResponse.json(results, {
    headers: { 'Cache-Control': 'no-store' },
  })
}