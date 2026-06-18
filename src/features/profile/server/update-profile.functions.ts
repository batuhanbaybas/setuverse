import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { requireSession } from '#/features/auth/lib/require-session'
import { prisma } from '#/shared/lib/prisma'

import {
  PROFILE_BIO_MAX,
  PROFILE_LINKS_MAX,
  profileLinkInputSchema,
} from '../lib/edit-profile-form'

export const updateProfileInputSchema = z.object({
  bio: z
    .string()
    .trim()
    .max(PROFILE_BIO_MAX, `Bio must be ${PROFILE_BIO_MAX} characters or less`),
  links: z
    .array(profileLinkInputSchema)
    .max(PROFILE_LINKS_MAX, `Maximum ${PROFILE_LINKS_MAX} links`),
})

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>

export type UpdateProfileResult = {
  id: string
}

export const updateProfileFn = createServerFn({ method: 'POST' })
  .validator(updateProfileInputSchema)
  .handler(async ({ data }): Promise<UpdateProfileResult> => {
    const session = await requireSession()

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    })

    if (!profile) {
      throw new Error('Profile not found')
    }

    const links = data.links.map((link) => ({
      label: link.label.trim(),
      url: link.url.trim(),
    }))

    return prisma.profile.update({
      where: { id: profile.id },
      data: {
        bio: data.bio.trim() ? data.bio.trim() : null,
        links: {
          deleteMany: {},
          create: links.map((link) => ({
            label: link.label,
            url: link.url,
          })),
        },
      },
      select: { id: true },
    })
  })
