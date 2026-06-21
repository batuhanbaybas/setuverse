import Icon from '#/shared/components/icons'
import { cn } from '#/shared/lib/utils'

import type { SetupDetailItem } from '../server/get-setup-detail'

type SetupDetailItemListProps = {
  items: SetupDetailItem[]
  activeItemId?: string | null
  onItemClick?: (id: string) => void
}

function SetupDetailItemList({
  items,
  activeItemId = null,
  onItemClick,
}: SetupDetailItemListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed px-6 py-8 text-center text-sm text-muted-foreground">
        No items added to this setup.
      </div>
    )
  }

  return (
    <ul className="min-h-0 space-y-2 overflow-y-auto pr-1">
      {items.map((item, index) => (
        <li key={item.id}>
          <button
            type="button"
            className={cn(
              'w-full rounded-lg border bg-card p-3 text-left transition-colors',
              activeItemId === item.id && 'border-primary bg-primary/5',
            )}
            onClick={() => onItemClick?.(item.id)}
          >
            <div className="flex items-start gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-w-0 max-w-full items-center gap-1.5 text-sm font-medium leading-tight text-primary hover:underline"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <span className="truncate">{item.name}</span>
                    <Icon name="external-link" className="size-3.5" />
                  </a>
                ) : (
                  <p className="text-sm font-medium leading-tight">{item.name}</p>
                )}
              </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default SetupDetailItemList
