import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import type { tabsListVariants } from './ShandcnTabs'
import { ShandcnTabs, TabsContent, TabsList, TabsTrigger } from './ShandcnTabs'
import { cn } from '#/shared/lib/utils'

type TabItem = {
  trigger: ComponentProps<typeof TabsTrigger>
  content: ComponentProps<typeof TabsContent>
  tablist?: ComponentProps<typeof TabsList>
  disabled?: boolean
}

interface TabsProps extends Omit<
  React.ComponentProps<typeof ShandcnTabs>,
  'children'
> {
  items: TabItem[]
  variant?: VariantProps<typeof tabsListVariants>['variant']
  tablist?: ComponentProps<typeof TabsList>
}

function Tabs({
  items,
  variant = 'line',
  className,
  tablist,
  ...props
}: TabsProps) {
  return (
    <ShandcnTabs className={className} {...props}>
      <TabsList
        {...tablist}
        variant={variant}
        className={cn(
          'h-auto w-full justify-start gap-4 overflow-x-auto rounded-none border-b border-border bg-transparent p-0 sm:gap-6',
          '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          tablist?.className,
        )}
      >
        {items.map((item) => {
          const { children, ...triggerProps } = item.trigger
          return (
            <TabsTrigger
              key={triggerProps.value}
              {...triggerProps}
              className={cn(
                'relative -mb-px h-auto shrink-0 flex-none rounded-none border-0 bg-transparent px-1 pb-3 pt-0 shadow-none',
                'text-base font-medium text-muted-foreground transition-colors hover:text-foreground',
                'data-[state=active]:bg-transparent data-[state=active]:text-foreground',
                'outline-none focus-visible:outline-none focus-visible:ring-0',
                'after:hidden [&[data-state=active]_.tab-indicator]:opacity-100',
                triggerProps.className,
              )}
            >
              {children}
              <span
                aria-hidden="true"
                className="tab-indicator pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-foreground opacity-0 transition-opacity"
              />
            </TabsTrigger>
          )
        })}
      </TabsList>

      {items.map((item) => (
        <TabsContent key={item.trigger.value} {...item.content} className={cn(item.content.className, 'pt-6')} />
      ))}
    </ShandcnTabs>
  )
}

export default Tabs
