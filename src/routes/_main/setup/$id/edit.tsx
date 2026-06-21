import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/setup/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_main/setup/$id/edit"!</div>
}
