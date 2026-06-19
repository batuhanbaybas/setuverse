import Card from '#/shared/components/ui/card'
import TagCanvas from '../../share/tag-canvas'
import TagedItemsSection from './taged-items-section'
import TagItemList from '../../share/tag-item-list'

interface Props {
  setupId: string
}

function TagImageCard({ setupId }: Props) {
  return (
    <Card
      wrapperProps={{ className: 'w-full' }}
      cardHeaderProps={{
        className: 'space-y-1 border-b pb-4',
        children: <TagedItemsSection setupId={setupId} />,
      }}
      cardContentProps={{
        className: '',
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
  )
}

export default TagImageCard
