import { queryKeys } from '#/features/create-setup/lib/query-keys'
import { getSetupDraftFn } from '#/features/create-setup/server/get-setup-draft.functions'
import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

const SetupInfoForm = lazy(
  () => import('#/features/create-setup/components/setup-info'),
)

export const Route = createFileRoute('/_main/_create/create/$id/info')({
  loader: async ({ params, context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ['get-setup-draft', params.id],
      queryFn: () => getSetupDraftFn({ data: { setupId: params.id } }),
    })
  },
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
