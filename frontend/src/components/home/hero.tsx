import {
  BookCheckIcon,
  BookMarkedIcon,
  BookTextIcon,
  MoveRight,
} from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import BookCardAdd from '../bookcardadd'
import type { Book } from '@/lib/types'
import AnalyticCard from '@/components/analyticcard'
import BookCard from '@/components/bookcard'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type HeroProps = {
  loading: boolean
  books: Array<Book> // Only accept 5 books (all that have progress even 0%)
}

const blankBookData = {
  author: { id: 0, bio: '', name: '' },
  title: '',
  genres: [],
  publishedYear: 1000,
  id: 0,
  createdAt: '',
  updatedAt: '',
}

const excludeCompleted = (b: Book) => b.readingProgress !== 100
const onlyCompleted = (b: Book) => b.readingProgress === 100

const otherBookTotal = 4

export default function Hero({ loading, books }: HeroProps) {
  const navigate = useNavigate()

  // Not include the completed
  const displayBooks = books.filter(excludeCompleted)

  const [main, ...rest] = displayBooks

  const otherBooks = loading
    ? Array(4).fill('')
    : rest.filter(excludeCompleted).slice(0, 4)
  const mainBook: Book = loading ? blankBookData : main

  const analytics = {
    inList: books.length,
    reading: books.filter(excludeCompleted).length,
    completed: books.filter(onlyCompleted).length,
  }

  const totalOtherBooks = otherBooks.length

  const addBookToList =
    totalOtherBooks < otherBookTotal
      ? Array(otherBookTotal - totalOtherBooks).fill('')
      : []

  const handleMyList = () => navigate({ to: '/my-list' })

  return (
    <div className="flex w-full">
      <div className="pr-2 w-1/3">
        <BookCard
          id={mainBook.id}
          enableProgress
          author={mainBook.author.name}
          progress={mainBook.readingProgress}
          title={mainBook.title}
          loading={loading}
          genres={mainBook.genres}
        />
      </div>
      <div className="w-2/3 flex flex-col-reverse">
        <div className="w-full flex flex-wrap">
          {otherBooks.map((book) => (
            <div key={book.id} className="pl-4 w-1/4">
              <BookCard
                {...book}
                author={book.author && book.author.name}
                progress={book.readingProgress}
                infoOnHover
                singleGenre
                infoSize="sm"
                loading={loading}
              />
            </div>
          ))}
          {addBookToList.map((_, id) => (
            <div key={id} className="pl-4 w-1/4">
              <BookCardAdd />
            </div>
          ))}
        </div>
        <Button
          className={cn(
            'my-6 ml-auto cursor-pointer flex items-center',
            displayBooks.length < 6 && 'hidden',
          )}
          onClick={handleMyList}
        >
          <span>My List</span>
          <MoveRight />
        </Button>
        <div className="ml-4 mb-auto flex flex-col">
          <h2 className="text-3xl font-bold mb-4">Your Current Reading List</h2>
          <div className="flex gap-4">
            <div className="w-1/3">
              <AnalyticCard
                title="Book in List"
                value={analytics.inList}
                icon={BookMarkedIcon}
                loading={loading}
              />
            </div>
            <div className="w-1/3">
              <AnalyticCard
                title="Currently Reading"
                value={analytics.reading}
                icon={BookTextIcon}
                loading={loading}
              />
            </div>
            <div className="w-1/3">
              <AnalyticCard
                title="Books Completed"
                value={analytics.completed}
                icon={BookCheckIcon}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
