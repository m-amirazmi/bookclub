import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import type { Book } from '@/lib/types'
import Hero from '@/components/home/hero'
import { fetchBooks } from '@/services/bookService'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { data: books = [], isLoading } = useQuery<Array<Book>>({
    queryKey: ['books'],
    queryFn: fetchBooks,
  })

  const heroBooks = books
    .filter((book) => book.readingProgress !== undefined)
    .sort((a, b) => (b.readingProgress ?? 0) - (a.readingProgress ?? 0))

  return (
    <div>
      <Hero books={heroBooks} isLoading={isLoading} />
    </div>
  )
}
