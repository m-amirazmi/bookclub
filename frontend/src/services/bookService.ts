import { api } from '@/lib/api'
import type { Book } from '@/lib/types'

export const fetchBooks = async (): Promise<Book[]> => {
  const { data } = await api.get('/books')
  if (!data.success) throw new Error()
  return data.data
}

export const updateBookProgress = async (
  id: number,
  progress: number,
): Promise<Book> => {
  return api.patch(`/books/${id}`, { readingProgress: progress })
}
