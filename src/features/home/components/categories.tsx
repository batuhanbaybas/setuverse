import { useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { getRouteApi } from '@tanstack/react-router'

import Icon from '#/shared/components/icons'
import type { IconName } from '#/shared/components/icons/icon-list'
import LinkButton from '#/shared/components/ui/button/link-button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/shared/components/ui/select'

const homeRouteApi = getRouteApi('/_main/')

const ALL_CATEGORY_VALUE = '__all__'

function CategoryOptionLabel({
  icon,
  name,
}: {
  icon: IconName
  name: string
}) {
  return (
    <span className="flex items-center gap-2">
      <Icon name={icon} />
      <span>{name}</span>
    </span>
  )
}

function Categories() {
  const navigate = useNavigate()
  const { categories } = homeRouteApi.useRouteContext()
  const { category: selectedCategory } = homeRouteApi.useSearch()

  const visibleCategories = useMemo(
    () => categories.filter((category) => category.slug !== '/'),
    [categories],
  )

  const selectedValue = selectedCategory ?? ALL_CATEGORY_VALUE

  const selectedLabel = useMemo(() => {
    if (!selectedCategory) {
      return { icon: 'layout-grid' as IconName, name: 'All' }
    }

    const match = visibleCategories.find(
      (category) => category.slug === selectedCategory,
    )

    return match
      ? { icon: match.icon as IconName, name: match.name }
      : { icon: 'layout-grid' as IconName, name: 'All' }
  }, [selectedCategory, visibleCategories])

  const handleCategoryChange = (value: string) => {
    if (value === ALL_CATEGORY_VALUE) {
      void navigate({ to: '/' })
      return
    }

    void navigate({ to: '/', search: { category: value } })
  }

  return (
    <>
      <div className="md:hidden">
        <Select value={selectedValue} onValueChange={handleCategoryChange}>
          <SelectTrigger className="h-11 w-full">
            <SelectValue>
              <CategoryOptionLabel
                icon={selectedLabel.icon}
                name={selectedLabel.name}
              />
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_CATEGORY_VALUE}>
              <CategoryOptionLabel icon="layout-grid" name="All" />
            </SelectItem>
            {visibleCategories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                <CategoryOptionLabel
                  icon={category.icon as IconName}
                  name={category.name}
                />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
