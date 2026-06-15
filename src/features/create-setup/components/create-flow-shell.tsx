import type { ReactNode } from 'react'

import CreateFlowHeader from './create-flow-header'

type CreateFlowShellProps = {
  children: ReactNode
}

function CreateFlowShell({ children }: CreateFlowShellProps) {
  return (
    <div className="py-10">
      <div className="space-y-8">
        <CreateFlowHeader />
        {children}
      </div>
    </div>
  )
}

export default CreateFlowShell
