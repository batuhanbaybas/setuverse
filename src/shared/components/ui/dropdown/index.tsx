import type { ComponentProps } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'
import Icon from '#/shared/components/icons'
import type { IconName } from '#/shared/components/icons/icon-list'

interface DropdownItemProps extends ComponentProps<typeof DropdownMenuItem> {
  label: string
  icon?: IconName
}

interface Props {
  triggerProps: ComponentProps<typeof DropdownMenuTrigger>
  items: DropdownItemProps[]
}

function Dropdown({ triggerProps, items }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger {...triggerProps} />
      <DropdownMenuContent align="end">
        {items.map((item) => {
          const { label, icon, ...itemProps } = item

          return (
            <DropdownMenuItem key={label} {...itemProps}>
              {icon ? <Icon name={icon} aria-hidden /> : null}
              {label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Dropdown
export type { DropdownItemProps }
