import type { Prisma } from '#/generated/prisma/client'
import { prisma } from '#/shared/lib/prisma'
import {
  realUserEmailFilter,
  seedUserEmailFilter,
} from '#/shared/lib/seed-data'

type PublishedSetupsPageArgs<TInclude extends Prisma.SetupInclude> = {
  take: number
  skip: number
  categoryId?: string
  include: TInclude
}

/**
 * Returns published setups with real users first, seed (@setuver.space) after.
 * Pagination stays correct across both pools (real → seed).
 */
export async function findPublishedSetupsRealFirst<
  TInclude extends Prisma.SetupInclude,
>({ take, skip, categoryId, include }: PublishedSetupsPageArgs<TInclude>) {
  const baseWhere = {
    status: 'PUBLISHED' as const,
    ...(categoryId ? { categoryId } : {}),
  }

  const realWhere: Prisma.SetupWhereInput = {
    ...baseWhere,
    user: { email: realUserEmailFilter },
  }

  const seedWhere: Prisma.SetupWhereInput = {
    ...baseWhere,
    user: { email: seedUserEmailFilter },
  }

  const [realTotal, seedTotal] = await Promise.all([
    prisma.setup.count({ where: realWhere }),
    prisma.setup.count({ where: seedWhere }),
  ])

  const total = realTotal + seedTotal
  const orderBy = { publishedAt: 'desc' } as const

  if (skip < realTotal) {
    const realTake = Math.min(take, realTotal - skip)
    const realSetups = await prisma.setup.findMany({
      where: realWhere,
      include,
      orderBy,
      skip,
      take: realTake,
    })

    const remaining = take - realSetups.length
    if (remaining <= 0) {
      return { setups: realSetups, total }
    }

    const seedSetups = await prisma.setup.findMany({
      where: seedWhere,
      include,
      orderBy,
      skip: 0,
      take: remaining,
    })

    return { setups: [...realSetups, ...seedSetups], total }
  }

  const seedSkip = skip - realTotal
  const seedSetups = await prisma.setup.findMany({
    where: seedWhere,
    include,
    orderBy,
    skip: seedSkip,
    take,
  })

  return { setups: seedSetups, total }
}
