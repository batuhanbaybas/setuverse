import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'

import Card from '#/shared/components/ui/card'

import CreateFlowFooter from '../create-flow-footer'
import useAddSetupItem from '../../service/setup-items/use-add-setup-item'
import useUpdateSetupItem from '../../service/setup-items/use-update-setup-item'
import useDeleteSetupItem from '../../service/setup-items/use-delete-setup-item'
import SetupTagsHeader from './setup-tags-header'
import TagCanvas from '../share/tag-canvas'
import TagItemList from '../share/tag-item-list'
import useGetSetupItem from '../../service/setup-items/use-get-setup-item-by-setup-id'

type SetupTagsProps = {
  setupId: string
}

function SetupTags({ setupId }: SetupTagsProps) {
  const navigate = useNavigate()
  const itemsQuery = useGetSetupItem(setupId)
  const updateItem = useUpdateSetupItem(setupId)
  const deleteItem = useDeleteSetupItem(setupId)

  const handleContinue = useCallback(async () => {
    if (!itemsQuery.data?.length) {
      return
    }

    await navigate({
      to: '/create/$id/review',
      params: { id: setupId },
    })
  }, [itemsQuery.data?.length, navigate, setupId])

  const isReady = Boolean(itemsQuery.data?.length && itemsQuery.data.length > 0)

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
                <TagCanvas setupId={setupId} />
                <aside className="flex max-h-72 flex-col gap-3 md:max-h-none">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Tagged items</h3>
                    <span className="text-xs text-muted-foreground">
                      {itemsQuery.data?.length} total
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
      </section>

      <CreateFlowFooter
        onSubmit={handleContinue}
        isReady={isReady}
        hint={
          isReady
            ? `${itemsQuery.data?.length} item${itemsQuery.data?.length === 1 ? '' : 's'} tagged. Continue to review.`
            : 'Click on the image to tag at least one item.'
        }
      />
    </>
  )
}

export default SetupTags
