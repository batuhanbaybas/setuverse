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
    <ul className="space-y-2">
      {items?.map((item, index) => (
        <li key={item.id}>
          <div className="flex items-start gap-3 rounded-lg border p-3 transition-colors">
            <TagItemDialog
              itemId={item.id}
              setupId={setupId}
              triggerProps={{
                children: (
                  <Button
                    variant="outline"
                    size="sm"
                    className="min-w-0 flex-1 text-left"
                  >
                    <Tooltip
                      triggerProps={{
                        children: (
                          <div className="min-w-0 flex-1 truncate text-left flex flex-col gap-1 p-2">
                            <p className="text-sm font-medium truncate">
                              {index + 1}. {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {item.url}
                            </p>
                          </div>
                        ),
                      }}
                      contentProps={{
                        children: (
                          <>
                            <p className="text-sm font-medium ">
                              {index + 1}. {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground ">
                              {item.url}
                            </p>
                          </>
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
              className="shrink-0"
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
