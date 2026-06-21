import SetupDetailPage from '#/features/setup/detail/screen/setup-detail-page'
import getSetupDetail from '#/features/setup/detail/server/get-setup-detail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/setup/$id/')({
  loader: async ({ params, context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ['get-setup-detail', params.id],
      queryFn: () => getSetupDetail({ data: { id: params.id } }),
    })
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return <SetupDetailPage setupId={id} />
}
