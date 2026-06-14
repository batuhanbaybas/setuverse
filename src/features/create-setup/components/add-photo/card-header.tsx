import {
  CardDescription,
  CardTitle,
} from '#/shared/components/ui/card/card-wrapper'

function CardHeader() {
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
          1
        </span>
        <CardTitle className="text-lg">Add Photo</CardTitle>
      </div>
      <CardDescription>
        Upload a cover photo for your setup. This will be the first thing people
        see.
      </CardDescription>
    </>
  )
}

export default CardHeader
