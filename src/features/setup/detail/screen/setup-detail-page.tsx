import { useState } from 'react'

import CategoryOption from '#/features/create-setup/components/setup-info/category-option'
import EmptyState from '#/shared/components/empty-state'
import { Avatar, AvatarFallback, AvatarImage } from '#/shared/components/ui/avatar'

import SetupDetailCanvas from '../components/setup-detail-canvas'
import SetupDetailItemList from '../components/setup-detail-item-list'
import useGetSetupDetail from '../service/use-get-setup-detail'

type SetupDetailPageProps = {
  setupId: string
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function SetupDetailPage({ setupId }: SetupDetailPageProps) {
  const { data: setup, isPending, isError } = useGetSetupDetail(setupId)
  const [activeItemId, setActiveItemId] = useState<string | null>(null)

  if (isPending) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        Loading setup...
      </div>
    )
  }

  if (isError) {
    return (
      <EmptyState
        title="Failed to load setup"
        description="Something went wrong. Please try again later."
      />
    )
  }

  if (!setup) {
    return (
      <EmptyState
        title="Setup not found"
        description="This setup may have been removed or is not published yet."
      />
    )
  }

  return (
    <section className="py-6 sm:py-8">
      <header className="space-y-4 pb-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {setup.title ?? 'Untitled setup'}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {setup.category ? (
              <CategoryOption
                icon={setup.category.icon}
                name={setup.category.name}
              />
            ) : null}
            <span className="flex items-center gap-2">
              <Avatar className="size-6 ring-1 ring-ring/20">
                <AvatarImage src={setup.user.image ?? ''} alt={setup.user.name} />
                <AvatarFallback className="text-[10px]">
                  {getInitials(setup.user.name)}
                </AvatarFallback>
              </Avatar>
              <span>{setup.user.name}</span>
            </span>
          </div>
        </div>

        {setup.description ? (
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {setup.description}
          </p>
        ) : null}
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          {setup.imageUrl ? (
            <SetupDetailCanvas
              imageUrl={setup.imageUrl}
              items={setup.items}
              activeItemId={activeItemId}
              onMarkerClick={setActiveItemId}
            />
          ) : (
            <div className="rounded-xl border border-dashed px-6 py-16 text-center text-sm text-muted-foreground">
              No setup image
            </div>
          )}
        </div>

        <aside className="flex min-h-0 min-w-0 flex-col gap-3 lg:col-span-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">
              Setup items ({setup.items.length})
            </h2>
          </div>
          <div className="min-h-0 flex-1 lg:max-h-[min(70vh,640px)]">
            <SetupDetailItemList
              items={setup.items}
              activeItemId={activeItemId}
              onItemClick={setActiveItemId}
            />
          </div>
        </aside>
      </div>
    </section>
  )
}

export default SetupDetailPage
