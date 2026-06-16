import { prisma } from '#/shared/lib/prisma'

type RequireOwnedDraftSetupOptions = {
  setupId: string
  userId: string
  minCompletedStep?: number
}

export async function requireOwnedDraftSetup({
  setupId,
  userId,
  minCompletedStep,
}: RequireOwnedDraftSetupOptions) {
  const setup = await prisma.setup.findFirst({
    where: {
      id: setupId,
      userId,
      status: 'DRAFT',
    },
    select: {
      id: true,
      completedStep: true,
      imageUrl: true,
      title: true,
      description: true,
      categoryId: true,
    },
  })

  if (!setup) {
    throw new Error('Setup not found')
  }

  if (
    minCompletedStep !== undefined &&
    setup.completedStep < minCompletedStep
  ) {
    throw new Error('Complete the previous step first')
  }

  return setup
}
