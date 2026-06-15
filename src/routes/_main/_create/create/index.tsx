import { lazy, Suspense } from 'react'
import { ClientOnly, createFileRoute } from '@tanstack/react-router'

const SetupImageUpload = lazy(
  () => import('#/features/create-setup/components/setup-image-upload'),
)

export const Route = createFileRoute('/_main/_create/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ClientOnly>
      <Suspense fallback={null}>
        <SetupImageUpload />
      </Suspense>
    </ClientOnly>
  )
}
