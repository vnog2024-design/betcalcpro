import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdminApi } from '@/lib/admin-auth'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi()
  if (auth instanceof Response) return auth

  try {
    const { id } = await params
    const post = await db.post.findUnique({ where: { id } })
    if (!post) {
      return NextResponse.json({ error: 'Postagem não encontrada' }, { status: 404 })
    }
    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar postagem' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi()
  if (auth instanceof Response) return auth

  try {
    const { id } = await params
    const data = await request.json()

    const post = await db.post.findUnique({ where: { id } })
    if (!post) {
      return NextResponse.json({ error: 'Postagem não encontrada' }, { status: 404 })
    }

    if (data.slug && data.slug !== post.slug) {
      const existing = await db.post.findUnique({ where: { slug: data.slug } })
      if (existing) {
        return NextResponse.json({ error: 'Já existe uma postagem com esse slug' }, { status: 409 })
      }
    }

    const updated = await db.post.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.slug !== undefined && { slug: data.slug }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.content !== undefined && { content: data.content }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.readTime !== undefined && { readTime: data.readTime }),
        ...(data.iconName !== undefined && { iconName: data.iconName }),
        ...(data.published !== undefined && { published: data.published }),
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro ao atualizar postagem'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi()
  if (auth instanceof Response) return auth

  try {
    const { id } = await params
    const post = await db.post.findUnique({ where: { id } })
    if (!post) {
      return NextResponse.json({ error: 'Postagem não encontrada' }, { status: 404 })
    }

    await db.post.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erro ao deletar postagem' }, { status: 500 })
  }
}