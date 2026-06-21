import { useMemo } from 'react'

import EmptyState from '#/shared/components/empty-state'
import InfiniteScroller from '#/shared/components/infinite-scroller'
import SetupCard from '#/shared/components/setup-card'

import Categories from '../components/categories/index'
import useCategoryFilter from '../components/categories/use-category-filter'
import { homeRouteApi } from '../lib/home-route'
import useGetPublishedSetups from '../service/use-get-published-setups'
import { Link } from '@tanstack/react-router'

function HomePage() {
  const { selectedCategory } = useCategoryFilter()
  const { categories } = homeRouteApi.useRouteContext()

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

  console.log({ setups })

  return (
    <section className="py-6 sm:py-8">
      <header className="pb-6">
        <Categories />
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
              <Link to={`/setup/${setup.id}`} key={setup.id}>
                <SetupCard  
                  setupId={setup.id}
                  imageUrl={setup.imageUrl ?? ''}
                  title={setup.title ?? ''}
                  category={setup.category?.name ?? ''}
                  publisherInfo={{
                    name: setup.user.name,
                    avatarUrl: setup.user.image ?? '',
                  }}
                  likesCount={setup.likes.length}
                />
              </Link>
            ))}
          </section>
        </InfiniteScroller>
      </section>
    </section>
  )
}

export default HomePage
