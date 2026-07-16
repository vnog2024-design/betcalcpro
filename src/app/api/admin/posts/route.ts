import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdminApi } from '@/lib/admin-auth'

export async function GET() {
  const auth = await requireAdminApi()
  if (auth instanceof Response) return auth

  try {
    const posts = await db.post.findMany({
      orderBy: { updatedAt: 'desc' },
    })
    return NextResponse.json(posts)
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar postagens' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi()
  if (auth instanceof Response) return auth

  try {
    const data = await request.json()
    const { title, slug, description, content, category, readTime, iconName, published } = data

    if (!title || !slug) {
      return NextResponse.json({ error: 'Título e slug são obrigatórios' }, { status: 400 })
    }

    const existing = await db.post.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json({ error: 'Já existe uma postagem com esse slug' }, { status: 409 })
    }

    const post = await db.post.create({
      data: {
        title,
        slug,
        description: description || '',
        content: content || '',
        category: category || 'Geral',
        readTime: readTime || '5 min',
        iconName: iconName || 'BookOpen',
        published: published ?? false,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro ao criar postagem'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}