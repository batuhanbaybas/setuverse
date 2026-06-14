import HomePage from '#/features/home/screen/home-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/')({
  component: Home,
})

function Home() {
  return <HomePage />
}
