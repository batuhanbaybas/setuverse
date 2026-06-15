import { Link } from '@tanstack/react-router'

import { cn } from '#/shared/lib/utils'

import { StepConnector } from './step-connector'
import { StepIndicator } from './step-indicator'
import type { StepperStep } from './types'
import { getLinkProps, isLinkStep } from './utils'

type StepItemProps = {
  step: StepperStep
  index: number
  currentStep: number
  isLast: boolean
}

function StepItem({ step, index, currentStep, isLast }: StepItemProps) {
  const isCompleted = index < currentStep
  const isCurrent = index === currentStep
  const linkProps = isLinkStep(step) ? getLinkProps(step) : null

  const indicator = (
    <StepIndicator
      index={index}
      label={step.label}
      isCompleted={isCompleted}
      isCurrent={isCurrent}
    />
  )

  return (
    <li
      className={cn('flex items-start', !isLast && 'flex-1')}
      aria-current={isCurrent ? 'step' : undefined}
    >
      {linkProps ? (
        <Link
          {...linkProps}
          className="rounded-md transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          {indicator}
        </Link>
      ) : (
        indicator
      )}

      {!isLast && <StepConnector isCompleted={isCompleted} />}
    </li>
  )
}

export { StepItem }
