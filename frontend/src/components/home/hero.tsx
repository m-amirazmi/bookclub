import {
  BookCheckIcon,
  BookMarkedIcon,
  BookTextIcon,
  MoveRight,
} from 'lucide-react'
import AnalyticCard from '@/components/analyticcard'
import BookCard from '@/components/bookcard'
import { Button } from '@/components/ui/button'

const books = [
  {
    id: '1',
    title: 'Book 1',
    author: 'Amer',
    genres: [{ id: 1, name: 'Horror' }],
  },
  {
    id: '2',
    title: 'Book 2',
    author: 'Azmi',
    genres: [{ id: 1, name: 'Horror' }],
  },
  {
    id: '3',
    title: 'Book 3',
    author: 'Mayah',
    genres: [{ id: 1, name: 'Horror' }],
  },
  {
    id: '4',
    title: 'Book 4',
    author: 'Mariah',
    genres: [{ id: 1, name: 'Horror' }],
  },
]

export default function Hero() {
  return (
    <div className="flex w-full">
      <div className="pr-2 w-1/3">
        <BookCard
          enableProgress
          author="Hi there"
          title="Lalala"
          genres={[
            { id: 1, name: 'Horror' },
            { id: 2, name: 'Mystery' },
            { id: 3, name: 'Psychological' },
          ]}
        />
      </div>
      <div className="w-2/3 flex flex-col">
        <div className="w-full flex flex-wrap">
          {books.map((book) => (
            <div key={book.id} className="pl-4 w-1/4">
              <BookCard {...book} infoOnHover infoSize="sm" />
            </div>
          ))}
        </div>
        <Button className="mt-6 ml-auto cursor-pointer flex items-center">
          <span>View More List</span>
          <MoveRight />
        </Button>
        <div className="ml-4 mt-auto flex flex-col">
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
