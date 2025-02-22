import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addMemo } from "../api/api"
import { Memo } from "../components/memo/Memos"

interface AddMemoParams {
  token: string
  catId: number
  title: string
  content: string
}

export const useAddMemo = (onSuccessCallback?: (memo: Memo) => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ token, catId, title, content }: AddMemoParams) => {
      const response = await addMemo(token, catId, title, content)
      if (!response.ok) throw new Error("Failed to add memo")
      return response.json()
    },
    onSuccess: (memo) => {
      queryClient.invalidateQueries({ queryKey: ["memos"] })
      if (onSuccessCallback) {
        onSuccessCallback(memo)
      }
    }
  })
}
