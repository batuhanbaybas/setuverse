import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { queryKeys } from '#/features/create-setup/lib/query-keys'

import type { SetupImageUploadResponse } from '../lib/setup-image-upload-adapter'
import { uploadSetupImageFn } from '../server/upload-setup-image.functions'

type UseUploadSetupImageOptions = Pick<
  UseMutationOptions<SetupImageUploadResponse, Error, File>,
  'onSuccess'
>

const useUploadSetupImage = (options?: UseUploadSetupImageOptions) => {
  return useMutation({
    mutationKey: [queryKeys.uploadSetupImage],
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)
      return uploadSetupImageFn({ data: formData })
    },
    ...options,
  })
}

export default useUploadSetupImage
