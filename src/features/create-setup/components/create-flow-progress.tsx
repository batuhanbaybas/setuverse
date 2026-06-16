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
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex items-center gap-2">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Step {stepNumber}/{totalSteps}
            </p>
            <span className="text-muted-foreground/40">·</span>
            <h2 className="text-sm font-semibold text-foreground">{label}</h2>
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

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{description}</p>
          {nextLabel ? (
            <p className="text-xs text-muted-foreground">
              Next: <span className="font-medium text-foreground">{nextLabel}</span>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default CreateFlowProgress
