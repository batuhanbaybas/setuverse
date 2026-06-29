import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useNavigate } from '@tanstack/react-router'
import { useCallback, useMemo, useState } from 'react'
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
import type { SetupTagItemFormValues } from '../../lib/setup-tag-item-form'
import useAddSetupItem from '../../service/setup-items/use-add-setup-item'
import useDeleteSetupItem from '../../service/setup-items/use-delete-setup-item'
import usePublishSetup from '../../service/use-publish-setup'
import useUpdateSetupInfo from '../../service/setup-info/use-update-setup-info'
import useUpdateSetupItem from '../../service/setup-items/use-update-setup-item'
import CategoryOption from '../setup-info/category-option'
import TagCanvas from '../share/tag-canvas'
import TagItemDialog from '../setup-tags/tag-item-dialog/tag-item-dialog'
import TagItemList from '../share/tag-item-list'
import ReviewImageSection from './review-image-section'
import { getSetupDraftFn } from '../../server/get-setup-draft.functions'
import TagedItemsSection from './tag-image-card/taged-items-section'

type SetupReviewProps = {
  setupId: string
}

function SetupReview({ setupId }: SetupReviewProps) {
  const navigate = useNavigate()
  const categoriesQuery = useGetCategories()
  const updateSetupInfo = useUpdateSetupInfo()
  const publishSetup = usePublishSetup()
  const addItem = useAddSetupItem(setupId)
  const updateItem = useUpdateSetupItem(setupId)
  const deleteItem = useDeleteSetupItem(setupId)

  const categories = useMemo(
    () =>
      (categoriesQuery.data ?? []).filter((category) => category.slug !== '/'),
    [categoriesQuery.data],
  )

  const form = useForm<SetupInfoFormValues>({
    resolver: standardSchemaResolver(setupInfoFormSchema),
    defaultValues: async () => {
      const draft = await getSetupDraftFn({ data: { setupId } })
      return {
        title: draft.title ?? '',
        description: draft.description ?? '',
        categoryId: draft.categoryId ?? '',
      }
    },
    mode: 'onChange',
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

  // --- Publish ---

  const onSubmit = useCallback(
    async (values: SetupInfoFormValues) => {
      try {
        await updateSetupInfo.mutateAsync({
          setupId,
          title: values.title,
          description: values.description.trim() || undefined,
          categoryId: values.categoryId,
        })

        await publishSetup.mutateAsync({ setupId })

        await navigate({ to: '/setups' })
      } catch (error) {
        form.setError('root', {
          message:
            error instanceof Error ? error.message : 'Failed to publish setup',
        })
      }
    },
    [form, navigate, setupId, updateSetupInfo, publishSetup],
  )

  const isPending =
    isSubmitting || updateSetupInfo.isPending || publishSetup.isPending

  return (
    <Form {...form}>
      <section className="flex min-h-0 flex-1 flex-col gap-6">
        {/* Image — changeable */}
        <Card
          wrapperProps={{ className: 'w-full' }}
          cardHeaderProps={{
            className: 'space-y-1 border-b pb-4',
            children: <h2 className="text-lg font-semibold">Setup image</h2>,
          }}
          cardContentProps={{
            children: <ReviewImageSection />,
          }}
        />

        {/* Setup details — editable form */}
        <Card
          wrapperProps={{ className: 'w-full' }}
          cardHeaderProps={{
            className: 'space-y-1 border-b pb-4',
            children: <h2 className="text-lg font-semibold">Setup details</h2>,
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
                            {field.value ? field.value.length : 0}/
                            {SETUP_INFO_TITLE_MAX}
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
                          {field.value ? field.value.length : 0}/
                          {SETUP_INFO_DESCRIPTION_MAX}
                        </span>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder="Tell people about your setup..."
                          rows={4}
                          className="min-h-24 sm:min-h-32"
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

        {/* Tagged items — interactive canvas */}
        <Card
          wrapperProps={{ className: 'w-full' }}
          cardHeaderProps={{
            className: 'space-y-1 border-b pb-4',
            children: <TagedItemsSection setupId={setupId} />,
          }}
          cardContentProps={{
            children: (
              <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(240px,280px)]">
                <TagCanvas setupId={setupId} />
                <aside className="flex max-h-72 flex-col gap-3 md:max-h-none">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Items</h3>
                  </div>
                  <div className="min-h-0 flex-1 overflow-y-auto">
                    <TagItemList setupId={setupId} />
                  </div>
                </aside>
              </div>
            ),
          }}
        />
      </section>

      <CreateFlowFooter
        onSubmit={() => form.handleSubmit(onSubmit)()}
        isReady={isValid}
        isSubmitting={isPending}
        hint="Review your setup details below, then publish."
        error={errors.root?.message ?? null}
        buttonLabel="Publish"
      />
    </Form>
  )
}

export default SetupReview
