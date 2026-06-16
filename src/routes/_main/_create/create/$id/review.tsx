import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

import { getSetupDraftFn } from '#/features/create-setup/server/get-setup-draft.functions'

const SetupReview = lazy(
  () => import('#/features/create-setup/components/setup-review'),
)

export const Route = createFileRoute('/_main/_create/create/$id/review')({
  loader: async ({ params }) => {
    await getSetupDraftFn({ data: { setupId: params.id } })
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return (
    <Suspense fallback={null}>
      <SetupReview setupId={id} />
    </Suspense>
  )
}
