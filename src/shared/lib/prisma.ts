import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '#/generated/prisma/client'

// Vite dev sunucusunda HMR her modul yenilemesinde yeni bir PrismaClient
// (dolayisiyla yeni bir connection pool) olusturmasin diye globalThis
// uzerinde tekil instance tutuyoruz.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  })
  return new PrismaClient({ adapter })
}

function isPrismaClientReady(client: PrismaClient) {
  return (
    typeof client.setup.create === 'function' &&
    typeof client.setupLike.create === 'function' &&
    typeof client.setupSave.create === 'function' &&
    typeof client.setupRate.upsert === 'function'
  )
}

function getPrismaClient() {
  const cachedClient = globalForPrisma.prisma

  if (cachedClient && isPrismaClientReady(cachedClient)) {
    return cachedClient
  }

  const client = createPrismaClient()

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = client
  }

  return client
}

export const prisma = getPrismaClient()
