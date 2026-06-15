import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/_create/create/$id/info')({
  component: RouteComponent,
})

function RouteComponent() {
  return null
}
