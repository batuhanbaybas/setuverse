import Icon from '#/shared/components/icons'
import { Button } from '#/shared/components/ui/button'

type UploadCardFooterProps = {
  isReady: boolean
}

function UploadCardFooter({ isReady }: UploadCardFooterProps) {
  return (
    <>
      <p className="text-sm text-muted-foreground">
        {isReady
          ? 'Image uploaded successfully. You can continue when ready.'
          : 'Upload an image to continue to setup details.'}
      </p>
      <Button type="button" disabled={!isReady} className="sm:min-w-36">
        Continue
        <Icon name="chevron-right" />
      </Button>
    </>
  )
}

export default UploadCardFooter
