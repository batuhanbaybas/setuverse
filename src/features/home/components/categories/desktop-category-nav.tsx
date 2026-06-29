import Icon from '#/shared/components/icons'
import type { IconName } from '#/shared/components/icons/icon-list'
import LinkButton from '#/shared/components/ui/button/link-button'

import { setupsRouteApi } from '#/features/home/lib/setups-route'

function DesktopCategoryNav() {
  const { categories } = setupsRouteApi.useRouteContext()
  const { category: selectedCategory } = setupsRouteApi.useSearch()

  const visibleCategories = categories.filter(
    (category) => category.slug !== '/',
  )

  return (
    <nav
      className="hidden flex-wrap items-center gap-2 md:flex md:gap-3"
      aria-label="Categories"
    >
      <LinkButton
        variant={selectedCategory ? 'outline' : 'default'}
        size="sm"
        className="md:h-10 md:px-4"
        to="/setups"
      >
        <Icon name="layout-grid" />
        All
      </LinkButton>
      {visibleCategories.map((category) => (
        <LinkButton
          key={category.id}
          to="/setups"
          search={{ category: category.slug }}
          variant={selectedCategory === category.slug ? 'default' : 'outline'}
          size="sm"
          className="md:h-10 md:px-4"
        >
          <Icon name={category.icon as IconName} />
          {category.name}
        </LinkButton>
      ))}
    </nav>
  )
}

export default DesktopCategoryNav
