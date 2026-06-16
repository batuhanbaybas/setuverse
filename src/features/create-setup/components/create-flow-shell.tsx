import type { ReactNode } from 'react'

import CreateFlowProgress from './create-flow-progress'

type CreateFlowShellProps = {
  children: ReactNode
}

function CreateFlowShell({ children }: CreateFlowShellProps) {
  return (
    <div className="flex min-h-dvh flex-col gap-4 pt-6 pb-24">
      <CreateFlowProgress />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  )
}

export default CreateFlowShell
