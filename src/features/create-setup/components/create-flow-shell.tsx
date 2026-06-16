import type { ReactNode } from 'react'

import CreateFlowFooter from './create-flow-footer'
import CreateFlowHeader from './create-flow-header'
import { CreateFlowProvider } from '../context/create-flow-context'

type CreateFlowShellProps = {
  children: ReactNode
}

function CreateFlowShell({ children }: CreateFlowShellProps) {
  return (
    <CreateFlowProvider>
      <div className="py-10">
        <div className="space-y-8">
          <CreateFlowHeader />
          {children}
          <CreateFlowFooter />
        </div>
      </div>
    </CreateFlowProvider>
  )
}

export default CreateFlowShell
