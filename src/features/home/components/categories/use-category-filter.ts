import { useMemo } from 'react'

import type { IconName } from '#/shared/components/icons/icon-list'

import { setupsRouteApi } from '#/features/home/lib/setups-route'
import type { CategoryItem } from './types'

const ALL_CATEGORY: CategoryItem = {
  slug: '',
  name: 'All',
  icon: 'layout-grid',
}

function useCategoryFilter() {
  const { categories } = setupsRouteApi.useRouteContext()
  const { category: selectedCategory } = setupsRouteApi.useSearch()

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

  const allCategories = useMemo<CategoryItem[]>(
    () => [ALL_CATEGORY, ...categoryItems],
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

  return {
    allCategories,
    categoryItems,
    selected,
    selectedCategory,
  }
}

export default useCategoryFilter
