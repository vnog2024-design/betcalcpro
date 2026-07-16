/**
 * Prisma database client.
 * Uses better-sqlite3 (serverExternalPackages in next.config.ts handles bundling).
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