import { z } from 'zod'

export const homeSearchSchema = z.object({
  category: z.string().optional(),
})

export type HomeSearch = z.infer<typeof homeSearchSchema>
