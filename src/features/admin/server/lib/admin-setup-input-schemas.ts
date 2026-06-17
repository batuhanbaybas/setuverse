import { z } from 'zod'

export const adminSetupIdInputSchema = z.object({
  setupId: z.string().trim().min(1, 'Setup id is required'),
})

export type AdminSetupIdInput = z.infer<typeof adminSetupIdInputSchema>
