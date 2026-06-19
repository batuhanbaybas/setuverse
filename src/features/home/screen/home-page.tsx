import { useMemo } from 'react'

import EmptyState from '#/shared/components/empty-state'
import ErrorState from '#/shared/components/error-state'
import SetupCard from '#/shared/components/setup-card'

import Categories from '../components/categories/index'
import useCategoryFilter from '../components/categories/use-category-filter'
import PublishedSetupsPagination from '../components/published-setups-pagination'
import { getHomeListPage } from '../lib/home-list-search'
import { homeRouteApi } from '../lib/home-route'
import useGetPublishedSetups from '../service/use-get-published-setups'

function HomePage() {
  const search = homeRouteApi.useSearch()
  const { selectedCategory } = useCategoryFilter()
  const { categories } = homeRouteApi.useRouteContext()
  const page = getHomeListPage(search)

  const categoryId = useMemo(() => {
    if (!selectedCategory) {
      return undefined
    }

    return categories.find((category) => category.slug === selectedCategory)?.id
  }, [categories, selectedCategory])

  const { data, isError, error } = useGetPublishedSetups({ page, categoryId })
  const setups = data?.setups

  return (
    <section className="py-6 sm:py-8">
      <header className="pb-6">
        <Categories />
      </header>

      <section className="mt-8">
        {isError ? (
          <ErrorState message="Failed to load setups" error={error} />
        ) : !setups || setups.length === 0 ? (
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

            <PublishedSetupsPagination
              pagination={data.pagination}
              search={search}
            />
          </>
        )}
      </section>
    </section>
  )
}

export default HomePage
