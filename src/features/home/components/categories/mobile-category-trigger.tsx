import { LuChevronDown } from 'react-icons/lu'

import Icon from '#/shared/components/icons'
import { Button } from '#/shared/components/ui/button'

import type { CategoryItem } from './types'

type MobileCategoryTriggerProps = {
  selected: CategoryItem
  onOpen: () => void
}

function MobileCategoryTrigger({
  selected,
  onOpen,
}: MobileCategoryTriggerProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onOpen}
      className="h-auto w-full justify-start gap-3 rounded-xl border bg-card px-4 py-3 text-left shadow-sm hover:bg-accent/40"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon name={selected.icon} className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-muted-foreground">Category</span>
        <span className="block truncate text-sm font-semibold">
          {selected.name}
        </span>
      </span>
      <LuChevronDown className="size-4 shrink-0 text-muted-foreground" />
    </Button>
  )
}

export default MobileCategoryTrigger
