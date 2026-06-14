import { useEffect, useState } from 'react'
import { LuCirclePlay } from 'react-icons/lu'
import { useFormContext, useWatch } from 'react-hook-form'
import Card from '#/shared/components/ui/card'
import { Button } from '#/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '#/shared/components/ui/dialog'
import type { CreateSetupFormValues } from '../../lib/create-setup-form'
import { getSelectedPhoto } from '../../lib/create-setup-form'
import CardHeader from '../../shared/card-header'
import PhotoTagCanvas from './photo-tag-canvas'

function TagEquipment() {
  const { control, setValue, getValues } = useFormContext<CreateSetupFormValues>()
  const photos = useWatch({ control, name: 'photos' }) ?? []
  const selectedPhotoId = useWatch({ control, name: 'selectedPhotoId' })
  const pins = useWatch({ control, name: 'pins' }) ?? []
  const selectedPhoto = getSelectedPhoto(photos, selectedPhotoId)
  const [helpOpen, setHelpOpen] = useState(false)

  useEffect(() => {
    if (!photos.length) {
      if (selectedPhotoId) {
        setValue('selectedPhotoId', undefined, { shouldDirty: true })
      }
      return
    }

    if (!photos.some((photo) => photo.id === selectedPhotoId)) {
      setValue('selectedPhotoId', photos[0].id, { shouldDirty: true })
    }
  }, [photos, selectedPhotoId, setValue])

  const addPin = (x: number, y: number) => {
    if (!selectedPhoto) {
      return
    }

    const pinId = crypto.randomUUID()
    const nextPin = { id: pinId, photoId: selectedPhoto.id, x, y }

    setValue('pins', [...getValues('pins'), nextPin], {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  const removePin = (pinId: string) => {
    setValue(
      'pins',
      getValues('pins').filter((pin) => pin.id !== pinId),
      { shouldDirty: true, shouldValidate: true },
    )
  }

  const skipTagging = () => {
    setValue('pins', [], { shouldDirty: true, shouldValidate: true })
  }

  return (
    <div className="col-span-12">
      <Card
        wrapperProps={{ className: 'flex flex-col' }}
        cardHeaderProps={{
          className: 'gap-3',
          children: (
            <CardHeader
              step={3}
              title="Tag Equipment"
              badge="optional"
              description="Select a photo above, then click on it to mark equipment locations."
            />
          ),
        }}
        cardContentProps={{
          className: 'flex flex-col',
          children: selectedPhoto?.previewUrl ? (
            <PhotoTagCanvas
              imageSrc={selectedPhoto.previewUrl}
              pins={pins.filter((pin) => pin.photoId === selectedPhoto.id)}
              onAddPin={addPin}
              onRemovePin={removePin}
            />
          ) : (
            <div className="flex aspect-video flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-6 text-center">
              <p className="text-sm font-medium text-foreground">
                Add a photo first
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Upload photos in step 1, then select one to start tagging.
              </p>
            </div>
          ),
        }}
        cardFooterProps={{
          className: 'justify-between gap-3 border-t border-border/60',
          children: (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setHelpOpen(true)}
              >
                <LuCirclePlay className="size-4 text-primary" />
                How tagging works?
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!selectedPhoto}
                onClick={skipTagging}
              >
                Skip tagging
              </Button>
            </>
          ),
        }}
      />

      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>How tagging works</DialogTitle>
            <DialogDescription>
              Tagging helps people discover the gear in your setup.
            </DialogDescription>
          </DialogHeader>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Select a photo in step 1.</li>
            <li>Click anywhere on the selected photo to place a tag.</li>
            <li>Click a tag again to remove it.</li>
            <li>Equipment details can be added later from your setup page.</li>
          </ol>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TagEquipment
