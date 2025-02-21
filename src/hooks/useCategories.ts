import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../api/api"

export const useCategories = (token: string, loggedIn: boolean) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories', token],
    queryFn: () => getCategories(token),
    enabled: !!loggedIn
  })

  return { data, isLoading, error }
}