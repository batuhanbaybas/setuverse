import { cn } from '#/shared/lib/utils'

type StepConnectorProps = {
  isCompleted: boolean
}

function StepConnector({ isCompleted }: StepConnectorProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'mt-4 h-0.5 flex-1',
        isCompleted ? 'bg-primary' : 'bg-muted-foreground/20',
      )}
    />
  )
}

export { StepConnector }
