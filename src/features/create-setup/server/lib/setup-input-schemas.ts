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

export const addSetupItemInputSchema = setupIdSchema.merge(setupItemInputSchema)

export const updateSetupItemInputSchema = z.object({
  itemId: z.string().trim().min(1, 'Item id is required'),
  name: z.string().trim().min(1, 'Item name is required').max(100).optional(),
  url: z.string().trim().url('Item url must be valid').optional(),
  x: z.number().finite().optional(),
  y: z.number().finite().optional(),
})

export const deleteSetupItemInputSchema = z.object({
  itemId: z.string().trim().min(1, 'Item id is required'),
})

export const updateSetupItemsInputSchema = setupIdSchema.extend({
  items: z.array(setupItemInputSchema).min(1, 'Add at least one item'),
})

export const updateSetupImageUrlInputSchema = setupIdSchema.extend({
  imageUrl: z.string().trim().url('Image URL must be valid'),
})

export const publishSetupInputSchema = setupIdSchema

export const getSetupDraftInputSchema = setupIdSchema

export type CreateSetupInput = z.infer<typeof createSetupInputSchema>
export type UpdateSetupInfoInput = z.infer<typeof updateSetupInfoInputSchema>
export type SetupItemInput = z.infer<typeof setupItemInputSchema>
export type AddSetupItemInput = z.infer<typeof addSetupItemInputSchema>
export type UpdateSetupItemInput = z.infer<typeof updateSetupItemInputSchema>
export type DeleteSetupItemInput = z.infer<typeof deleteSetupItemInputSchema>
export type UpdateSetupItemsInput = z.infer<typeof updateSetupItemsInputSchema>
export type UpdateSetupImageUrlInput = z.infer<typeof updateSetupImageUrlInputSchema>
export type PublishSetupInput = z.infer<typeof publishSetupInputSchema>
export type GetSetupDraftInput = z.infer<typeof getSetupDraftInputSchema>
