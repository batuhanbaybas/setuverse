import { useQuery  } from "@tanstack/react-query"
import type {UseQueryResult} from "@tanstack/react-query";
import { queryKeys } from "../lib/query-keys"
import { getProfileSetupStatisticsFn  } from "../server/get-profile-setup-statistics"
import type {GetProfileSetupStatisticsResult} from "../server/get-profile-setup-statistics";

const useGetProfileStats = () : UseQueryResult<GetProfileSetupStatisticsResult, Error> => {
    return useQuery<GetProfileSetupStatisticsResult, Error>({
        queryKey: [queryKeys.getProfileStats],
        queryFn: getProfileSetupStatisticsFn,
    })
}

export default useGetProfileStats