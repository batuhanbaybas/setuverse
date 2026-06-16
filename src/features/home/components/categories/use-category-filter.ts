import { useMemo } from 'react'

import type { IconName } from '#/shared/components/icons/icon-list'

import { homeRouteApi } from './lib/home-route'
import type { CategoryItem } from './types'

const ALL_CATEGORY: CategoryItem = {
  slug: '',
  name: 'All',
  icon: 'layout-grid',
}

function useCategoryFilter() {
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
