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
      <div className="flex min-h-[calc(100dvh-5rem)] flex-col py-10">
        <div className="space-y-8">
          <CreateFlowHeader />
        </div>
        <div className="flex flex-1 flex-col">{children}</div>
        <CreateFlowFooter />
      </div>
    </CreateFlowProvider>
  )
}

export default CreateFlowShell
