import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useNavigate } from '@tanstack/react-router'
import { useCallback, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import useGetCategories from '#/features/home/service/use-get-categories'
import Card from '#/shared/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/shared/components/ui/form'
import { Input } from '#/shared/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/shared/components/ui/select'
import { Textarea } from '#/shared/components/ui/textarea'

import CreateFlowFooter from '../create-flow-footer'
import {
  SETUP_INFO_DESCRIPTION_MAX,
  SETUP_INFO_TITLE_MAX,
  setupInfoFormSchema,
} from '../../lib/setup-info-form'
import type { SetupInfoFormValues } from '../../lib/setup-info-form'
import useUpdateSetupInfo from '../../service/use-update-setup-info'
import CategoryOption from './category-option'
import SetupInfoHeader from './setup-info-header'
import { getSetupDraftFn } from '../../server/get-setup-draft.functions'

type SetupInfoFormProps = {
  setupId: string
}

function SetupInfoForm({ setupId }: SetupInfoFormProps) {
  const navigate = useNavigate()
  const categoriesQuery = useGetCategories()
  const updateSetupInfo = useUpdateSetupInfo()

  const categories = useMemo(
    () =>
      (categoriesQuery.data ?? []).filter((category) => category.slug !== '/'),
    [categoriesQuery.data],
  )

  const form = useForm<SetupInfoFormValues>({
    resolver: standardSchemaResolver(setupInfoFormSchema),
    defaultValues:  async () => {
      const draft = await getSetupDraftFn({ data: { setupId } })
      return {
        title: draft.title ?? '',
        description: draft.description ?? '',
        categoryId: draft.categoryId ?? '',
      }
    },
  })

  const {
    formState: { isValid, isSubmitting, errors },
  } = form

  const selectedCategoryId = useWatch({
    control: form.control,
    name: 'categoryId',
  })

  const selectedCategory = useMemo(
    () => categories.find((category) => category.id === selectedCategoryId),
    [categories, selectedCategoryId],
  )

  const onSubmit = useCallback(
    async (values: SetupInfoFormValues) => {
      try {
        await updateSetupInfo.mutateAsync({
          setupId,
          title: values.title,
          description: values.description.trim() || undefined,
          categoryId: values.categoryId,
        })

        await navigate({
          to: '/create/$id/tags',
          params: { id: setupId },
        })
      } catch (error) {
        form.setError('root', {
          message:
            error instanceof Error ? error.message : 'Failed to save setup info',
        })
      }
    },
    [form, navigate, setupId, updateSetupInfo],
  )

  const isPending = isSubmitting || updateSetupInfo.isPending


  return (
    <Form {...form}>
      <section className="flex min-h-0 flex-1 flex-col">
        <Card
          wrapperProps={{ className: 'min-h-0 flex-1' }}
          cardHeaderProps={{
            className: 'space-y-2 border-b pb-4',
            children: <SetupInfoHeader />,
          }}
          cardContentProps={{
            className: 'space-y-6 pt-2',
            children: (
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between gap-2">
                          <FormLabel>
                            Title{' '}
                            <span className="text-destructive" aria-hidden>
                              *
                            </span>
                          </FormLabel>
                          <span className="text-xs text-muted-foreground tabular-nums">
                            {field.value.length}/{SETUP_INFO_TITLE_MAX}
                          </span>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="My desk setup"
                            autoComplete="off"
                            maxLength={SETUP_INFO_TITLE_MAX}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Category{' '}
                          <span className="text-destructive" aria-hidden>
                            *
                          </span>
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={categoriesQuery.isLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a category">
                                {selectedCategory ? (
                                  <CategoryOption
                                    icon={selectedCategory.icon}
                                    name={selectedCategory.name}
                                  />
                                ) : null}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                <CategoryOption
                                  icon={category.icon}
                                  name={category.name}
                                />
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between gap-2">
                        <FormLabel>Description</FormLabel>
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {field.value.length}/{SETUP_INFO_DESCRIPTION_MAX}
                        </span>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder="Tell people about your setup..."
                          rows={5}
                          className="min-h-24 sm:min-h-40"
                          maxLength={SETUP_INFO_DESCRIPTION_MAX}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ),
          }}
        />
      </section>

      <CreateFlowFooter
        onSubmit={() => form.handleSubmit(onSubmit)()}
        isReady={isValid}
        isSubmitting={isPending}
        hint="Fill in the details below to continue to tagging items."
        error={errors.root?.message ?? null}
      />
    </Form>
  )
}

export default SetupInfoForm
