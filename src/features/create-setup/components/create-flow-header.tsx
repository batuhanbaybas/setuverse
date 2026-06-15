import { lazy, Suspense } from 'react'
import { ClientOnly } from '@tanstack/react-router'

const CreateFlowStepper = lazy(() => import('./create-flow-stepper'))

function CreateFlowHeader() {
  return (
    <ClientOnly>
      <Suspense fallback={null}>
        <CreateFlowStepper />
      </Suspense>
    </ClientOnly>
  )
}

export default CreateFlowHeader
