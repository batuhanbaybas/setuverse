import {
  CardDescription,
  CardTitle,
} from '#/shared/components/ui/card/card-wrapper'

function SetupTagsHeader() {
  return (
    <div className="space-y-1">
      <CardTitle className="text-2xl">Tag items on your setup</CardTitle>
      <CardDescription>
        Click anywhere on the image to place a tag. Add a name and link for each
        item in your setup.
      </CardDescription>
    </div>
  )
}

export default SetupTagsHeader
