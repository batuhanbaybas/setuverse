import { z } from 'zod'

export const SETUP_TAG_ITEM_NAME_MAX = 100

export const setupTagItemFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Item name is required')
    .max(SETUP_TAG_ITEM_NAME_MAX),
  url: z.string().trim().url('Enter a valid URL'),
})

export type SetupTagItemFormValues = z.infer<typeof setupTagItemFormSchema>

export const setupTagItemFormDefaultValues: SetupTagItemFormValues = {
  name: '',
  url: '',
}
