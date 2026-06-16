import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useNavigate } from '@tanstack/react-router'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useUploader } from 'react-upload-kit'

import Card from '#/shared/components/ui/card'
import { Form, FormField } from '#/shared/components/ui/form'

import { useCreateFlowSubmit } from '../../context/create-flow-context'
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
    mode: 'onChange',
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

  const {
    formState: { isValid, isSubmitting, errors },
  } = form

  const handleImageRemoved = useCallback(() => {
    form.setValue('imageUrl', '', {
      shouldDirty: true,
      shouldValidate: true,
    })
    uploadSetupImage.reset()
  }, [form, uploadSetupImage])

  const onSubmit = useCallback(
    async (values: SetupImageFormValues) => {
      try {
        const setup = await createSetup.mutateAsync({ imageUrl: values.imageUrl })

        await navigate({
          to: '/create/$id/info',
          params: { id: setup.id },
        })
      } catch (error) {
        form.setError('root', {
          message:
            error instanceof Error ? error.message : 'Failed to create setup',
        })
      }
    },
    [createSetup, form, navigate],
  )

  useCreateFlowSubmit({
    submit: () => form.handleSubmit(onSubmit)(),
    isReady: isReady && isValid,
    isSubmitting: isSubmitting || createSetup.isPending,
    hint: isReady
      ? 'Image uploaded successfully. You can continue when ready.'
      : 'Upload an image to continue to setup details.',
    error: errors.root?.message ?? errors.imageUrl?.message ?? null,
  })

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="imageUrl"
        render={({ field }) => <input type="hidden" {...field} />}
      />

      <section className="flex flex-1 flex-col">
        <Card
          wrapperProps={{ className: 'flex-1' }}
          cardHeaderProps={{
            className: 'space-y-2 border-b pb-4',
            children: <UploadCardHeader />,
          }}
          cardContentProps={{
            className: 'flex flex-1 flex-col space-y-3',
            children: (
              <>
                {!hasFile ? <UploadDropzone onDrop={uploader.addFiles} /> : null}
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
        />
      </section>
    </Form>
  )
}

export default SetupImageUpload
