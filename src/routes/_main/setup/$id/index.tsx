import SetupDetailPage from '#/features/setup/detail/screen/setup-detail-page'
import getSetupDetail from '#/features/setup/detail/server/get-setup-detail'
import { queryKeys } from '#/features/home/lib/query-keys'
import { getCurrentUserLikeStatusFn } from '#/features/home/server/get-current-user-like-status'
import { getCurrentUserSaveStatusFn } from '#/features/home/server/get-current-user-save-status'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/setup/$id/')({
  loader: async ({ params, context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData({
        queryKey: ['get-setup-detail', params.id],
        queryFn: () => getSetupDetail({ data: { id: params.id } }),
      }),
      context.queryClient.prefetchQuery({
        queryKey: [queryKeys.getCurrentUserLikeStatus, params.id],
        queryFn: () =>
          getCurrentUserLikeStatusFn({ data: { setupId: params.id } }),
      }),
      context.queryClient.prefetchQuery({
        queryKey: [queryKeys.getCurrentUserSaveStatus, params.id],
        queryFn: () =>
          getCurrentUserSaveStatusFn({ data: { setupId: params.id } }),
      }),
    ])
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return <SetupDetailPage setupId={id} />
}
