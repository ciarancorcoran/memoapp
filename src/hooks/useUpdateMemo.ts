import { useMutation } from "@tanstack/react-query"
import { updateMemo } from "../api/api"

interface Memo {
  id: number
  title: string
  content: string
}

interface MemoUpdateParams {
  accessToken: string
  memoId: number
  title: string
  content: string
}

export const useUpdateMemo = () => {
  return useMutation<Memo, Error, MemoUpdateParams>({
    mutationFn: async ({ accessToken, memoId, title, content }) => {
      const response = await updateMemo(accessToken, memoId, title, content)
      if (!response.ok) throw new Error("Failed to update memo")
      return response.json()
    }
  })
}
