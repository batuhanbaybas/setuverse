import { useQuery } from '@tanstack/react-query'
import getSetupDetail from '../server/get-setup-detail'
import { useServerFn } from '@tanstack/react-start'

const useGetSetupDetail = (id: string) => {
  const getSetupDetailFn = useServerFn(getSetupDetail)
  return useQuery({
    queryKey: ['get-setup-detail', id],
    queryFn: () => getSetupDetailFn({ data: { id } }),
  })
}

export default useGetSetupDetail