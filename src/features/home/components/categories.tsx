import { useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { getRouteApi } from '@tanstack/react-router'
import { LuCheck, LuChevronDown } from 'react-icons/lu'

import Icon from '#/shared/components/icons'
import type { IconName } from '#/shared/components/icons/icon-list'
import LinkButton from '#/shared/components/ui/button/link-button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '#/shared/components/ui/sheet'
import { cn } from '#/shared/lib/utils'

const homeRouteApi = getRouteApi('/_main/')

type CategoryItem = {
  slug: string
  name: string
  icon: IconName
}

function MobileCategoryFilter() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { categories } = homeRouteApi.useRouteContext()
  const { category: selectedCategory } = homeRouteApi.useSearch()

  const categoryItems = useMemo<CategoryItem[]>(
    () =>
      categories
        .filter((category) => category.slug !== '/')
        .map((category) => ({
          slug: category.slug,
          name: category.name,
          icon: category.icon as IconName,
        })),
    [categories],
  )

  const allCategories: CategoryItem[] = useMemo(
    () => [{ slug: '', name: 'All', icon: 'layout-grid' }, ...categoryItems],
    [categoryItems],
  )

  const selected = useMemo(() => {
    if (!selectedCategory) {
      return allCategories[0]
    }

    return (
      allCategories.find((item) => item.slug === selectedCategory) ??
      allCategories[0]
    )
  }, [allCategories, selectedCategory])

  const handleSelect = (slug: string) => {
    setOpen(false)

    if (!slug) {
      void navigate({ to: '/' })
      return
    }

    void navigate({ to: '/', search: { category: slug } })
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-3 rounded-xl border bg-card px-4 py-3 text-left shadow-sm transition-colors hover:bg-accent/40"
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
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
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
            <SheetDescription>
              Pick a category to filter setups.
            </SheetDescription>
          </SheetHeader>

          <div className="grid grid-cols-2 gap-3 overflow-y-auto px-5 pb-2">
            {allCategories.map((item) => {
              const isSelected = item.slug
                ? selectedCategory === item.slug
                : !selectedCategory

              return (
                <button
                  key={item.slug || 'all'}
                  type="button"
                  onClick={() => handleSelect(item.slug)}
                  className={cn(
                    'relative flex flex-col items-center gap-2.5 rounded-xl border px-3 py-4 transition-colors',
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
                  <span className="text-center text-sm font-medium">
                    {item.name}
                  </span>
                </button>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

function Categories() {
  const { categories } = homeRouteApi.useRouteContext()
  const { category: selectedCategory } = homeRouteApi.useSearch()

  const visibleCategories = useMemo(
    () => categories.filter((category) => category.slug !== '/'),
    [categories],
  )

  return (
    <>
      <div className="md:hidden">
        <MobileCategoryFilter />
      </div>

      <nav
        className="hidden flex-wrap items-center gap-2 md:flex md:gap-3"
        aria-label="Categories"
      >
        <LinkButton
          variant={selectedCategory ? 'outline' : 'default'}
          size="sm"
          className="md:h-10 md:px-4"
          to="/"
        >
          <Icon name="layout-grid" />
          All
        </LinkButton>
        {visibleCategories.map((category) => (
          <LinkButton
            key={category.id}
            to={`?category=${category.slug}`}
            variant={selectedCategory === category.slug ? 'default' : 'outline'}
            size="sm"
            className="md:h-10 md:px-4"
          >
            <Icon name={category.icon as IconName} />
            {category.name}
          </LinkButton>
        ))}
      </nav>
    </>
  )
}

export default Categories
