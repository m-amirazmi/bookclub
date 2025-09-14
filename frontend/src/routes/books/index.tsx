import BookCard from '@/components/bookcard'
import type { Book } from '@/lib/types'
import { fetchBooks } from '@/services/bookService'
import { useQuery } from '@tanstack/react-query'
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
  const { data: books = Array(15).fill(''), isLoading } = useQuery<Array<Book>>(
    {
      queryKey: ['books'],
      queryFn: fetchBooks,
    },
  )
  return (
    <div>
      <h1 className="text-3xl font-bold">Book List</h1>
      <div className="flex flex-wrap -mx-2">
        {books
          .sort((a, b) => (b.readingProgress ?? -1) - (a.readingProgress ?? -1))
          .map((b, k) => (
            <div key={k} className="w-1/5 p-2">
              <BookCard
                {...b}
                loading={isLoading}
                progress={b.readingProgress}
                singleGenre
                author={b.author?.name}
                infoSize="sm"
                infoOnHover
              />
            </div>
          ))}
      </div>
    </div>
  )
}
