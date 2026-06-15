import { z } from "zod";

export const uploadSetupImageFormSchema = z.object({
  image: z.instanceof(File),
}).refine((data) => data.image.size > 0, {
  message: 'Image is required',
  path: ['image'],
})

export type UploadSetupImageFormSchema = z.infer<typeof uploadSetupImageFormSchema>