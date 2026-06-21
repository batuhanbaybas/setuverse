import { prisma } from '#/shared/lib/prisma'

type RequireOwnedSetupOptions = {
  setupId: string
  userId: string
}

export async function requireOwnedSetup({
  setupId,
  userId,
}: RequireOwnedSetupOptions) {
  const setup = await prisma.setup.findFirst({
    where: {
      id: setupId,
      userId,
    },
    select: {
      id: true,
      title: true,
      imageUrl: true,
    },
  })

  if (!setup) {
    throw new Error('Setup not found')
  }

  return setup
}
