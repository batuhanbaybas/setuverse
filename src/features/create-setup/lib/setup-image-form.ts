import { z } from 'zod'

export const setupImageFormSchema = z.object({
  imageUrl: z
    .string()
    .min(1, 'Upload an image to continue')
    .url('Upload an image to continue'),
})

export type SetupImageFormValues = z.infer<typeof setupImageFormSchema>

export const setupImageFormDefaultValues: SetupImageFormValues = {
  imageUrl: '',
}
