import CreateSetupPage from '#/features/create-setup/screen/create-setup-page'
import { getSession } from '#/features/auth/lib/auth.functions'
import getCategories from '#/features/home/server/get-categories'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/create/')({
  beforeLoad: async ({ location }) => {
    const session = await getSession()

    if (!session) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }

    const categories = await getCategories()

    return { user: session.user, categories }
  },
  component: CreateSetup,
})

function CreateSetup() {
  return <CreateSetupPage />
}
