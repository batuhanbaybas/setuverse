
import type { ComponentProps } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"


interface DropdownItemProps extends ComponentProps<typeof DropdownMenuItem> {
  label: string
}

interface Props {
  triggerProps: ComponentProps<typeof DropdownMenuTrigger>
  items: DropdownItemProps[]
}

function Dropdown({ triggerProps, items }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger {...triggerProps} />
      <DropdownMenuContent>
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            {...item}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Dropdown
