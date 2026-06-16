import Icon from '#/shared/components/icons'
import type { IconName } from '#/shared/components/icons/icon-list'

type CategoryOptionProps = {
  icon: string | null
  name: string
}

function CategoryOption({ icon, name }: CategoryOptionProps) {
  return (
    <span className="flex items-center gap-2">
      {icon ? <Icon name={icon as IconName} /> : null}
      <span className="truncate">{name}</span>
    </span>
  )
}

export default CategoryOption
