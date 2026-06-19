import { useQuery } from "@tanstack/react-query"
import type { UseQueryResult } from "@tanstack/react-query"
import { getProfileSetupFn } from "../server/get-profile-setup-functions"
import { queryKeys } from "../lib/query-keys"
import type { ProfileSetup } from "../server/get-profile.functions"
import { useServerFn } from "@tanstack/react-start"



const useGetProfileSetups = () : UseQueryResult<ProfileSetup[], Error> => {
    const getProfileSetup = useServerFn(getProfileSetupFn)
    return useQuery<ProfileSetup[], Error>({
        queryKey: [queryKeys.getProfileSetup],
        queryFn:  getProfileSetup,
    })
}
export default useGetProfileSetups