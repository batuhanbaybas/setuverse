import {
  CardDescription,
  CardTitle,
} from '#/shared/components/ui/card/card-wrapper'

function UploadCardHeader() {
  return (
    <div className="space-y-0.5">
      <CardTitle className="text-lg">Upload setup image</CardTitle>
      <CardDescription>
        Start with a clear photo of your setup.
      </CardDescription>
    </div>
  )
}

export default UploadCardHeader
