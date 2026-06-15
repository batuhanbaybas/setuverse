import type { Link } from '@tanstack/react-router'

type StepperStepDefault = {
  label: string
}

type StepperStepLink = {
  label: string
  type: 'link'
} & Omit<React.ComponentProps<typeof Link>, 'children' | 'className'>

export type StepperStep = StepperStepDefault | StepperStepLink

export type StepperProps = {
  steps: readonly StepperStep[]
  currentStep: number
  className?: string
}

export type { StepperStepLink }
