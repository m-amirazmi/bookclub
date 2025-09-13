import AnalyticCard from '@/components/analyticcard'
import BookCard from '@/components/bookcard'
import { Button } from '@/components/ui/button'
import type { Book } from '@/lib/types'
import {
  BookCheckIcon,
  BookMarkedIcon,
  BookTextIcon,
  MoveRight,
} from 'lucide-react'

type HeroProps = {
  isLoading?: boolean
  books: Book[] // Only accept 5 books (all that have progress even 0%)
}

export default function Hero({ isLoading, books }: HeroProps) {
  const [mainBook, ...rest] = books

  const otherBooks = isLoading ? Array(4).fill('') : rest

  return (
    <div className="flex w-full">
      <div className="pr-2 w-1/3">
        <BookCard
          id={mainBook?.id}
          enableProgress
          author={mainBook?.author?.name || ''}
          progress={mainBook?.readingProgress}
          title={mainBook?.title}
          loading={isLoading}
          genres={mainBook?.genres}
        />
      </div>
      <div className="w-2/3 flex flex-col-reverse">
        <div className="w-full flex flex-wrap">
          {otherBooks.map((book) => (
            <div key={book.id} className="pl-4 w-1/4">
              <BookCard
                {...book}
                author={book?.author?.name}
                progress={book?.readingProgress}
                infoOnHover
                singleGenre
                infoSize="sm"
                loading={isLoading}
              />
            </div>
          ))}
        </div>
        <Button className="my-6 ml-auto cursor-pointer flex items-center">
          <span>View More List</span>
          <MoveRight />
        </Button>
        <div className="ml-4 mb-auto flex flex-col">
          <h2 className="text-3xl font-bold mb-4">Your Current Reading List</h2>
          <div className="flex gap-4">
            <div className="w-1/3">
              <AnalyticCard
                title="Book in List"
                value="23"
                icon={BookMarkedIcon}
              />
            </div>
            <div className="w-1/3">
              <AnalyticCard
                title="Currently Reading"
                value="4"
                icon={BookTextIcon}
              />
            </div>
            <div className="w-1/3">
              <AnalyticCard
                title="Books Completed"
                value="16"
                icon={BookCheckIcon}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
