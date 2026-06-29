import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import { queryKeys } from '../lib/query-keys'
import { getCurrentUserRateStatusFn } from '../server/get-current-user-rate-status'
import type { GetCurrentUserRateStatusResult } from '../server/get-current-user-rate-status'

const useGetCurrentUserRateStatus = (
  setupId: string,
): UseQueryResult<GetCurrentUserRateStatusResult, Error> => {
  const getCurrentUserRateStatus = useServerFn(getCurrentUserRateStatusFn)

  return useQuery<GetCurrentUserRateStatusResult, Error>({
    queryKey: [queryKeys.getCurrentUserRateStatus, setupId],
    queryFn: () => getCurrentUserRateStatus({ data: { setupId } }),
    enabled: Boolean(setupId),
  })
}

export default useGetCurrentUserRateStatus
