import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

const SetupTags = lazy(
  () => import('#/features/create-setup/components/setup-tags'),
)

export const Route = createFileRoute('/_main/_create/create/$id/tags')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return (
    <ClientOnly>
      <Suspense fallback={null}>
        <SetupTags setupId={id} />
      </Suspense>
    </ClientOnly>
  )
}
