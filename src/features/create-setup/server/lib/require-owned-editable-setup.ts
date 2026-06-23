import { prisma } from '#/shared/lib/prisma'

import { SETUP_FLOW_STEPS } from '#/features/create-setup/server/lib/setup-flow-steps'

type RequireOwnedEditableSetupOptions = {
  setupId: string
  userId: string
  minCompletedStep?: number
}

export async function requireOwnedEditableSetup({
  setupId,
  userId,
  minCompletedStep,
}: RequireOwnedEditableSetupOptions) {
  const setup = await prisma.setup.findFirst({
    where: {
      id: setupId,
      userId,
      status: { in: ['DRAFT', 'PUBLISHED'] },
    },
    select: {
      id: true,
      status: true,
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
    setup.status === 'DRAFT' &&
    minCompletedStep !== undefined &&
    setup.completedStep < minCompletedStep
  ) {
    throw new Error('Complete the previous step first')
  }

  return setup
}

export function canModifySetupItems(setup: { status: string }) {
  return setup.status === 'DRAFT' || setup.status === 'PUBLISHED'
}

export { SETUP_FLOW_STEPS }
