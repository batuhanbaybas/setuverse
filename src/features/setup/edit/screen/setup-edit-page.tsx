import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useNavigate } from '@tanstack/react-router'
import { useCallback, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import CategoryOption from '#/features/create-setup/components/setup-info/category-option'
import TagCanvas from '#/features/create-setup/components/share/tag-canvas'
import TagItemList from '#/features/create-setup/components/share/tag-item-list'
import useGetSetupItem from '#/features/create-setup/service/setup-items/use-get-setup-item-by-setup-id'
import useGetCategories from '#/features/home/service/use-get-categories'
import EmptyState from '#/shared/components/empty-state'
import { Button } from '#/shared/components/ui/button'
import LinkButton from '#/shared/components/ui/button/link-button'
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

import {
  SETUP_EDIT_DESCRIPTION_MAX,
  SETUP_EDIT_TITLE_MAX,
  setupEditFormSchema,
} from '../lib/setup-edit-form'
import type { SetupEditFormValues } from '../lib/setup-edit-form'
import useGetSetupForEdit from '../service/use-get-setup-for-edit'
import useUpdatePublishedSetupInfo from '../service/use-update-published-setup-info'

type SetupEditPageProps = {
  setupId: string
}

function SetupEditPage({ setupId }: SetupEditPageProps) {
  const navigate = useNavigate()
  const setupQuery = useGetSetupForEdit(setupId)
  const itemsQuery = useGetSetupItem(setupId)
  const categoriesQuery = useGetCategories()
  const updateSetupInfo = useUpdatePublishedSetupInfo()

  const categories = useMemo(
    () =>
      (categoriesQuery.data ?? []).filter((category) => category.slug !== '/'),
    [categoriesQuery.data],
  )

  const form = useForm<SetupEditFormValues>({
    resolver: standardSchemaResolver(setupEditFormSchema),
    values: {
      title: setupQuery.data?.title ?? '',
      description: setupQuery.data?.description ?? '',
      categoryId: setupQuery.data?.categoryId ?? '',
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

  const onSubmit = useCallback(
    async (values: SetupEditFormValues) => {
      if (!itemsQuery.data?.length) {
        form.setError('root', {
          message: 'Add at least one tagged item before saving.',
        })
        return
      }

      try {
        await updateSetupInfo.mutateAsync({
          setupId,
          title: values.title,
          description: values.description.trim() || undefined,
          categoryId: values.categoryId,
        })

        await navigate({
          to: '/setup/$id',
          params: { id: setupId },
        })
      } catch (error) {
        form.setError('root', {
          message:
            error instanceof Error ? error.message : 'Failed to save changes',
        })
      }
    },
    [form, itemsQuery.data?.length, navigate, setupId, updateSetupInfo],
  )

  const isPending = isSubmitting || updateSetupInfo.isPending
  const hasItems = Boolean(itemsQuery.data?.length)

  if (setupQuery.isPending) {
    return (
      <section className="py-6 sm:py-8">
        <div className="py-8 text-center text-sm text-muted-foreground">
          Loading setup...
        </div>
      </section>
    )
  }

  if (setupQuery.isError) {
    return (
      <section className="py-6 sm:py-8">
        <EmptyState
          title="Setup not found"
          description="This setup may have been removed or you do not have permission to edit it."
        />
      </section>
    )
  }

  const setup = setupQuery.data

  return (
    <Form {...form}>
      <div className="flex min-h-0 flex-1 flex-col gap-6 py-6 sm:py-8">
        <div className="space-y-2">
          <LinkButton
            to={`/setup/${setupId}`}
            variant="ghost"
            size="sm"
            className="-ml-2 text-muted-foreground hover:text-foreground"
          >
            Back to setup
          </LinkButton>
          <h1 className="text-2xl font-semibold tracking-tight">Edit setup</h1>
          <p className="text-sm text-muted-foreground">
            Update your title, category, description, and tagged items.
          </p>
        </div>

        <Card
          wrapperProps={{ className: 'w-full' }}
          cardHeaderProps={{
            className: 'space-y-1 border-b pb-4',
            children: (
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">Tagged items</h2>
                <p className="text-sm text-muted-foreground">
                  Click on the image to add or update tags.
                </p>
              </div>
            ),
          }}
          cardContentProps={{
            children: (
              <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(240px,280px)]">
                <TagCanvas setupId={setupId} imageUrl={setup.imageUrl} />
                <aside className="flex max-h-72 flex-col gap-3 md:max-h-none">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Items</h3>
                    <span className="text-xs text-muted-foreground">
                      {itemsQuery.data?.length ?? 0} total
                    </span>
                  </div>
                  <div className="min-h-0 flex-1 overflow-y-auto">
                    <TagItemList setupId={setupId} />
                  </div>
                </aside>
              </div>
            ),
          }}
        />

        <form
          className="flex flex-col gap-6"
          onSubmit={(event) => {
            void form.handleSubmit(onSubmit)(event)
          }}
        >
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
                              {field.value ? field.value.length : 0}/
                              {SETUP_EDIT_TITLE_MAX}
                            </span>
                          </div>
                          <FormControl>
                            <Input
                              placeholder="My desk setup"
                              autoComplete="off"
                              maxLength={SETUP_EDIT_TITLE_MAX}
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
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
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
                            {SETUP_EDIT_DESCRIPTION_MAX}
                          </span>
                        </div>
                        <FormControl>
                          <Textarea
                            placeholder="Tell people about your setup..."
                            rows={4}
                            className="min-h-24 sm:min-h-32"
                            maxLength={SETUP_EDIT_DESCRIPTION_MAX}
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

          {!hasItems ? (
            <p className="text-sm text-muted-foreground">
              Add at least one tagged item before saving.
            </p>
          ) : null}

          {errors.root?.message ? (
            <p className="text-sm text-destructive">{errors.root.message}</p>
          ) : null}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <LinkButton
              to={`/setup/${setupId}`}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Cancel
            </LinkButton>
            <Button
              type="submit"
              disabled={!isValid || !hasItems || isPending}
              className="w-full sm:w-auto"
            >
              {isPending ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  )
}

export default SetupEditPage
