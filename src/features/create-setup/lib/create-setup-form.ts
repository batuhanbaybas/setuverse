import { z } from 'zod'

export type SetupPhoto = {
  file: File
  previewUrl: string
  sourceFile: File
}

const setupPhotoSchema = z.object({
  file: z.custom<File>((value) => value instanceof File),
  previewUrl: z.string(),
  sourceFile: z.custom<File>((value) => value instanceof File),
})

export const createSetupFormSchema = z.object({
  photo: setupPhotoSchema.optional(),
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(100, 'Title must be 100 characters or less'),
  description: z
    .string()
    .trim()
    .max(500, 'Description must be 500 characters or less'),
  categoryId: z.string().min(1, 'Category is required'),
})

export type CreateSetupFormValues = z.infer<typeof createSetupFormSchema>

export const createSetupDefaultValues: CreateSetupFormValues = {
  title: '',
  description: '',
  categoryId: '',
}
