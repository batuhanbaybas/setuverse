import {
  CREATE_FLOW_STEPS,
  CREATE_FLOW_TOTAL_STEPS,
} from '../lib/flow'
import { Progress } from '#/shared/components/ui/progress'

type CreateFlowHeaderProps = {
  currentStep: number
}

function CreateFlowHeader({ currentStep }: CreateFlowHeaderProps) {
  const step = CREATE_FLOW_STEPS[currentStep]
  const progressPercent = ((currentStep + 1) / CREATE_FLOW_TOTAL_STEPS) * 100

  return (
    <header className="space-y-3">
      <p className="text-sm font-medium text-muted-foreground">
        Step {currentStep + 1} of {CREATE_FLOW_TOTAL_STEPS}
      </p>
      <h1 className="text-2xl font-semibold tracking-tight">{step.label}</h1>
      <Progress
        value={progressPercent}
        aria-label={`Step ${currentStep + 1} of ${CREATE_FLOW_TOTAL_STEPS}`}
      />
    </header>
  )
}

export default CreateFlowHeader
