import { useQuery } from "@tanstack/react-query"
import { getSelectedMemo } from "../api/api"

export const useGetSelectedMemo = (token: string, id: number | undefined, enabled: boolean) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['selectedMemo', token, id],
    queryFn: () => id ? getSelectedMemo(token, id) : null,
    enabled: !!id && !!enabled
  })

  return { data, isLoading, error }
}