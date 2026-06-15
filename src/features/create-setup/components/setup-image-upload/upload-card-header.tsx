import {
  CardDescription,
  CardTitle,
} from '#/shared/components/ui/card/card-wrapper'

function UploadCardHeader() {
  return (
    <>
      <div className="space-y-1">
        <CardTitle className="text-2xl">Upload setup image</CardTitle>
        <CardDescription>
          Start with a clear photo of your setup. This will be the main image
          people see on your page.
        </CardDescription>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="rounded-full border bg-muted/40 px-3 py-1">
          JPG, PNG, WEBP
        </span>
        <span className="rounded-full border bg-muted/40 px-3 py-1">
          Max 10 MB
        </span>
        <span className="rounded-full border bg-muted/40 px-3 py-1">1 image</span>
      </div>
    </>
  )
}

export default UploadCardHeader
