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
  return <div>Hello "/_main/setup/$id"!</div>
}
