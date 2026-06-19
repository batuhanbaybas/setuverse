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
import type { SetupItem } from '../../lib/setup-item'
import type { SetupTagItemFormValues } from '../../lib/setup-tag-item-form'
import useAddSetupItem from '../../service/use-add-setup-item'
import useDeleteSetupItem from '../../service/use-delete-setup-item'
import usePublishSetup from '../../service/use-publish-setup'
import useUpdateSetupInfo from '../../service/use-update-setup-info'
import useUpdateSetupItem from '../../service/use-update-setup-item'
import CategoryOption from '../setup-info/category-option'
import TagCanvas from '../setup-tags/tag-canvas'
import TagItemDialog from '../setup-tags/tag-item-dialog'
import TagItemList from '../setup-tags/tag-item-list'
import ReviewImageSection from './review-image-section'
import { getSetupDraftFn } from '../../server/get-setup-draft.functions'

type SetupReviewProps = {
  setupId: string
}

type PendingTag = {
  x: number
  y: number
  itemId?: string
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

  const items: SetupItem[] = draftQuery.data?.items ?? []
  const imageUrl = draftQuery.data?.imageUrl ?? null

  const [activeItemId, setActiveItemId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [pendingTag, setPendingTag] = useState<PendingTag | null>(null)

  const activeItem = items.find((item) => item.id === activeItemId) ?? null
  const isItemMutating =
    addItem.isPending || updateItem.isPending || deleteItem.isPending

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

  // --- Tag handlers ---

  const handleImageClick = useCallback((position: { x: number; y: number }) => {
    setPendingTag(position)
    setActiveItemId(null)
    setDialogOpen(true)
  }, [])

  const handleMarkerClick = useCallback(
    (id: string) => {
      const item = items.find((entry) => entry.id === id)
      if (!item) return

      setActiveItemId(id)
      setPendingTag({ x: item.x, y: item.y, itemId: id })
      setDialogOpen(true)
    },
    [items],
  )

  const handleTagSubmit = useCallback(
    async (values: SetupTagItemFormValues) => {
      if (!pendingTag) return

      if (pendingTag.itemId) {
        const result = await updateItem.mutateAsync({
          itemId: pendingTag.itemId,
          name: values.name,
          url: values.url,
        })
        setActiveItemId(result.id)
      } else {
        const result = await addItem.mutateAsync({
          setupId,
          name: values.name,
          url: values.url,
          x: pendingTag.x,
          y: pendingTag.y,
        })
        setActiveItemId(result.id)
      }

      setPendingTag(null)
    },
    [pendingTag, setupId, addItem, updateItem],
  )

  const handleRemoveItem = useCallback(
    (id: string) => {
      deleteItem.mutate(id)
      setActiveItemId((current) => (current === id ? null : current))
    },
    [deleteItem],
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

        await navigate({ to: '/' })
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
            children: (
              <h2 className="text-lg font-semibold">Setup image</h2>
            ),
          }}
          cardContentProps={{
            className: '',
            children: (
              <ReviewImageSection setupId={setupId} imageUrl={imageUrl} />
            ),
          }}
        />

        {/* Setup details — editable form */}
        <Card
          wrapperProps={{ className: 'w-full' }}
          cardHeaderProps={{
            className: 'space-y-1 border-b pb-4',
            children: (
              <h2 className="text-lg font-semibold">Setup details</h2>
            ),
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
            children: (
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Tagged items</h2>
                <span className="text-sm text-muted-foreground">
                  {items.length} item{items.length === 1 ? '' : 's'}
                </span>
              </div>
            ),
          }}
          cardContentProps={{
            className: '',
            children: imageUrl ? (
              <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(240px,280px)]">
                <TagCanvas
                  imageUrl={imageUrl}
                  items={items}
                  activeItemId={activeItemId}
                  onImageClick={handleImageClick}
                  onMarkerClick={handleMarkerClick}
                />
                <aside className="flex max-h-72 flex-col gap-3 md:max-h-none">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Items</h3>
                  </div>
                  <div className="min-h-0 flex-1 overflow-y-auto">
                    <TagItemList
                      items={items}
                      activeItemId={activeItemId}
                      onSelect={handleMarkerClick}
                      onRemove={handleRemoveItem}
                      isRemoving={deleteItem.isPending}
                    />
                  </div>
                </aside>
              </div>
            ) : (
              <p className="py-4 text-center text-sm text-muted-foreground">
                Upload an image first to manage tagged items.
              </p>
            ),
          }}
        />
      </section>

      <TagItemDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) setPendingTag(null)
        }}
        isEditing={Boolean(pendingTag?.itemId)}
        isPending={isItemMutating}
        initialValues={
          activeItem
            ? { name: activeItem.name, url: activeItem.url }
            : undefined
        }
        onSubmit={handleTagSubmit}
      />

      <CreateFlowFooter
        onSubmit={() => form.handleSubmit(onSubmit)()}
        isReady={isValid && items.length > 0}
        isSubmitting={isPending}
        hint="Review your setup details below, then publish."
        error={errors.root?.message ?? null}
        buttonLabel="Publish"
      />
    </Form>
  )
}

export default SetupReview
