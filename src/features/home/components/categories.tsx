import type { Category } from '#/generated/prisma/client'
import Icon from '#/shared/components/icons'
import type { IconName } from '#/shared/components/icons/icon-list'
import LinkButton from '#/shared/components/ui/button/link-button'

interface Props {
  categories: Category[]
}

function Categories({ categories }: Props) {
  return (
    <nav className="flex items-center gap-3">
      <LinkButton key="all" to={'/categories'} variant="outline" size="lg">
        <Icon name="layout-grid" />
        All
      </LinkButton>
      {categories.map((category) => (
        <LinkButton
          key={category.id}
          to={`/categories/${category.slug}`}
          variant="outline"
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
