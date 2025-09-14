import type { Book, Genre } from '@/lib/types'
import BookCard from '../bookcard'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { MoveRight } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'
import { useNavigate } from '@tanstack/react-router'

type BookListProps = {
  books: Array<Book>
  genre: Genre
  loading: boolean
}

export default function BookList({ books, genre, loading }: BookListProps) {
  const navigate = useNavigate()

  const handleMoreGenre = () =>
    navigate({ to: '/books', search: { genreId: genre.id } })

  return (
    <div className="-mx-2">
      <Skeleton
        className={cn('mx-2 mb-4 h-8 w-32 rounded-xl', !loading && 'hidden')}
      />
      <div className={cn('px-2 flex items-center mb-4', loading && 'hidden')}>
        <h2 className="text-2xl font-bold">{genre.name}</h2>
        <Button
          className={cn(
            'ml-auto cursor-pointer flex items-center',
            books.length < 5 && 'hidden',
          )}
          onClick={handleMoreGenre}
        >
          <span>More {genre.name}</span>
          <MoveRight />
        </Button>
      </div>
      <div className="flex flex-wrap">
        {books
          .sort((a, b) => (b.readingProgress ?? -1) - (a.readingProgress ?? -1))
          .slice(0, 5)
          .map((b) => (
            <div className="w-1/5 p-2">
              <BookCard
                key={b.id}
                {...b}
                author={b.author?.name}
                progress={b.readingProgress}
                loading={loading}
                infoOnHover
                infoSize="sm"
                singleGenre
              />
            </div>
          ))}
      </div>
    </div>
  )
}
