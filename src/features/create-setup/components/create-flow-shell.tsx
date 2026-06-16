import type { ReactNode } from 'react'

import CreateFlowFooter from './create-flow-footer'
import CreateFlowProgress from './create-flow-progress'
import { CreateFlowProvider } from '../context/create-flow-context'

type CreateFlowShellProps = {
  children: ReactNode
}

function CreateFlowShell({ children }: CreateFlowShellProps) {
  return (
    <CreateFlowProvider>
      <div className="flex min-h-[calc(100dvh-5rem)] flex-col gap-4 pt-6 pb-24">
        <CreateFlowProgress />
        <div className="flex flex-1 flex-col">{children}</div>
        <CreateFlowFooter />
      </div>
    </CreateFlowProvider>
  )
}

export default CreateFlowShell
