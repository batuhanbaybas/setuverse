import type { StepperStep, StepperStepLink } from './types'

export function isLinkStep(step: StepperStep): step is StepperStepLink {
  return 'type' in step
}

export function getLinkProps({
  label: _label,
  type: _type,
  ...linkProps
}: StepperStepLink) {
  return linkProps
}
