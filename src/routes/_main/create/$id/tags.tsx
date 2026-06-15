import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/create/$id/tags')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_main/create/$id/tags"!</div>
}
