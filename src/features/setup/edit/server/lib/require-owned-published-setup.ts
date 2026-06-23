import { prisma } from '#/shared/lib/prisma'

type RequireOwnedPublishedSetupOptions = {
  setupId: string
  userId: string
}

export async function requireOwnedPublishedSetup({
  setupId,
  userId,
}: RequireOwnedPublishedSetupOptions) {
  const setup = await prisma.setup.findFirst({
    where: {
      id: setupId,
      userId,
      status: 'PUBLISHED',
    },
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      imageWidth: true,
      imageHeight: true,
      categoryId: true,
    },
  })

  if (!setup) {
    throw new Error('Setup not found')
  }

  return setup
}
