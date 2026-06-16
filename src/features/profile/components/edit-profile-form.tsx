import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { LuPlus, LuTrash2 } from 'react-icons/lu'

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
import { Input } from '#/shared/components/ui/input'
import { Textarea } from '#/shared/components/ui/textarea'

import {
  PROFILE_BIO_MAX,
  PROFILE_LINKS_MAX,
  editProfileFormDefaultValues,
  editProfileFormSchema,
} from '../lib/edit-profile-form'
import type { EditProfileFormValues } from '../lib/edit-profile-form'
import useGetProfile from '../service/use-get-profile'
import useUpdateProfile from '../service/use-update-profile'

function EditProfileForm() {
  const navigate = useNavigate()
  const profileQuery = useGetProfile()
  const updateProfile = useUpdateProfile()

  const form = useForm<EditProfileFormValues>({
    resolver: standardSchemaResolver(editProfileFormSchema),
    defaultValues: editProfileFormDefaultValues,
    values: profileQuery.data
      ? {
          bio: profileQuery.data.bio ?? '',
          links: profileQuery.data.links.map((link) => ({
            label: link.label,
            url: link.url,
          })),
        }
      : undefined,
    mode: 'onChange',
  })

  const {
    control,
    formState: { isValid, isSubmitting, errors },
    watch,
  } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  })

  const bioValue = watch('bio')
  const canAddLink = fields.length < PROFILE_LINKS_MAX

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

  if (profileQuery.isLoading) {
    return null
  }

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
                          {bioValue.length}/{PROFILE_BIO_MAX}
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

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h2 className="text-sm font-medium">Links</h2>
                      <p className="text-sm text-muted-foreground">
                        Add websites or social profiles.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={!canAddLink}
                      onClick={() => append({ label: '', url: '' })}
                    >
                      <LuPlus className="size-4" aria-hidden />
                      Add link
                    </Button>
                  </div>

                  {fields.length === 0 ? (
                    <p className="rounded-lg border border-dashed px-4 py-6 text-center text-sm text-muted-foreground">
                      No links yet. Add one to share your profiles or website.
                    </p>
                  ) : (
                    <ul className="space-y-4">
                      {fields.map((field, index) => (
                        <li
                          key={field.id}
                          className="grid gap-4 rounded-lg border p-4 sm:grid-cols-[1fr_1fr_auto]"
                        >
                          <FormField
                            control={control}
                            name={`links.${index}.label`}
                            render={({ field: linkField }) => (
                              <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="GitHub"
                                    autoComplete="off"
                                    {...linkField}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={control}
                            name={`links.${index}.url`}
                            render={({ field: linkField }) => (
                              <FormItem>
                                <FormLabel>URL</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="https://github.com/username"
                                    autoComplete="off"
                                    {...linkField}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex items-end">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              aria-label="Remove link"
                              onClick={() => remove(index)}
                            >
                              <LuTrash2 className="size-4" aria-hidden />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {errors.links?.root?.message ? (
                    <p className="text-sm text-destructive">
                      {errors.links.root.message}
                    </p>
                  ) : null}
                </div>
              </>
            ),
          }}
        />

        {errors.root?.message ? (
          <p className="text-sm text-destructive">{errors.root.message}</p>
        ) : null}

        <div className="flex flex-wrap items-center justify-end gap-3">
          <LinkButton variant="outline" to="/profile">
            Cancel
          </LinkButton>
          <Button type="submit" disabled={!isValid || isPending}>
            {isPending ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default EditProfileForm
