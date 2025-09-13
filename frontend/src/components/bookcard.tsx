import { useEffect, useState } from 'react'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { cn } from '@/lib/utils'
import { useUpdateBookProgress } from '@/hooks/useUpdateBookProgress'

type BookGenre = {
  id: string | number
  name: string
}

type BookCardProps = {
  id: number
  title: string
  author: string
  coverUrl?: string
  progress?: number
  enableProgress?: boolean
  genres?: Array<BookGenre>
  infoOnHover?: boolean
  infoSize?: 'sm' | 'lg'
  className?: string
  loading?: boolean
  singleGenre?: boolean
}

export default function BookCard({
  id,
  title,
  author,
  coverUrl,
  progress: initialProgress,
  enableProgress,
  genres,
  infoOnHover,
  infoSize = 'lg',
  className,
  loading,
  singleGenre,
}: BookCardProps) {
  console.log('OK je', initialProgress)

  const [progress, setProgress] = useState(initialProgress ?? 0)
  const { debouncedMutate } = useUpdateBookProgress(id)

  useEffect(() => {
    if (initialProgress !== undefined) {
      setProgress(initialProgress)
    }
  }, [initialProgress])

  const handleAddProgress = () => {
    if (progress >= 100) return
    const newVal = progress + 5
    setProgress(newVal)
    debouncedMutate(newVal)
  }
  const handleMinusProgress = () => {
    if (progress <= 0) return
    const newVal = progress - 5
    setProgress(newVal)
    debouncedMutate(newVal)
  }

  return (
    <>
      <Skeleton
        className={cn(
          'h-full w-full rounded-xl aspect-[4/5]',
          !loading && 'hidden',
        )}
      />
      <Card
        className={cn(
          'shadow-md overflow-hidden relative p-0 group cursor-pointer',
          loading && 'hidden',
          className,
        )}
      >
        <div className={cn('aspect-[4/5] w-full')}>
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
            'absolute top-0 p-3 w-full',
            genres && genres.length ? 'flex gap-2' : 'hidden',
          )}
        >
          {!singleGenre ? (
            genres?.slice(0, 3).map(({ id: gid, name }) => (
              <Badge
                id={gid.toString()}
                variant="secondary"
                className="cursor-pointer"
              >
                {name}
              </Badge>
            ))
          ) : (
            <Badge
              id={genres?.[0].id.toString()}
              variant="secondary"
              className="cursor-pointer"
            >
              {genres?.[0].name}
            </Badge>
          )}
          {!enableProgress && (
            <p className="ml-auto text-primary font-bold">{progress}%</p>
          )}
        </div>
        <div
          className={cn(
            'absolute bg-gradient-to-t from-foreground/100 to-foreground/0 w-full bottom-0',
            infoSize === 'sm' ? 'p-4' : 'px-6 py-8',
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
              infoOnHover ? 'hidden group-hover:flex' : 'flex',
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
              <span className="text-xl font-bold">{progress}%</span>
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
    </>
  )
}
