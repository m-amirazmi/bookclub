import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Skeleton } from './ui/skeleton'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type AnalyticCardProps = {
  title: string
  value: number
  icon?: LucideIcon
  loading?: boolean
}

export default function AnalyticCard({
  title,
  value,
  icon: Icon,
  loading,
}: AnalyticCardProps) {
  return (
    <>
      <Skeleton
        className={cn('h-28 w-full rounded-xl bg-card', !loading && 'hidden')}
      />
      <Card className={cn('py-4', loading && 'hidden')}>
        <CardHeader className="px-4">
          <div className="relative">
            <div>
              <CardDescription className="text-base">{title}</CardDescription>
              <CardTitle className="text-5xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {value}
              </CardTitle>
            </div>
            {Icon && (
              <Icon
                className="text-primary/10 absolute right-0 top-3/4 -translate-y-1/2"
                strokeWidth={1.5}
                size={52}
              />
            )}
          </div>
        </CardHeader>
      </Card>
    </>
  )
}
