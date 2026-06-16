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
      className="rounded-xl border bg-card p-4 shadow-sm sm:p-5"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-1">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Step {stepNumber} of {totalSteps}
            </p>
            <h2 className="text-lg font-semibold text-foreground">{label}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <span className="shrink-0 text-sm font-semibold text-primary tabular-nums">
            {value}%
          </span>
        </div>

        <Progress
          value={value}
          className="h-2 bg-primary/10"
          aria-label={`${value}% complete`}
        />

        {nextLabel ? (
          <p className="text-xs text-muted-foreground">
            Up next: <span className="font-medium text-foreground">{nextLabel}</span>
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Final step — review your setup before publishing.
          </p>
        )}
      </div>
    </section>
  )
}

export default CreateFlowProgress
