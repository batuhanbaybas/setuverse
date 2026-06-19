import Icon from '#/shared/components/icons'
import { Button } from '#/shared/components/ui/button'
import Tooltip from '#/shared/components/ui/tooltip-root'
import useDeleteSetupItem from '../../service/setup-items/use-delete-setup-item'

import useGetSetupItem from '../../service/setup-items/use-get-setup-item-by-setup-id'
import TagItemDialog from '../setup-tags/tag-item-dialog/tag-item-dialog'

type TagItemListProps = {
  setupId: string
}

function TagItemList({ setupId }: TagItemListProps) {
  const { data: items } = useGetSetupItem(setupId)
  const deleteItem = useDeleteSetupItem(setupId)
  if (items?.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
        No tags yet. Click on the image to add your first item.
      </div>
    )
  }

  return (
    <ul className="w-full space-y-2">
      {items?.map((item, index) => (
        <li key={item.id} className="w-full min-w-0">
          <div className="flex w-full min-w-0 items-center gap-1 rounded-lg border bg-card pr-1">
            <TagItemDialog
              itemId={item.id}
              setupId={setupId}
              triggerProps={{
                asChild: true,
                children: (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto min-w-0 w-full flex-1 justify-start gap-3 overflow-hidden whitespace-normal rounded-md px-3 py-2.5 text-left hover:bg-muted/60"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                      {index + 1}
                    </span>
                    <Tooltip
                      triggerProps={{
                        asChild: true,
                        children: (
                          <div className="min-w-0 flex-1 overflow-hidden text-left">
                            <p className="truncate text-sm font-medium leading-tight">
                              {item.name}
                            </p>
                            {item.url ? (
                              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                                {item.url}
                              </p>
                            ) : null}
                          </div>
                        ),
                      }}
                      contentProps={{
                        sideOffset: 8,
                        className: 'max-w-xs px-3.5 py-2.5 text-left',
                        children: (
                          <div className="space-y-2">
                            <p className="text-sm leading-snug font-medium wrap-break-word">
                              {item.name}
                            </p>
                            {item.url ? (
                              <>
                                <div className="h-px bg-background/20" />
                                <p className="text-xs leading-relaxed text-background/75 break-all">
                                  {item.url}
                                </p>
                              </>
                            ) : null}
                          </div>
                        ),
                      }}
                    />
                  </Button>
                ),
              }}
            />

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0 text-muted-foreground hover:text-destructive"
              aria-label={`Remove ${item.name}`}
              onClick={() => deleteItem.mutate(item.id)}
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
