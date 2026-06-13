import { Link } from "@tanstack/react-router"
import { buttonVariants } from "./button-variant"
import type { VariantProps } from "class-variance-authority"
import { cn } from "#/lib/utils"


function LinkButton({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants>) {

  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export default LinkButton