import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useParams } from '@tanstack/react-router'
import type { Book } from '@/lib/types'
import { fetchBook } from '@/services/bookService'
import BookCard from '@/components/bookcard'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/books/$bookId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { bookId } = useParams({ from: '/books/$bookId/' })
  const { data: book, isLoading } = useQuery<Book>({
    queryKey: ['book_' + bookId],
    queryFn: () => fetchBook(+bookId),
  })

  return (
    <div className="flex -mx-2">
      <div className="w-1/2 px-2">
        {book && (
          <BookCard
            {...book}
            author={book.author.name}
            infoSize="lg"
            progress={book.readingProgress}
            loading={isLoading}
            hideInfo
          />
        )}
      </div>
      <div className="w-1/2 px-2">
        <h1 className="text-4xl font-bold mb-4">{book?.title}</h1>
        <div className="flex gap-2">
          {book?.genres.map((g) => (
            <Badge key={g.id} variant="secondary">
              {g.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
