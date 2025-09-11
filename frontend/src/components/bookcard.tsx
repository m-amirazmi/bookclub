import { useState } from 'react'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

type BookGenre = {
  id: string | number
  name: string
}

type BookCardProps = {
  title: string
  author: string
  coverUrl?: string
  enableProgress?: boolean
  genres?: Array<BookGenre>
  infoOnHover?: boolean
  infoSize?: 'sm' | 'lg'
}

export default function BookCard({
  title,
  author,
  coverUrl,
  enableProgress,
  genres,
  infoOnHover,
  infoSize = 'lg',
}: BookCardProps) {
  const [progress, setProgress] = useState(45)

  const handleAddProgress = () => {
    setProgress((prev) => {
      if (prev === 100) return prev
      return prev + 5
    })
  }
  const handleMinusProgress = () => {
    setProgress((prev) => {
      if (prev === 0) return prev
      return prev - 5
    })
  }

  return (
    <Card className="shadow-md overflow-hidden relative p-0 group cursor-pointer">
      <div className="aspect-[2/3] w-fuli">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-accent via-secondary to-accent flex items-center justify-center text-primary font-bold text-lg">
            No Cover
          </div>
        )}
      </div>
      <div
        className={cn(
          'absolute top-0 p-3',
          genres && genres.length ? 'flex gap-2' : 'hidden',
        )}
      >
        {genres?.map(({ id, name }) => (
          <Badge
            id={id.toString()}
            variant="secondary"
            className="cursor-pointer"
          >
            {name}
          </Badge>
        ))}
      </div>
      <div
        className={cn(
          'absolute bg-gradient-to-t from-foreground/100 to-foreground/0 w-full bottom-0 transition-all duration-300',
          infoOnHover ? 'opacity-0 group-hover:opacity-100' : 'opacity-100',
          infoSize === 'sm' ? 'p-4' : 'px-6 py-8 ',
        )}
      >
        <h3
          className={cn(
            'font-semibold text-primary-foreground line-clamp-2',
            infoSize === 'sm' ? 'text-lg' : 'text-2xl mb-2',
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            'text-primary-foreground flex justify-between items-center',
            infoSize === 'sm' ? 'text-base' : 'text-lg',
          )}
        >
          <span>{author}</span>
          <span
            className={cn(
              'items-center gap-4',
              enableProgress ? 'flex' : 'hidden',
            )}
          >
            <Button
              size="icon"
              className="rounded bg-transparent cursor-pointer"
              variant="outline"
              onClick={handleMinusProgress}
              disabled={progress < 1}
            >
              <MinusIcon />
            </Button>
            <span className="text-xl">{progress}%</span>
            <Button
              size="icon"
              className="rounded bg-transparent cursor-pointer"
              variant="outline"
              onClick={handleAddProgress}
              disabled={progress > 99}
            >
              <PlusIcon />
            </Button>
          </span>
        </p>
        <Progress
          value={progress}
          max={100}
          className={cn('h-3', enableProgress ? 'block mt-4' : 'hidden')}
        />
      </div>
    </Card>
  )
}
