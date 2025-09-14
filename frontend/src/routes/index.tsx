import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import type { Book, Genre } from '@/lib/types'
import Hero from '@/components/home/hero'
import { fetchBooks } from '@/services/bookService'
import BookList from '@/components/home/booklist'

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

  const rawGenres = useMemo(
    () => Array.from(new Set(books.flatMap((b) => b.genres ?? []))),
    [books],
  )
  const genres = useMemo(
    () => Array.from(new Map(rawGenres.map((g) => [g.id, g])).values()),
    [rawGenres],
  )

  /**
   * [
   *  {
   *    genre: {id,name},
   *    book: [{}]
   *  }
   * ]
   */
  const booklist: Array<{ genre: Genre; books: Array<Book> }> = useMemo(() => {
    if (!genres.length || !books.length)
      return [{ genre: { id: 0, name: 'Default' }, books: Array(5).fill('') }]

    return genres.map((g) => ({
      genre: g,
      books: books.filter((b) => (b.genres ?? []).some((bg) => bg.id === g.id)),
    }))
  }, [genres, books])

  return (
    <div className="flex flex-col gap-12">
      <Hero books={heroBooks} loading={isLoading} />
      {booklist.map((bl) => (
        <BookList
          key={bl.genre.id}
          books={bl.books}
          genre={bl.genre}
          loading={isLoading}
        />
      ))}
    </div>
  )
}
