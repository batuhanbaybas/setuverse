import { prisma } from '#/shared/lib/prisma'

import { SETUP_FLOW_STEPS } from './setup-flow-steps'

export type PublishDraftSetupResult = {
  id: string
  status: 'PENDING'
  completedStep: number
}

export async function publishDraftSetup({
  setupId,
  userId,
}: {
  setupId: string
  userId: string
}): Promise<PublishDraftSetupResult> {
  const setup = await prisma.setup.findFirst({
    where: {
      id: setupId,
      userId,
      status: 'DRAFT',
    },
    select: {
      imageUrl: true,
      title: true,
      categoryId: true,
      _count: {
        select: { items: true },
      },
    },
  })

  if (!setup) {
    throw new Error('Setup not found')
  }

  if (!setup.imageUrl) {
    throw new Error('Setup image is required')
  }

  if (!setup.title?.trim()) {
    throw new Error('Setup title is required')
  }

  if (!setup.categoryId) {
    throw new Error('Setup category is required')
  }

  if (setup._count.items === 0) {
    throw new Error('Add at least one item before publishing')
  }

  const published = await prisma.setup.update({
    where: { id: setupId },
    data: {
      status: 'PENDING',
      completedStep: SETUP_FLOW_STEPS.REVIEW,
    },
    select: {
      id: true,
      completedStep: true,
    },
  })

  return {
    id: published.id,
    status: 'PENDING',
    completedStep: published.completedStep,
  }
}
