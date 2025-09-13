import { debounce } from '@/lib/utils'
import { updateBookProgress } from '@/services/bookService'
import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useUpdateBookProgress(bookId: number) {
  const mutation = useMutation({
    mutationFn: (progress: number) => updateBookProgress(bookId, progress),
  })

  // create debounced mutate once (memoized)
  const debouncedMutate = useMemo(
    () =>
      debounce((progress: number) => {
        mutation.mutate(progress)
      }, 1000), // 500ms debounce
    [mutation],
  )

  return { debouncedMutate, isPending: mutation.isPending }
}
