import { useCallback, useMemo } from 'react'

import EmptyState from '#/shared/components/empty-state'
import ErrorState from '#/shared/components/error-state'
import SetupCard from '#/shared/components/setup-card'

import Categories from '../components/categories/index'
import useCategoryFilter from '../components/categories/use-category-filter'
import useInfiniteScrollTrigger from '../lib/use-infinite-scroll-trigger'
import { homeRouteApi } from '../lib/home-route'
import useGetPublishedSetups from '../service/use-get-published-setups'

function HomePage() {
  const { selectedCategory } = useCategoryFilter()
  const { categories } = homeRouteApi.useRouteContext()

  const categoryId = useMemo(() => {
    if (!selectedCategory) {
      return undefined
    }

    return categories.find((category) => category.slug === selectedCategory)?.id
  }, [categories, selectedCategory])

  const {
    data,
    isError,
    error,
    isPending,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPublishedSetups({ categoryId })

  const setups = useMemo(
    () => data?.pages.flatMap((page) => page.setups) ?? [],
    [data],
  )

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const sentinelRef = useInfiniteScrollTrigger({
    onLoadMore: loadMore,
    enabled: Boolean(hasNextPage && !isFetchingNextPage),
    resetKey: setups.length,
  })

  return (
    <section className="py-6 sm:py-8">
      <header className="pb-6">
        <Categories />
      </header>

      <section className="mt-8">
        {isError ? (
          <ErrorState message="Failed to load setups" error={error} />
        ) : isPending ? (
          <p className="text-sm text-muted-foreground">Loading setups...</p>
        ) : setups.length === 0 ? (
          <EmptyState
            title="No published setups yet"
            description="Published setups will appear here."
          />
        ) : (
          <>
            <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {setups.map((setup) => (
                <SetupCard
                  key={setup.id}
                  imageUrl={setup.imageUrl ?? ''}
                  title={setup.title ?? ''}
                  category={setup.category?.name ?? ''}
                  publisherInfo={{
                    name: setup.user.name,
                    avatarUrl: setup.user.image ?? '',
                  }}
                />
              ))}
            </section>

            <div ref={sentinelRef} className="h-px" aria-hidden />

            {isFetchingNextPage ? (
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Loading more...
              </p>
            ) : null}
          </>
        )}
      </section>
    </section>
  )
}

export default HomePage
