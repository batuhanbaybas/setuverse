import HomePage from '#/features/home/components/home-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/')({ component: Home })

function Home() {
  return <HomePage />
}
