import type { ComponentProps } from 'react'
import {
  TooltipContent,
  TooltipTrigger,
  TooltipRoot,
  TooltipProvider,
} from './tooltip-root'

interface Props {
  rootProps?: ComponentProps<typeof TooltipRoot>
  triggerProps: ComponentProps<typeof TooltipTrigger>
  contentProps: ComponentProps<typeof TooltipContent>
}

function Tooltip({ rootProps, triggerProps, contentProps }: Props) {
  return (
    <TooltipProvider>
      <TooltipRoot {...rootProps}>
        <TooltipTrigger {...triggerProps} />
        <TooltipContent {...contentProps} />
      </TooltipRoot>
    </TooltipProvider>
  )
}

export default Tooltip
