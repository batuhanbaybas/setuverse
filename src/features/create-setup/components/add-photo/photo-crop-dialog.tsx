import { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import type {Area} from 'react-easy-crop';
import { Button } from '#/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from '#/shared/components/ui/dialog'
import { Slider } from '#/shared/components/ui/slider'
import { getCroppedImage } from '../../lib/get-cropped-image'

const COVER_ASPECT = 16 / 9

type PhotoCropDialogProps = {
  open: boolean
  imageSrc: string
  fileName: string
  onOpenChange: (open: boolean) => void
  onCancel: () => void
  onComplete: (file: File, previewUrl: string) => void
}

function PhotoCropDialog({
  open,
  imageSrc,
  fileName,
  onOpenChange,
  onCancel,
  onComplete,
}: PhotoCropDialogProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  const handleSave = async () => {
    if (!croppedAreaPixels) {
      return
    }

    setIsSaving(true)

    try {
      const croppedBlob = await getCroppedImage(imageSrc, croppedAreaPixels)
      const croppedFile = new File([croppedBlob], fileName, {
        type: croppedBlob.type,
      })
      const previewUrl = URL.createObjectURL(croppedBlob)

      onComplete(croppedFile, previewUrl)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onCancel()
        }

        onOpenChange(nextOpen)
      }}
    >
      <DialogContent
        showCloseButton
        className="top-[50%] left-[50%] w-[min(calc(100vw-1rem),1200px)] max-w-none translate-x-[-50%] translate-y-[-50%] gap-0 overflow-hidden border-0 bg-black p-0 sm:max-w-none [&_[data-slot=dialog-close]]:z-10 [&_[data-slot=dialog-close]]:text-white [&_[data-slot=dialog-close]]:hover:bg-white/10"
      >
        <div className="relative aspect-video w-full">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={COVER_ASPECT}
            objectFit="cover"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: {
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
              },
              cropAreaStyle: {
                border: 'none',
                boxShadow: 'none',
              },
            }}
          />
        </div>

        <div className="space-y-4 border-t border-white/10 bg-background px-6 py-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Zoom</p>
            <Slider
              min={1}
              max={3}
              step={0.05}
              value={[zoom]}
              onValueChange={(value) => setZoom(value[0] ?? 1)}
            />
          </div>

          <DialogFooter className="gap-2 sm:justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={isSaving || !croppedAreaPixels}
            >
              {isSaving ? 'Saving...' : 'Apply crop'}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PhotoCropDialog
