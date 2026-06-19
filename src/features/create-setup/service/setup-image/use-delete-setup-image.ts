import { useMutation } from '@tanstack/react-query'

import { queryKeys } from '#/features/create-setup/lib/query-keys'

import { deleteSetupImageFn } from '../../server/delete-setup-image.functions'

const useDeleteSetupImage = () => {
  return useMutation({
    mutationKey: [queryKeys.deleteSetupImage],
    mutationFn: (key: string) => deleteSetupImageFn({ data: { key } }),
  })
}

export default useDeleteSetupImage
