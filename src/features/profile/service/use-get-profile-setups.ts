import { useQuery } from "@tanstack/react-query"
import type { UseQueryResult } from "@tanstack/react-query"
import { getProfileSetupFn } from "../server/get-profile-setup-functions"
import { queryKeys } from "../lib/query-keys"
import type { ProfileSetup } from "../server/get-profile.functions"



const useGetProfileSetups = (userId?: string) : UseQueryResult<ProfileSetup[], Error> => {
    return useQuery<ProfileSetup[], Error>({
        queryKey: [queryKeys.getProfileSetup, userId],
        queryFn: () => getProfileSetupFn({
            data: { userId },
        }),
    })
}
export default useGetProfileSetups