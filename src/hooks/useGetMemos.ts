import { useQuery } from "@tanstack/react-query"
import { getMemos } from "../api/api"

export const useGetMemos = (token: string, id: number | undefined, enabled: boolean) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['memos', id],
    queryFn: () => id ? getMemos(token, id) : null,
    enabled: !!id && !!enabled && !!token
  })

  return { data, isLoading, error }
}