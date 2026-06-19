import { useEffect, useRef } from 'react'

type UseInfiniteScrollTriggerOptions = {
  onLoadMore: () => void
  enabled?: boolean
  rootMargin?: string
  resetKey?: number | string
}

function useInfiniteScrollTrigger({
  onLoadMore,
  enabled = true,
  rootMargin = '200px',
  resetKey,
}: UseInfiniteScrollTriggerOptions) {
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !enabled) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onLoadMore()
        }
      },
      { rootMargin },
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [enabled, onLoadMore, rootMargin, resetKey])

  return sentinelRef
}

export default useInfiniteScrollTrigger
