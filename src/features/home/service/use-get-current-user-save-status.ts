import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import { queryKeys } from '../lib/query-keys'
import { getCurrentUserSaveStatusFn } from '../server/get-current-user-save-status'
import type { GetCurrentUserSaveStatusResult } from '../server/get-current-user-save-status'

const useGetCurrentUserSaveStatus = (
  setupId: string,
): UseQueryResult<GetCurrentUserSaveStatusResult, Error> => {
  const getCurrentUserSaveStatus = useServerFn(getCurrentUserSaveStatusFn)

  return useQuery<GetCurrentUserSaveStatusResult, Error>({
    queryKey: [queryKeys.getCurrentUserSaveStatus, setupId],
    queryFn: () => getCurrentUserSaveStatus({ data: { setupId } }),
    enabled: Boolean(setupId),
  })
}

export default useGetCurrentUserSaveStatus
