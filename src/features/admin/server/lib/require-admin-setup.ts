import { prisma } from '#/shared/lib/prisma'

export async function requireAdminManagedSetup(setupId: string) {
  const setup = await prisma.setup.findFirst({
    where: {
      id: setupId,
      status: {
        not: 'DRAFT',
      },
    },
    select: {
      id: true,
      status: true,
      imageUrl: true,
      title: true,
    },
  })

  if (!setup) {
    throw new Error('Setup not found')
  }

  return setup
}
