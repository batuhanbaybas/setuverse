import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'

import { queryKeys } from '#/features/profile/lib/query-keys'

import type { GetProfileResult } from '../server/get-profile.functions'
import { getProfileFn } from '../server/get-profile.functions'

const useGetProfile = () : UseQueryResult<GetProfileResult, Error> => {
  return useQuery<GetProfileResult, Error>({
    queryKey: [queryKeys.getProfile],
    queryFn:  getProfileFn,
  })
}

export default useGetProfile
