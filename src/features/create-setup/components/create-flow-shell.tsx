import type { ReactNode } from 'react'
import { useRouterState } from '@tanstack/react-router'

import { getCurrentFlowStepIndex } from '../lib/flow'
import CreateFlowHeader from './create-flow-header'

type CreateFlowShellProps = {
  children: ReactNode
}

function CreateFlowShell({ children }: CreateFlowShellProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const currentStep = getCurrentFlowStepIndex(pathname)

  return (
    <div className="py-10">
      <div className="space-y-8">
        <CreateFlowHeader currentStep={currentStep} />
        {children}
      </div>
    </div>
  )
}

export default CreateFlowShell
