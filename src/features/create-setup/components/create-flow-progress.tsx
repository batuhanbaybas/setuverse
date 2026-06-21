import { useRouterState } from '@tanstack/react-router'

import { Progress } from '#/shared/components/ui/progress'

import { getCreateFlowProgress } from '../lib/flow'

function CreateFlowProgress() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const { stepNumber, totalSteps, label, description, nextLabel, value } =
    getCreateFlowProgress(pathname)

  return (
    <section
      aria-label="Setup creation progress"
      className="rounded-xl border bg-card p-3 shadow-sm sm:p-4"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex min-w-0 items-center gap-2">
            <p className="shrink-0 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Step {stepNumber}/{totalSteps}
            </p>
            <span className="hidden text-muted-foreground/40 sm:inline">·</span>
            <h2 className="truncate text-sm font-semibold text-foreground">
              {label}
            </h2>
          </div>
          <span className="shrink-0 text-xs font-semibold text-primary tabular-nums">
            {value}%
          </span>
        </div>

        <Progress
          value={value}
          className="h-1.5 bg-primary/10"
          aria-label={`${value}% complete`}
        />

        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">{description}</p>
          {nextLabel ? (
            <p className="shrink-0 text-xs text-muted-foreground">
              Next:{' '}
              <span className="font-medium text-foreground">{nextLabel}</span>
            </p>
          ) : (
            <p className="shrink-0 text-xs font-medium text-foreground">
              Final step
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default CreateFlowProgress
