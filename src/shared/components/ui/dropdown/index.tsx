
import type { ComponentProps, ReactNode } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'

interface DropdownItemProps extends ComponentProps<typeof DropdownMenuItem> {
  label: string
  icon?: ReactNode
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
              {icon}
              {label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Dropdown
