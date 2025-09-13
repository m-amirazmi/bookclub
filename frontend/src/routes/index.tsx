import Hero from '@/components/home/hero'
import type { Book } from '@/lib/types'
import { fetchBooks } from '@/services/bookService'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: fetchBooks,
  })

  const heroBooks = books
    .filter((book) => {
      return (
        book.readingProgress !== null &&
        book.readingProgress !== undefined &&
        book.readingProgress !== 100
      )
    })
    .sort((a, b) => (b.readingProgress ?? 0) - (a.readingProgress ?? 0))
    .slice(0, 5)

  return (
    <div>
      <Hero books={heroBooks} isLoading={isLoading} />
    </div>
  )
}
