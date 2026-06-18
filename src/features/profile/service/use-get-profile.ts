import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '#/features/profile/lib/query-keys'

import type { GetProfileResult } from '../server/get-profile.functions'
import { getProfileFn } from '../server/get-profile.functions'

const useGetProfile = (userId?: string) => {
  return useQuery<GetProfileResult, Error>({
    queryKey: [queryKeys.getProfile, userId ?? 'me'],
    queryFn: () => getProfileFn({ data: userId ? { userId } : {} }),
  })
}

export default useGetProfile
