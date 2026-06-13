import type { IconBaseProps } from 'react-icons'
import { cn } from '#/lib/utils'
import type { IconName } from './icon-list'
import { iconList } from './icon-list'

const iconMap: Record<IconName, (typeof iconList)[number]['icon']> =
  Object.fromEntries(iconList.map(({ name, icon }) => [name, icon])) as Record<
    IconName,
    (typeof iconList)[number]['icon']
  >

interface IconProps extends IconBaseProps {
  name: IconName
}

function Icon({ name, className, ...props }: IconProps) {
  const IconComponent = iconMap[name]

  return (
    <IconComponent className={cn('size-4 shrink-0', className)} {...props} />
  )
}

export default Icon
