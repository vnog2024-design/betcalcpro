import { NextRequest, NextResponse } from 'next/server'
import { PostsStore } from '@/lib/store'
import { getAdminOrNull } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'

async function requireAuth(): Promise<Response | null> {
  'use server'
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token) return null

  const { verifyToken } = await import('@/lib/auth')
  return await verifyToken(token) ? true : null
}

export async function GET() {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const posts = await PostsStore.getAll()
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Posts GET error:', error)
    return NextResponse.json({ error: 'Erro ao buscar postagens' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const data = await request.json()
    const { title, slug, description, content, category, readTime, iconName, published } = data

    if (!title || !slug) {
      return NextResponse.json({ error: 'Título e slug são obrigatórios' }, { status: 400 })
    }

    const post = await PostsStore.create({
      title,
      slug,
      description: description || '',
      content: content || '',
      category: category || 'Geral',
      readTime: readTime || '5 min',
      iconName: iconName || 'BookOpen',
      published: published ?? false,
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro ao criar postagem'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}