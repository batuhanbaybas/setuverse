import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useNavigate } from '@tanstack/react-router'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useUploader } from 'react-upload-kit'

import Card from '#/shared/components/ui/card'
import { Form, FormField } from '#/shared/components/ui/form'

import { createSetupImageUploadAdapter } from '../../lib/setup-image-upload-adapter'
import type { SetupImageUploadResponse } from '../../lib/setup-image-upload-adapter'
import {
  setupImageFormDefaultValues,
  setupImageFormSchema,
} from '../../lib/setup-image-form'
import type { SetupImageFormValues } from '../../lib/setup-image-form'
import {
  SETUP_IMAGE_ACCEPT,
  SETUP_IMAGE_MAX_FILE_SIZE,
  SETUP_IMAGE_MAX_FILES,
} from '../../lib/upload-config'
import useCreateSetup from '../../service/use-create-setup'
import useUploadSetupImage from '../../service/use-upload-setup-image'
import UploadCardFooter from './upload-card-footer'
import UploadCardHeader from './upload-card-header'
import UploadDropzone from './upload-dropzone'
import UploadFileList from './upload-file-list'
import UploadRejections from './upload-rejections'

function SetupImageUpload() {
  const navigate = useNavigate()
  const createSetup = useCreateSetup()

  const form = useForm<SetupImageFormValues>({
    resolver: standardSchemaResolver(setupImageFormSchema),
    defaultValues: setupImageFormDefaultValues,
    mode: 'onSubmit',
  })

  const uploadSetupImage = useUploadSetupImage({
    onSuccess: (response) => {
      form.setValue('imageUrl', response.url, {
        shouldDirty: true,
        shouldValidate: true,
      })
    },
  })

  const uploadAdapter = useMemo(
    () => createSetupImageUploadAdapter((file) => uploadSetupImage.mutateAsync(file)),
    [uploadSetupImage.mutateAsync],
  )

  const uploader = useUploader<SetupImageUploadResponse>({
    adapter: uploadAdapter,
    accept: [...SETUP_IMAGE_ACCEPT],
    maxFileSize: SETUP_IMAGE_MAX_FILE_SIZE,
    maxFiles: SETUP_IMAGE_MAX_FILES,
    autoUpload: true,
    maxRetries: 0,
  })

  const hasFile = uploader.files.length > 0
  const selectedFile = uploader.files[0]
  const isReady = hasFile && selectedFile.status === 'success'

  const handleImageRemoved = useCallback(() => {
    form.setValue('imageUrl', '', {
      shouldDirty: true,
      shouldValidate: true,
    })
    uploadSetupImage.reset()
  }, [form, uploadSetupImage])

  const onSubmit = async (values: SetupImageFormValues) => {
      const setup = await createSetup.mutateAsync({ imageUrl: values.imageUrl })

      await navigate({
        to: '/create/$id/info',
        params: { id: setup.id },
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => <input type="hidden" {...field} />}
        />

        <section className="w-full">
          <Card
            wrapperProps={{ className: 'w-full' }}
            cardHeaderProps={{
              className: 'space-y-3 border-b pb-6',
              children: <UploadCardHeader />,
            }}
            cardContentProps={{
              className: 'space-y-4 pt-2',
              children: (
                <>
                  {!hasFile ? (
                    <UploadDropzone onDrop={uploader.addFiles} />
                  ) : null}
                  <UploadRejections rejections={uploader.rejections} />
                  {hasFile ? (
                    <UploadFileList
                      uploader={uploader}
                      onImageRemoved={handleImageRemoved}
                    />
                  ) : null}
                </>
              ),
            }}
            cardFooterProps={{
              className:
                'flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between',
              children: <UploadCardFooter isReady={isReady} />,
            }}
          />
        </section>
      </form>
    </Form>
  )
}

export default SetupImageUpload
