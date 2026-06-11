import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/')({ component: Home })

function Home() {
  return (
    <section >
      <h1 className="text-4xl font-bold">Welcome to Setuverse</h1>
      <p className="mt-4 text-lg">
        Setuverse is a platform for creating and sharing your own sets of cards.
      </p>
    </section>
  )
}
