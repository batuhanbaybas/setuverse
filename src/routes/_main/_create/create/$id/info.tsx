import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

const SetupInfoForm = lazy(
  () => import('#/features/create-setup/components/setup-info'),
)

export const Route = createFileRoute('/_main/_create/create/$id/info')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return (
    <ClientOnly>
      <Suspense fallback={null}>
        <SetupInfoForm setupId={id} />
      </Suspense>
    </ClientOnly>
  )
}
