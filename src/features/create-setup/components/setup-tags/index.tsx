import { useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

import Card from '#/shared/components/ui/card'

import CreateFlowFooter from '../create-flow-footer'
import type { SetupTagItemFormValues } from '../../lib/setup-tag-item-form'
import type { SetupItem } from '../../lib/setup-item'
import useAddSetupItem from '../../service/use-add-setup-item'
import useUpdateSetupItem from '../../service/use-update-setup-item'
import useDeleteSetupItem from '../../service/use-delete-setup-item'
import useGetSetupDraft from '../../service/use-get-setup-draft'
import SetupTagsHeader from './setup-tags-header'
import TagCanvas from './tag-canvas'
import TagItemDialog from './tag-item-dialog'
import TagItemList from './tag-item-list'

type SetupTagsProps = {
  imageUrl: string
  setupId: string
  initialItems?: SetupItem[]
}

type PendingTag = {
  x: number
  y: number
  itemId?: string
}

function SetupTags({ imageUrl, setupId, initialItems = [] }: SetupTagsProps) {
  const navigate = useNavigate()
  const draftQuery = useGetSetupDraft(setupId)
  const addItem = useAddSetupItem(setupId)
  const updateItem = useUpdateSetupItem(setupId)
  const deleteItem = useDeleteSetupItem(setupId)

  const items: SetupItem[] = draftQuery.data?.items ?? initialItems

  const [activeItemId, setActiveItemId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [pendingTag, setPendingTag] = useState<PendingTag | null>(null)

  const activeItem = items.find((item) => item.id === activeItemId) ?? null

  const isMutating = addItem.isPending || updateItem.isPending || deleteItem.isPending

  const handleImageClick = useCallback((position: { x: number; y: number }) => {
    setPendingTag(position)
    setActiveItemId(null)
    setDialogOpen(true)
  }, [])

  const handleMarkerClick = useCallback(
    (id: string) => {
      const item = items.find((entry) => entry.id === id)

      if (!item) {
        return
      }

      setActiveItemId(id)
      setPendingTag({ x: item.x, y: item.y, itemId: id })
      setDialogOpen(true)
    },
    [items],
  )

  const handleDialogSubmit = useCallback(
    async (values: SetupTagItemFormValues) => {
      if (!pendingTag) {
        return
      }

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

  const handleContinue = useCallback(async () => {
    if (!items.length) {
      return
    }

    await navigate({
      to: '/create/$id/review',
      params: { id: setupId },
    })
  }, [items.length, navigate, setupId])

  const isReady = items.length > 0

  return (
    <>
      <section className="w-full">
        <Card
          wrapperProps={{ className: 'w-full' }}
          cardHeaderProps={{
            className: 'space-y-2 border-b pb-4',
            children: <SetupTagsHeader />,
          }}
          cardContentProps={{
            className: '',
            children: (
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
                    <h3 className="text-sm font-medium">Tagged items</h3>
                    <span className="text-xs text-muted-foreground">
                      {items.length} total
                    </span>
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
            ),
          }}
        />
      </section>

      <TagItemDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) {
            setPendingTag(null)
          }
        }}
        isEditing={Boolean(pendingTag?.itemId)}
        isPending={isMutating}
        initialValues={
          activeItem
            ? { name: activeItem.name, url: activeItem.url }
            : undefined
        }
        onSubmit={handleDialogSubmit}
      />

      <CreateFlowFooter
        onSubmit={handleContinue}
        isReady={isReady}
        hint={
          isReady
            ? `${items.length} item${items.length === 1 ? '' : 's'} tagged. Continue to review.`
            : 'Click on the image to tag at least one item.'
        }
      />
    </>
  )
}

export default SetupTags
