import useSWR from "swr"
import { GenericDataResponse } from "../../../types/api"
import { APIPathsV1, swrFetcher } from "../../api/other"
import useUser from "./useUser"

export default function useFavorites() {
  const { loading, access, isUser } = useUser()
  const { data, error, isLoading } = useSWR(!loading && access && isUser ? APIPathsV1.Favorites : null, (key) =>
    swrFetcher<GenericDataResponse<string[]>>(key),
  )

  let favorites = null
  let favoritesCount = 0
  if (data) {
    favorites = data.Data
    favoritesCount = data.Count
  }

  return {
    favorites,
    favoritesCount,
    isLoading,
    error,
  }
}
