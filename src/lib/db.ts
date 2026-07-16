/**
 * Prisma database client.
 * 
 * On Vercel with Turso: DATABASE_URL=libsql://... + DATABASE_AUTH_TOKEN=...
 * On local dev: DATABASE_URL=file:./dev.db (SQLite file)
 */

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({
    log: process.env.NODE_ENV !== 'production' ? ['error'] : [],
  })
}

export const db = globalForPrisma.prisma