import type { Category } from '#/generated/prisma/client'
import Icon from '#/shared/components/icons'
import type { IconName } from '#/shared/components/icons/icon-list'
import LinkButton from '#/shared/components/ui/button/link-button'
import { getRouteApi } from '@tanstack/react-router'

const homeRouteApi = getRouteApi('/_main/')

interface Props {
  categories: Category[]
}

function Categories({ categories }: Props) {
  const { category: selectedCategory } = homeRouteApi.useSearch()
  return (
    <nav className="flex items-center gap-3">
      <LinkButton
        variant={selectedCategory ? 'outline' : 'default'}
        size="lg"
        to="/"
      >
        <Icon name="layout-grid" />
        All
      </LinkButton>
      {categories.map((category) => (
        <LinkButton
          key={category.id}
          to={`?category=${category.slug}`}
          variant={selectedCategory === category.slug ? 'default' : 'outline'}
          size="lg"
        >
          <Icon name={category.icon as IconName} />
          {category.name}
        </LinkButton>
      ))}
    </nav>
  )
}

export default Categories
