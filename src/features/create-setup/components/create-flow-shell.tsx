import type { ReactNode } from 'react'

import CreateFlowProgress from './create-flow-progress'

type CreateFlowShellProps = {
  children: ReactNode
}

function CreateFlowShell({ children }: CreateFlowShellProps) {
  return (
    <div className="flex flex-col gap-4 pt-6 pb-24">
      <CreateFlowProgress />
      {children}
    </div>
  )
}

export default CreateFlowShell
