import Icon from '#/shared/components/icons'
import { Button } from '#/shared/components/ui/button'
import { cn } from '#/shared/lib/utils'

import type { TagItemDraft } from '../../lib/tag-item-draft'

type TagItemListProps = {
  items: TagItemDraft[]
  activeItemId: string | null
  onSelect: (clientId: string) => void
  onRemove: (clientId: string) => void
}

function TagItemList({
  items,
  activeItemId,
  onSelect,
  onRemove,
}: TagItemListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
        No tags yet. Click on the image to add your first item.
      </div>
    )
  }

  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={item.clientId}>
          <div
            className={cn(
              'flex items-start gap-3 rounded-lg border p-3 transition-colors',
              activeItemId === item.clientId && 'border-primary bg-primary/5',
            )}
          >
            <button
              type="button"
              className="min-w-0 flex-1 text-left"
              onClick={() => onSelect(item.clientId)}
            >
              <p className="text-sm font-medium">
                {index + 1}. {item.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">{item.url}</p>
            </button>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`Remove ${item.name}`}
              onClick={() => onRemove(item.clientId)}
            >
              <Icon name="x" />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TagItemList
