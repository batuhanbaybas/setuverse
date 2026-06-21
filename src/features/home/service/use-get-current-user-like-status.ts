import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import { queryKeys } from '../lib/query-keys'
import { getCurrentUserLikeStatusFn } from '../server/get-current-user-like-status'
import type { GetCurrentUserLikeStatusResult } from '../server/get-current-user-like-status'

const useGetCurrentUserLikeStatus = (
  setupId: string,
): UseQueryResult<GetCurrentUserLikeStatusResult, Error> => {
  const getCurrentUserLikeStatus = useServerFn(getCurrentUserLikeStatusFn)

  return useQuery<GetCurrentUserLikeStatusResult, Error>({
    queryKey: [queryKeys.getCurrentUserLikeStatus, setupId],
    queryFn: () => getCurrentUserLikeStatus({ data: { setupId } }),
    enabled: Boolean(setupId),
  })
}

export default useGetCurrentUserLikeStatus
