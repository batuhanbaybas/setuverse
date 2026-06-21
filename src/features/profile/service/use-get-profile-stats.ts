import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import { queryKeys } from '../lib/query-keys'
import { getProfileStatsFn } from '../server/get-profile-stats.functions'
import type { GetProfileStatsResult } from '../server/get-profile-stats.functions'

const useGetProfileStats = (): UseQueryResult<GetProfileStatsResult, Error> => {
  const getProfileStats = useServerFn(getProfileStatsFn)

  return useQuery<GetProfileStatsResult, Error>({
    queryKey: [queryKeys.getProfileStats],
    queryFn: getProfileStats,
  })
}

export default useGetProfileStats