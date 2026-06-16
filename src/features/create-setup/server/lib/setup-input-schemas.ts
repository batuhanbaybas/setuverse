import { z } from 'zod'

export const setupIdSchema = z.object({
  setupId: z.string().trim().min(1, 'Setup id is required'),
})

export const createSetupInputSchema = z.object({
  imageUrl: z.string().trim().url('Upload an image to continue'),
})

export const updateSetupInfoInputSchema = setupIdSchema.extend({
  title: z.string().trim().min(1, 'Title is required').max(60),
  description: z
    .string()
    .trim()
    .max(200, 'Description must be 200 characters or less')
    .optional(),
  categoryId: z.string().trim().min(1, 'Category is required'),
})

export const setupItemInputSchema = z.object({
  name: z.string().trim().min(1, 'Item name is required').max(100),
  url: z.string().trim().url('Item url must be valid'),
  x: z.number().finite(),
  y: z.number().finite(),
})

export const updateSetupItemsInputSchema = setupIdSchema.extend({
  items: z.array(setupItemInputSchema).min(1, 'Add at least one item'),
})

export const publishSetupInputSchema = setupIdSchema

export const getSetupDraftInputSchema = setupIdSchema

export type CreateSetupInput = z.infer<typeof createSetupInputSchema>
export type UpdateSetupInfoInput = z.infer<typeof updateSetupInfoInputSchema>
export type UpdateSetupItemsInput = z.infer<typeof updateSetupItemsInputSchema>
export type SetupItemInput = z.infer<typeof setupItemInputSchema>
export type PublishSetupInput = z.infer<typeof publishSetupInputSchema>
export type GetSetupDraftInput = z.infer<typeof getSetupDraftInputSchema>
