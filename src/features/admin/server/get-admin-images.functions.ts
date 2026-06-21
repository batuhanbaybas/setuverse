import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { SETUP_IMAGE_KEY_PREFIX } from '#/features/create-setup/server/r2/constants'
import { requireAdmin } from '#/features/auth/lib/require-admin'
import { adminMiddleware } from '#/features/auth/middleware/admin.middleware'
import { getSetupImageKeyFromUrl } from '#/features/setup/lib/setup-image-src'
import { getR2PublicUrl, listR2Objects } from '#/features/setup/lib/r2'
import type { SetupStatus } from '#/generated/prisma/client'
import { prisma } from '#/shared/lib/prisma'

import {
  ADMIN_PAGE_SIZE,
  buildAdminPagination,
  getAdminSkip,
  type AdminPagination,
} from '../lib/admin-pagination'

export type AdminImageSetup = {
  id: string
  title: string | null
  status: SetupStatus
  user: {
    id: string
    name: string
    email: string
  }
}

export type AdminImage = {
  key: string
  url: string
  size: number
  lastModified: Date
  ownerUserId: string | null
  setup: AdminImageSetup | null
}

export type AdminImageCounts = {
  total: number
  referenced: number
  draft: number
}

const getAdminImagesInputSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(50).default(ADMIN_PAGE_SIZE),
  status: z.enum(['referenced', 'draft']).optional(),
})

export type GetAdminImagesInput = z.infer<typeof getAdminImagesInputSchema>

export type GetAdminImagesResult = {
  images: AdminImage[]
  pagination: AdminPagination
  counts: AdminImageCounts
}

function getUserIdFromSetupImageKey(key: string) {
  const match = key.match(/^setups\/([^/]+)\//)
  return match?.[1] ?? null
}

export const getAdminImagesFn = createServerFn({ method: 'GET' })
  .middleware([adminMiddleware])
  .validator(getAdminImagesInputSchema)
  .handler(async ({ data }): Promise<GetAdminImagesResult> => {
    await requireAdmin()

    const [r2Objects, setups] = await Promise.all([
      listR2Objects({ prefix: SETUP_IMAGE_KEY_PREFIX }),
      prisma.setup.findMany({
        where: { imageUrl: { not: null } },
        select: {
          id: true,
          title: true,
          status: true,
          imageUrl: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
    ])

    const setupByKey = new Map<string, AdminImageSetup>()

    for (const setup of setups) {
      if (!setup.imageUrl) {
        continue
      }

      const key = getSetupImageKeyFromUrl(setup.imageUrl)

      if (!key) {
        continue
      }

      setupByKey.set(key, {
        id: setup.id,
        title: setup.title,
        status: setup.status,
        user: setup.user,
      })
    }

    const allImages: AdminImage[] = r2Objects
      .map((object) => ({
        key: object.key,
        url: getR2PublicUrl(object.key),
        size: object.size,
        lastModified: object.lastModified,
        ownerUserId: getUserIdFromSetupImageKey(object.key),
        setup: setupByKey.get(object.key) ?? null,
      }))
      .sort((left, right) => right.lastModified.getTime() - left.lastModified.getTime())

    const referenced = allImages.filter((image) => image.setup !== null).length
    const draft = allImages.length - referenced

    const filteredImages = data.status
      ? allImages.filter((image) =>
          data.status === 'referenced' ? image.setup !== null : image.setup === null,
        )
      : allImages

    const pagination = buildAdminPagination(
      filteredImages.length,
      data.page,
      data.pageSize,
    )

    const images = filteredImages.slice(
      getAdminSkip(pagination.page, pagination.pageSize),
      getAdminSkip(pagination.page, pagination.pageSize) + pagination.pageSize,
    )

    return {
      images,
      pagination,
      counts: {
        total: allImages.length,
        referenced,
        draft,
      },
    }
  })
