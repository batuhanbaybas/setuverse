import Icon from '#/shared/components/icons'
import { Button } from '#/shared/components/ui/button'
import { cn } from '#/shared/lib/utils'

import type { SetupItem } from '../../lib/setup-item'

type TagItemListProps = {
  items: SetupItem[]
  activeItemId: string | null
  onSelect: (id: string) => void
  onRemove: (id: string) => void
  isRemoving?: boolean
}

function TagItemList({
  items,
  activeItemId,
  onSelect,
  onRemove,
  isRemoving = false,
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
        <li key={item.id}>
          <div
            className={cn(
              'flex items-start gap-3 rounded-lg border p-3 transition-colors',
              activeItemId === item.id && 'border-primary bg-primary/5',
            )}
          >
            <button
              type="button"
              className="min-w-0 flex-1 text-left"
              onClick={() => onSelect(item.id)}
            >
              <p className="text-sm font-medium">
                {index + 1}. {item.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">{item.url}</p>
            </button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0"
              aria-label={`Remove ${item.name}`}
              disabled={isRemoving}
              onClick={() => onRemove(item.id)}
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
