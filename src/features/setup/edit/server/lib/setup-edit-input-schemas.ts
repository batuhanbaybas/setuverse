import { z } from 'zod'

import { setupIdSchema } from '#/features/create-setup/server/lib/setup-input-schemas'

export const getSetupForEditInputSchema = setupIdSchema

export const updatePublishedSetupInfoInputSchema = setupIdSchema.extend({
  title: z.string().trim().min(1, 'Title is required').max(60),
  description: z
    .string()
    .trim()
    .max(200, 'Description must be 200 characters or less')
    .optional(),
  categoryId: z.string().trim().min(1, 'Category is required'),
})

export type GetSetupForEditInput = z.infer<typeof getSetupForEditInputSchema>
export type UpdatePublishedSetupInfoInput = z.infer<
  typeof updatePublishedSetupInfoInputSchema
>
