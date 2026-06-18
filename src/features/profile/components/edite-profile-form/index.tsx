import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import Card from '#/shared/components/ui/card'
import { Button } from '#/shared/components/ui/button'
import LinkButton from '#/shared/components/ui/button/link-button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/shared/components/ui/form'
import { Textarea } from '#/shared/components/ui/textarea'

import {
  PROFILE_BIO_MAX,
  editProfileFormSchema,
} from '../../lib/edit-profile-form'
import type { EditProfileFormValues } from '../../lib/edit-profile-form'
import useUpdateProfile from '../../service/use-update-profile'
import UrlAddField from './url-add-field'
import { useServerFn } from '@tanstack/react-start'
import { getProfileFn } from '../../server/get-profile.functions'

function EditProfileForm() {
  const navigate = useNavigate()
  const getProfile = useServerFn(getProfileFn)
  const updateProfile = useUpdateProfile()

  const form = useForm<EditProfileFormValues>({
    resolver: standardSchemaResolver(editProfileFormSchema),
    defaultValues: async () => {
      const profile = await getProfile()
      return {
        bio: profile.bio ?? '',
        links: profile.links.map((link) => ({
          label: link.label,
          url: link.url,
        })),
      }
    },
  })

  const {
    control,
    formState: { isValid, isSubmitting, errors },
  } = form

  const bioValue = useWatch({ control, name: 'bio' })

  const onSubmit = useCallback(
    async (values: EditProfileFormValues) => {
      try {
        await updateProfile.mutateAsync({
          bio: values.bio,
          links: values.links,
        })

        await navigate({ to: '/profile' })
      } catch (error) {
        form.setError('root', {
          message:
            error instanceof Error ? error.message : 'Failed to update profile',
        })
      }
    },
    [form, navigate, updateProfile],
  )

  const isPending = isSubmitting || updateProfile.isPending


  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={(event) => {
          void form.handleSubmit(onSubmit)(event)
        }}
      >
        <Card
          wrapperProps={{ className: 'w-full' }}
          cardHeaderProps={{
            className: 'space-y-1 border-b pb-4',
            children: (
              <>
                <h1 className="text-lg font-semibold">Edit profile</h1>
                <p className="text-sm text-muted-foreground">
                  Update your bio and external links.
                </p>
              </>
            ),
          }}
          cardContentProps={{
            className: 'space-y-6 pt-2',
            children: (
              <>
                <FormField
                  control={control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between gap-2">
                        <FormLabel>Bio</FormLabel>
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {bioValue &&bioValue.length}/{PROFILE_BIO_MAX}
                        </span>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder="Tell people about yourself..."
                          rows={5}
                          maxLength={PROFILE_BIO_MAX}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <UrlAddField />
              </>
            ),
          }}
        />

        {errors.root?.message ? (
          <p className="text-sm text-destructive">{errors.root.message}</p>
        ) : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
          <LinkButton variant="outline" to="/profile" className="w-full sm:w-auto">
            Cancel
          </LinkButton>
          <Button type="submit" disabled={!isValid || isPending} className="w-full sm:w-auto">
            {isPending ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default EditProfileForm
