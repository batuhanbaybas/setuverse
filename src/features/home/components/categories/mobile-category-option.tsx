import { LuCheck } from 'react-icons/lu'

import Icon from '#/shared/components/icons'
import { Button } from '#/shared/components/ui/button'
import { cn } from '#/shared/lib/utils'

import type { CategoryItem } from './types'

type MobileCategoryOptionProps = {
  item: CategoryItem
  isSelected: boolean
  onSelect: (slug: string) => void
}

function MobileCategoryOption({
  item,
  isSelected,
  onSelect,
}: MobileCategoryOptionProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => onSelect(item.slug)}
      className={cn(
        'relative h-auto flex-col items-center gap-2.5 rounded-xl border px-3 py-4 whitespace-normal',
        isSelected
          ? 'border-primary bg-primary/5'
          : 'border-border bg-muted/20 hover:bg-muted/40',
      )}
    >
      {isSelected ? (
        <span className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <LuCheck className="size-3" aria-hidden />
        </span>
      ) : null}
      <span
        className={cn(
          'flex size-11 items-center justify-center rounded-xl',
          isSelected
            ? 'bg-primary/15 text-primary'
            : 'bg-background text-foreground',
        )}
      >
        <Icon name={item.icon} className="size-5" />
      </span>
      <span className="text-center text-sm font-medium">{item.name}</span>
    </Button>
  )
}

export default MobileCategoryOption
