import { useMemo } from 'react'

import EmptyState from '#/shared/components/empty-state'
import InfiniteScroller from '#/shared/components/infinite-scroller'
import SetupCard from '#/shared/components/setup-card'

import Categories from '../components/categories/index'
import useCategoryFilter from '../components/categories/use-category-filter'
import { setupsRouteApi } from '../lib/setups-route'
import useGetPublishedSetups from '../service/use-get-published-setups'

function SetupsPage() {
  const { selectedCategory } = useCategoryFilter()
  const { categories } = setupsRouteApi.useRouteContext()

  const categoryId = useMemo(() => {
    if (!selectedCategory) {
      return undefined
    }

    return categories.find((category) => category.slug === selectedCategory)?.id
  }, [categories, selectedCategory])

  const infiniteQuery = useGetPublishedSetups({ categoryId })

  const setups = useMemo(
    () => infiniteQuery.data?.pages.flatMap((page) => page.setups) ?? [],
    [infiniteQuery.data],
  )

  return (
    <section className="py-6 sm:py-8">
      <header className="pb-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Browse setups
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Filter by category or open any card to explore the gear inside.
            </p>
          </div>
          <Categories />
        </div>
      </header>

      <section className="space-y-4">
        <InfiniteScroller
          hasNextPage={infiniteQuery.hasNextPage}
          fetchNextPage={infiniteQuery.fetchNextPage}
          isFetchingNextPage={infiniteQuery.isFetchingNextPage}
          isPending={infiniteQuery.isPending}
          isError={infiniteQuery.isError}
          error={infiniteQuery.error}
          isEmpty={setups.length === 0}
          resetKey={setups.length}
          loadingMessage="Loading setups..."
          loadingMoreMessage="Loading more..."
          errorMessage="Failed to load setups"
          emptyState={
            <EmptyState
              title="No published setups yet"
              description="Published setups will appear here."
            />
          }
        >
          <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {setups.map((setup) => (
              <SetupCard
                key={setup.id}
                setupId={setup.id}
                imageUrl={setup.imageUrl ?? ''}
                title={setup.title ?? ''}
                category={setup.category?.name ?? ''}
                itemsCount={setup._count.items}
                publisherInfo={{
                  name: setup.user.name,
                  avatarUrl: setup.user.image ?? '',
                }}
              />
            ))}
          </section>
        </InfiniteScroller>
      </section>
    </section>
  )
}

export default SetupsPage
