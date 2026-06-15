import { LuCheck } from 'react-icons/lu'

import { cn } from '#/shared/lib/utils'

type StepIndicatorProps = {
  index: number
  label: string
  isCompleted: boolean
  isCurrent: boolean
}

function StepIndicator({
  index,
  label,
  isCompleted,
  isCurrent,
}: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium',
          isCompleted && 'border-primary bg-primary text-primary-foreground',
          isCurrent && 'border-primary text-primary',
          !isCompleted &&
            !isCurrent &&
            'border-muted-foreground/30 text-muted-foreground',
        )}
      >
        {isCompleted ? <LuCheck className="size-4" /> : index + 1}
      </div>
      <span
        className={cn(
          'max-w-24 text-center text-xs font-medium',
          isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground',
        )}
      >
        {label}
      </span>
    </div>
  )
}

export { StepIndicator }
