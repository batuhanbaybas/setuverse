import { useServerFn } from "@tanstack/react-start"
import getSetupItem from "../server/get-setup-item"
import { useQuery } from "@tanstack/react-query"

const useGetSetupItem = (setupId: string) => {
  const getSetupItemFn = useServerFn(getSetupItem)
  return useQuery({
    queryKey: ['setup-item', setupId],
    queryFn: () => getSetupItemFn({ data: { setupId } }),
  })
}

export default useGetSetupItem