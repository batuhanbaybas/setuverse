import { cn } from '#/shared/lib/utils'

import { StepItem } from './step-item'
import type { StepperProps } from './types'

export type { StepperStep, StepperProps } from './types'

function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <nav aria-label="Progress" className={cn('w-full', className)}>
      <ol className="flex items-start">
        {steps.map((step, index) => (
          <StepItem
            key={step.label}
            step={step}
            index={index}
            currentStep={currentStep}
            isLast={index === steps.length - 1}
          />
        ))}
      </ol>
    </nav>
  )
}

export { Stepper }
