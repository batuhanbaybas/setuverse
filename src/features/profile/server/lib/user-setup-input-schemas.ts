import { z } from 'zod'

export const userSetupIdInputSchema = z.object({
  setupId: z.string().trim().min(1, 'Setup id is required'),
})

export type UserSetupIdInput = z.infer<typeof userSetupIdInputSchema>
