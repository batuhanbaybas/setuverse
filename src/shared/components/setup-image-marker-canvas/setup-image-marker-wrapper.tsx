import type { ReactNode } from 'react'

import { cn } from '#/shared/lib/utils'

type SetupImageMarkerWrapperProps = {
  children: ReactNode
  className?: string
}

function SetupImageMarkerWrapper({
  children,
  className,
}: SetupImageMarkerWrapperProps) {
  return (
    <div className={cn('relative inline-block w-full max-w-full', className)}>
      {children}
    </div>
  )
}

export default SetupImageMarkerWrapper
