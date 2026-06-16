import { useNavigate } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'

import Card from '#/shared/components/ui/card'

import { useCreateFlowSubmit } from '../../context/create-flow-context'
import type { SetupTagItemFormValues } from '../../lib/setup-tag-item-form'
import {
  createTagItemDraft,
  tagItemDraftToInput,
  tagItemsFromDraft,
} from '../../lib/tag-item-draft'
import type { TagItemDraft } from '../../lib/tag-item-draft'
import useGetSetupDraft from '../../service/use-get-setup-draft'
import useUpdateSetupItems from '../../service/use-update-setup-items'
import SetupTagsHeader from './setup-tags-header'
import TagCanvas from './tag-canvas'
import TagItemDialog from './tag-item-dialog'
import TagItemList from './tag-item-list'

type SetupTagsProps = {
  setupId: string
}

type PendingTag = {
  x: number
  y: number
  clientId?: string
}

function SetupTags({ setupId }: SetupTagsProps) {
  const navigate = useNavigate()
  const draftQuery = useGetSetupDraft(setupId)
  const updateSetupItems = useUpdateSetupItems()

  const [items, setItems] = useState<TagItemDraft[] | null>(null)
  const [activeItemId, setActiveItemId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [pendingTag, setPendingTag] = useState<PendingTag | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    if (draftQuery.data && items === null) {
      setItems(tagItemsFromDraft(draftQuery.data.items))
    }
  }, [draftQuery.data, items])

  const activeItem =
    items?.find((item) => item.clientId === activeItemId) ?? null
  const imageUrl = draftQuery.data?.imageUrl ?? null
  const taggedItems = items ?? []

  const handleImageClick = useCallback((position: { x: number; y: number }) => {
    setPendingTag(position)
    setActiveItemId(null)
    setDialogOpen(true)
  }, [])

  const handleMarkerClick = useCallback(
    (clientId: string) => {
      const item = taggedItems.find((entry) => entry.clientId === clientId)

      if (!item) {
        return
      }

      setActiveItemId(clientId)
      setPendingTag({ x: item.x, y: item.y, clientId })
      setDialogOpen(true)
    },
    [taggedItems],
  )

  const handleDialogSubmit = useCallback(
    (values: SetupTagItemFormValues) => {
      if (!pendingTag) {
        return
      }

      if (pendingTag.clientId) {
        setItems((current) =>
          (current ?? []).map((item) =>
            item.clientId === pendingTag.clientId
              ? { ...item, name: values.name, url: values.url }
              : item,
          ),
        )
        setActiveItemId(pendingTag.clientId)
      } else {
        const newItem = createTagItemDraft({
          name: values.name,
          url: values.url,
          x: pendingTag.x,
          y: pendingTag.y,
        })
        setItems((current) => [...(current ?? []), newItem])
        setActiveItemId(newItem.clientId)
      }

      setPendingTag(null)
      setSubmitError(null)
    },
    [pendingTag],
  )

  const handleRemoveItem = useCallback((clientId: string) => {
    setItems((current) =>
      (current ?? []).filter((item) => item.clientId !== clientId),
    )
    setActiveItemId((current) => (current === clientId ? null : current))
  }, [])

  const handleContinue = useCallback(async () => {
    if (!items?.length) {
      return
    }

    try {
      setSubmitError(null)

      await updateSetupItems.mutateAsync({
        setupId,
        items: items.map(tagItemDraftToInput),
      })

      await navigate({
        to: '/create/$id/review',
        params: { id: setupId },
      })
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to save tagged items',
      )
    }
  }, [items, navigate, setupId, updateSetupItems])

  const isReady = taggedItems.length > 0

  useCreateFlowSubmit({
    submit: handleContinue,
    isReady: isReady && !draftQuery.isLoading && Boolean(imageUrl),
    isSubmitting: updateSetupItems.isPending,
    hint: isReady
      ? `${taggedItems.length} item${taggedItems.length === 1 ? '' : 's'} tagged. Continue to review.`
      : 'Click on the image to tag at least one item.',
    error: submitError,
  })

  if (draftQuery.isLoading || items === null) {
    return null
  }

  if (!imageUrl) {
    return (
      <section className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
        No setup image found. Upload an image first to start tagging items.
      </section>
    )
  }

  return (
    <>
      <section className="w-full">
        <Card
          wrapperProps={{ className: 'w-full' }}
          cardHeaderProps={{
            className: 'space-y-3 border-b pb-6',
            children: <SetupTagsHeader />,
          }}
          cardContentProps={{
            className: 'pt-2',
            children: (
              <div className="grid min-h-[min(72vh,900px)] gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
                <TagCanvas
                  imageUrl={imageUrl}
                  items={taggedItems}
                  activeItemId={activeItemId}
                  onImageClick={handleImageClick}
                  onMarkerClick={handleMarkerClick}
                />
                <aside className="flex min-h-0 flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Tagged items</h3>
                    <span className="text-xs text-muted-foreground">
                      {taggedItems.length} total
                    </span>
                  </div>
                  <div className="min-h-0 flex-1 overflow-y-auto">
                    <TagItemList
                      items={taggedItems}
                      activeItemId={activeItemId}
                      onSelect={handleMarkerClick}
                      onRemove={handleRemoveItem}
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
        isEditing={Boolean(pendingTag?.clientId)}
        initialValues={
          activeItem
            ? { name: activeItem.name, url: activeItem.url }
            : undefined
        }
        onSubmit={handleDialogSubmit}
      />
    </>
  )
}

export default SetupTags
