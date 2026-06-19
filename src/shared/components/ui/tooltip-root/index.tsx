import type { ComponentProps } from 'react'
import {
  TooltipContent,
  TooltipTrigger,
  TooltipRoot,
} from './tooltip-root'

interface Props {
  rootProps?: ComponentProps<typeof TooltipRoot>
  triggerProps: ComponentProps<typeof TooltipTrigger>
  contentProps: ComponentProps<typeof TooltipContent>
}

function Tooltip({ rootProps, triggerProps, contentProps }: Props) {
  return (
    <TooltipRoot {...rootProps}>
      <TooltipTrigger {...triggerProps} />
      <TooltipContent {...contentProps} />
    </TooltipRoot>
  )
}

export default Tooltip
