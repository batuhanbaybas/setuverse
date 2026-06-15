import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/_create/create/$id/review')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_main/create/$id/review"!</div>
}
