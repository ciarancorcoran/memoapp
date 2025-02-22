import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteMemo } from "../api/api"

export const useDeleteMemo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ token, id }: { token: string; id: number }) =>
      deleteMemo(token, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['memos'] })
      }
  })
}