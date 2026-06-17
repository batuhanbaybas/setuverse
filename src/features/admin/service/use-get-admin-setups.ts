import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '#/shared/lib/query-keys'

import { adminQueryStaleTime } from '../lib/admin-query-options'
import type { GetAdminSetupsInput } from '../server/get-admin-setups.functions'
import type { GetAdminSetupsResult } from '../server/get-admin-setups.functions'
import { getAdminSetupsFn } from '../server/get-admin-setups.functions'

const useGetAdminSetups = (input: GetAdminSetupsInput, enabled = true) => {
  return useQuery<GetAdminSetupsResult, Error>({
    queryKey: [queryKeys.getAdminSetups, input],
    queryFn: () => getAdminSetupsFn({ data: input }),
    enabled,
    staleTime: adminQueryStaleTime,
    placeholderData: (previousData) => previousData,
  })
}

export default useGetAdminSetups
