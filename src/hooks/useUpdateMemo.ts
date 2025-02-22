import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateMemo } from "../api/api"

interface Memo {
  id: number
  title: string
  content: string
}

interface MemoUpdateParams {
  token: string
  memoId: number
  catId: number
  title: string
  content: string
}

export const useUpdateMemo = () => {
  const queryClient = useQueryClient()
  return useMutation<Memo, Error, MemoUpdateParams>({
    mutationFn: async ({ token, memoId, catId, title, content }) => {
      const response = await updateMemo(token, memoId, catId, title, content)
      if (!response.ok) throw new Error("Failed to update memo")
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["selectedMemo"] })
      queryClient.invalidateQueries({ queryKey: ["memos"] })
    }
  })
}
