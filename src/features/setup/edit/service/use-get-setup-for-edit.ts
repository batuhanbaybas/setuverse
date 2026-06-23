import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import { setupEditQueryKeys } from '../lib/query-keys'
import { getSetupForEditFn } from '../server/get-setup-for-edit.functions'

const useGetSetupForEdit = (setupId: string) => {
  const getSetupForEdit = useServerFn(getSetupForEditFn)

  return useQuery({
    queryKey: setupEditQueryKeys.getSetupForEdit(setupId),
    queryFn: () => getSetupForEdit({ data: { setupId } }),
    enabled: Boolean(setupId),
  })
}

export default useGetSetupForEdit
