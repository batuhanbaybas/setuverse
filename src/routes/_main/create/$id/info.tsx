import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/create/$id/info')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_main/create/$id/image"!</div>
}
