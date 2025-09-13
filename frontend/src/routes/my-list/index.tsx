import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/my-list/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/my-list/"!</div>
}
