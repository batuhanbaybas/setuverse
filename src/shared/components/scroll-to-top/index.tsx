import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import Icon from '#/shared/components/icons'
import { Button } from '#/shared/components/ui/button'
import { cn } from '#/shared/lib/utils'

const DEFAULT_THRESHOLD = 320

type ScrollToTopProps = {
  threshold?: number
  className?: string
}

function ScrollToTop({
  threshold = DEFAULT_THRESHOLD,
  className,
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) {
      return
    }

    const updateVisibility = () => {
      setIsVisible(window.scrollY > threshold)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting)
      },
      { root: null, threshold: 0 },
    )

    observer.observe(sentinel)
    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updateVisibility)
    }
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 w-px"
        style={{ height: threshold }}
      />
      {mounted
        ? createPortal(
            <Button
              type="button"
              variant="default"
              size="icon-lg"
              aria-label="Scroll to top"
              onClick={scrollToTop}
              className={cn(
                'fixed right-4 bottom-4 z-50 rounded-full shadow-lg transition-all duration-300 sm:right-6 sm:bottom-6',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-3 opacity-0',
                className,
              )}
            >
              <Icon name="arrow-up" className="size-5" aria-hidden />
            </Button>,
            document.body,
          )
        : null}
    </>
  )
}

export default ScrollToTop
