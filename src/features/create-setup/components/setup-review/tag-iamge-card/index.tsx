import Card from '#/shared/components/ui/card'
import React from 'react'

function TagImageCard() {
  return (
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
  )
}

export default TagImageCard