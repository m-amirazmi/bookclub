import type { Book } from '@/lib/types'
import { api } from '@/lib/api'

export const fetchBooks = async (): Promise<Array<Book>> => {
  const { data } = await api.get('/books')
  if (!data.success) throw new Error()
  return data.data
}

export const fetchBook = async (id: number): Promise<Book> => {
  const { data } = await api.get(`/books/${id}`)
  if (!data.success) throw new Error()
  return data.data
}

export const updateBookProgress = async (
  id: number,
  progress: number,
): Promise<Book> => {
  return api.patch(`/books/${id}`, { readingProgress: progress })
}
