import { useFormContext } from 'react-hook-form'

import Icon from '#/shared/components/icons'
import { Button } from '#/shared/components/ui/button'

import type { SetupImageFormValues } from '../../lib/setup-image-form'

type UploadCardFooterProps = {
  isReady: boolean
}

function UploadCardFooter({ isReady }: UploadCardFooterProps) {
  const form = useFormContext<SetupImageFormValues>()
  const {
    formState: { errors, isValid, isSubmitting },
  } = form

  return (
    <>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">
          {isReady
            ? 'Image uploaded successfully. You can continue when ready.'
            : 'Upload an image to continue to setup details.'}
        </p>
        {errors.imageUrl?.message ? (
          <p className="text-sm text-destructive">{errors.imageUrl.message}</p>
        ) : null}
      </div>
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="sm:min-w-36"
      >
        Continue
        <Icon name="chevron-right" />
      </Button>
    </>
  )
}

export default UploadCardFooter
