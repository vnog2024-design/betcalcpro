import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function requireAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value

  if (!token) {
    redirect('/admin/login')
  }

  const payload = await verifyToken(token)
  if (!payload) {
    redirect('/admin/login')
  }

  return payload
}

export async function getAdminOrNull() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value

  if (!token) return null

  try {
    return await verifyToken(token)
  } catch {
    return null
  }
}

export async function requireAdminApi(request: Request): Promise<{ username: string; role: string } | Response> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value

  if (!token) {
    return new Response(JSON.stringify({ error: 'Não autorizado' }), { status: 401 })
  }

  const payload = await verifyToken(token)
  if (!payload) {
    return new Response(JSON.stringify({ error: 'Sessão expirada' }), { status: 401 })
  }

  return payload
}