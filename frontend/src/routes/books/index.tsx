import { createFileRoute } from '@tanstack/react-router'

type BookSearch = {
  genreId?: number
}

export const Route = createFileRoute('/books/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): BookSearch => {
    return {
      genreId: Number(search?.page ?? 1),
    }
  },
})

function RouteComponent() {
  return <div>Hello "/books/"!</div>
}
