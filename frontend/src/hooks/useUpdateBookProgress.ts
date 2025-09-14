import { debounce } from '@/lib/utils'
import { updateBookProgress } from '@/services/bookService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useUpdateBookProgress(bookId: number) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (progress: number) => updateBookProgress(bookId, progress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
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
