import { Link } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import { Card } from './ui/card'

export default function BookCardAdd() {
  return (
    <Link to="/books">
      <Card className="h-full w-full rounded-xl aspect-[4/5] bg-background border-dashed flex items-center justify-center gap-0 px-2 cursor-pointer">
        <PlusIcon size={48} strokeWidth={1.5} className="text-primary" />
        <p className="text-center text-primary flex flex-col items-center justify-center">
          <span>Add a Book to</span>
          <span>Reading List</span>
        </p>
      </Card>
    </Link>
  )
}
