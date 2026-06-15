import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/_create/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Upload image step</div>
}
