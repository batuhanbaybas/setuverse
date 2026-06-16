import { z } from 'zod'

export const PROFILE_BIO_MAX = 200
export const PROFILE_LINK_LABEL_MAX = 50
export const PROFILE_LINKS_MAX = 10

export const profileLinkInputSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, 'Label is required')
    .max(
      PROFILE_LINK_LABEL_MAX,
      `Label must be ${PROFILE_LINK_LABEL_MAX} characters or less`,
    ),
  url: z.string().trim().url('URL must be valid'),
})

export const editProfileFormSchema = z.object({
  bio: z
    .string()
    .trim()
    .max(
      PROFILE_BIO_MAX,
      `Bio must be ${PROFILE_BIO_MAX} characters or less`,
    ),
  links: z
    .array(profileLinkInputSchema)
    .max(PROFILE_LINKS_MAX, `Maximum ${PROFILE_LINKS_MAX} links`),
})

export type EditProfileFormValues = z.infer<typeof editProfileFormSchema>
export type ProfileLinkFormValues = z.infer<typeof profileLinkInputSchema>

export const editProfileFormDefaultValues: EditProfileFormValues = {
  bio: '',
  links: [],
}
