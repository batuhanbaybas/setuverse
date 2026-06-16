import {
  CardDescription,
  CardTitle,
} from '#/shared/components/ui/card/card-wrapper'

function SetupInfoHeader() {
  return (
    <div className="space-y-1">
      <CardTitle className="text-xl sm:text-2xl">Setup details</CardTitle>
      <CardDescription>
        Add a title, description, and category so people can discover your setup.
      </CardDescription>
    </div>
  )
}

export default SetupInfoHeader
