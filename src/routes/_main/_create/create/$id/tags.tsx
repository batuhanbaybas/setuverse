import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/_create/create/$id/tags')({
  component: RouteComponent,
})

function RouteComponent() {
  return null
}
