import SetupEditPage from '#/features/setup/edit/screen/setup-edit-page'
import { getSession } from '#/features/auth/server/session.functions'
import { getSetupForEditFn } from '#/features/setup/edit/server/get-setup-for-edit.functions'
import { setupEditQueryKeys } from '#/features/setup/edit/lib/query-keys'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/setup/$id/edit')({
  beforeLoad: async ({ location }) => {
    const session = await getSession()

    if (!session) {
      throw redirect({
        to: '/login',
        search: { redirect: location.pathname },
      })
    }
  },
  loader: async ({ params, context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: setupEditQueryKeys.getSetupForEdit(params.id),
      queryFn: () => getSetupForEditFn({ data: { setupId: params.id } }),
    })
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return <SetupEditPage setupId={id} />
}
