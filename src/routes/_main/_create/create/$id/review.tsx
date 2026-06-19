import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

import { getSetupDraftFn } from '#/features/create-setup/server/get-setup-draft.functions'
import getSetupItem from '#/features/create-setup/server/setup-item/get-setup-item'

const SetupReview = lazy(
  () => import('#/features/create-setup/components/setup-review'),
)

export const Route = createFileRoute('/_main/_create/create/$id/review')({
  loader: async ({ params, context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ['get-setup-draft', params.id],
      queryFn: () => getSetupDraftFn({ data: { setupId: params.id } }),
    })
    await context.queryClient.ensureQueryData({
      queryKey: ['get-setup-items', params.id],
      queryFn: () => getSetupItem({ data: { setupId: params.id } }),
    })
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
