import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import { queryKeys } from '../lib/query-keys'
import { getProfileLikedSetupsFn } from '../server/get-profile-liked-setups'
import type { LikedSetup } from '../server/get-profile-liked-setups'

const useGetProfileLikedSetups = (): UseQueryResult<LikedSetup[], Error> => {
  const getProfileLikedSetups = useServerFn(getProfileLikedSetupsFn)

  return useQuery<LikedSetup[], Error>({
    queryKey: [queryKeys.getProfileLikedSetups],
    queryFn: getProfileLikedSetups,
  })
}

export default useGetProfileLikedSetups
