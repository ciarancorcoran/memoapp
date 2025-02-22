import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addMemo } from "../api/api"

interface AddMemoParams {
  token: string
  catId: number
  title: string
  content: string
}

export const useAddMemo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ token, catId, title, content }: AddMemoParams) =>
      addMemo(token, catId, title, content),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["memos"] })
  })
}
