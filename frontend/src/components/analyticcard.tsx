import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import type { LucideIcon } from 'lucide-react'

type AnalyticCardProps = {
  title: string
  value: string
  icon?: LucideIcon
}

export default function AnalyticCard({
  title,
  value,
  icon: Icon,
}: AnalyticCardProps) {
  return (
    <Card className="py-4">
      <CardHeader className="px-4">
        <div className="flex items-center">
          <div>
            <CardDescription className="text-base">{title}</CardDescription>
            <CardTitle className="text-5xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {value}
            </CardTitle>
          </div>
          {Icon && (
            <Icon
              className="ml-auto text-primary/20"
              strokeWidth={1.5}
              size={52}
            />
          )}
        </div>
      </CardHeader>
    </Card>
  )
}
