import { z } from 'zod'

export const SETUP_INFO_TITLE_MAX = 60
export const SETUP_INFO_DESCRIPTION_MAX = 200

export const setupInfoFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(
      SETUP_INFO_TITLE_MAX,
      `Title must be ${SETUP_INFO_TITLE_MAX} characters or less`,
    ),
  description: z
    .string()
    .trim()
    .max(
      SETUP_INFO_DESCRIPTION_MAX,
      `Description must be ${SETUP_INFO_DESCRIPTION_MAX} characters or less`,
    ),
  categoryId: z.string().trim().min(1, 'Category is required'),
})

export type SetupInfoFormValues = z.infer<typeof setupInfoFormSchema>

export const setupInfoFormDefaultValues: SetupInfoFormValues = {
  title: '',
  description: '',
  categoryId: '',
}
