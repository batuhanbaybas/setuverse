import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '#/shared/components/ui/sheet'

import MobileCategoryOption from './mobile-category-option'
import type { CategoryItem } from './types'

type MobileCategorySheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  allCategories: CategoryItem[]
  selectedCategory?: string
  onSelect: (slug: string) => void
}

function MobileCategorySheet({
  open,
  onOpenChange,
  allCategories,
  selectedCategory,
  onSelect,
}: MobileCategorySheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="gap-0 px-0 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
      >
        <div className="flex justify-center pt-3 pb-2">
          <span className="h-1 w-10 rounded-full bg-muted-foreground/30" />
        </div>

        <SheetHeader className="px-5 pb-4">
          <SheetTitle>Browse by category</SheetTitle>
          <SheetDescription>Pick a category to filter setups.</SheetDescription>
        </SheetHeader>

        <div className="grid grid-cols-2 gap-3 overflow-y-auto px-5 pb-2">
          {allCategories.map((item) => {
            const isSelected = item.slug
              ? selectedCategory === item.slug
              : !selectedCategory

            return (
              <MobileCategoryOption
                key={item.slug || 'all'}
                item={item}
                isSelected={isSelected}
                onSelect={onSelect}
              />
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileCategorySheet
