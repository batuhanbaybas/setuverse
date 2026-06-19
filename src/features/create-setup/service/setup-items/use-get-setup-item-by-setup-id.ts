import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import getSetupItem from '../../server/setup-item/get-setup-item'
import type { SetupItem } from '../../lib/setup-item'

const useGetSetupItem = (setupId: string): UseQueryResult<SetupItem[]> => {
  const getSetupItemFn = useServerFn(getSetupItem)
  return useQuery({
    queryKey: ['setup-item', setupId],
    queryFn: () => getSetupItemFn({ data: { setupId } }),
  })
}

export default useGetSetupItem