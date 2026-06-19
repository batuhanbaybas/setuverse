import { useCallback } from 'react'

import { cn } from '#/shared/lib/utils'

import ErrorState from '../error-state'
import useInfiniteScrollTrigger from './use-infinite-scroll-trigger'

type InfiniteScrollerProps = {
  children: React.ReactNode
  hasNextPage?: boolean
  fetchNextPage: () => void
  isFetchingNextPage: boolean
  isPending: boolean
  isError: boolean
  error?: unknown
  isEmpty: boolean
  resetKey?: number | string
  rootMargin?: string
  loadingMessage?: string
  loadingMoreMessage?: string
  errorMessage?: string
  emptyState?: React.ReactNode
  className?: string
}

function InfiniteScroller({
  children,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  isPending,
  isError,
  error,
  isEmpty,
  resetKey,
  rootMargin,
  loadingMessage = 'Loading...',
  loadingMoreMessage = 'Loading more...',
  errorMessage = 'Something went wrong. Please try again.',
  emptyState,
  className,
}: InfiniteScrollerProps) {
  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const sentinelRef = useInfiniteScrollTrigger({
    onLoadMore: loadMore,
    enabled: Boolean(hasNextPage && !isFetchingNextPage),
    rootMargin,
    resetKey,
  })

  if (isError) {
    return (
      <ErrorState
        className={className}
        error={error}
        message={errorMessage}
      />
    )
  }

  if (isPending) {
    return (
      <p className={cn('text-sm text-muted-foreground', className)}>
        {loadingMessage}
      </p>
    )
  }

  if (isEmpty) {
    return emptyState ?? null
  }

  return (
    <div className={className}>
      {children}

      <div ref={sentinelRef} className="h-px" aria-hidden />

      {isFetchingNextPage ? (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {loadingMoreMessage}
        </p>
      ) : null}
    </div>
  )
}

export default InfiniteScroller
