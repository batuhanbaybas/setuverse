import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"

import { cn } from "#/shared/lib/utils.ts"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function TooltipRoot({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

type TooltipBodyProps = {
  title: string
  description?: string
}

function TooltipBody({ title, description }: TooltipBodyProps) {
  return (
    <div className="space-y-2 text-left">
      <p className="text-sm leading-snug font-semibold wrap-break-word">{title}</p>
      {description ? (
        <div className="rounded-md bg-background/10 px-2.5 py-1.5">
          <p className="text-[11px] leading-relaxed text-background/75 break-all">
            {description}
          </p>
        </div>
      ) : null}
    </div>
  )
}

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content> & {
  title?: string
  description?: string
}

function TooltipContent({
  className,
  sideOffset = 10,
  title,
  description,
  children,
  ...props
}: TooltipContentProps) {
  const content =
    children ??
    (title ? <TooltipBody title={title} description={description} /> : null)

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-fit max-w-[260px] origin-(--radix-tooltip-content-transform-origin) animate-in rounded-lg border border-background/10 bg-foreground px-3.5 py-2.5 text-left text-background shadow-xl shadow-black/25 fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          !title && !description && "text-xs text-balance",
          className
        )}
        {...props}
      >
        {content}
        <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export {
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipBody,
}
