import LandingPage from '#/features/home/screen/landing-page'
import { getMostLikedSetupsFn } from '#/features/home/server/get-most-liked-setups.functions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/')({
  loader: async () => {
    const { setups } = await getMostLikedSetupsFn({
      data: { take: 3 },
    })

    return { mostLikedSetups: setups }
  },
  component: Landing,
})

function Landing() {
  const { mostLikedSetups = [] } = Route.useLoaderData()

  return <LandingPage mostLikedSetups={mostLikedSetups} />
}
