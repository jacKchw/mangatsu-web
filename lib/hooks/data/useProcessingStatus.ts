import useSWR from "swr"
import { ProcessingStatus } from "../../../types/api"
import { APIPathsV1, swrFetcher } from "../../api/other"

const fetcher = (id: string) => swrFetcher<ProcessingStatus>(id)

export default function useProcessingStatus(refresh?: boolean) {
  const { data } = useSWR(APIPathsV1.Status, (key) => fetcher(key), { refreshInterval: refresh ? 2000 : 0 })

  return {
    data,
  }
}
