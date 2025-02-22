import React, { useState } from "react"
import { Memo } from "./Memos"
import { useUpdateMemo } from "../../hooks/useUpdateMemo"
import Button from "../button/Button"
import { useDeleteMemo } from "../../hooks/useDeleteMemo"
import { useMemoContext } from "../../context/memoContext"

interface MemoFormProps {
  categoryId: number
  memo?: Memo
  accessToken: string
}

const MemoForm: React.FC<MemoFormProps> = ({ categoryId, memo, accessToken }) => {
  const { setSelectedMemo } = useMemoContext()
  const [title, setTitle] = useState(memo?.title || "")
  const [content, setContent] = useState(memo?.content || "")
  const { mutate: saveMemo } = useUpdateMemo()
  const { mutate: deleteMemo } = useDeleteMemo()

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    saveMemo({
      token: accessToken,
      memoId: memo?.id!,
      catId: categoryId,
      title,
      content,
    })
  }

  const handleDelete = () => deleteMemo({ token: accessToken, id: memo?.id! }, { onSuccess: () => setSelectedMemo(undefined) })

  return (
    <form onSubmit={handleSaveSubmit} className="w-2/3 flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg">
      <div>
        <label htmlFor="memo-title" className="block text-gray-700 font-semibold">
          Title
        </label>
        <input
          disabled={!memo?.id}
          id="memo-title"
          type="text"
          placeholder="Enter memo title"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label htmlFor="memo-content" className="block text-gray-700 font-semibold">
          Content
        </label>
        <textarea
          disabled={!memo?.id}
          id="memo-content"
          rows={5}
          placeholder="Enter memo content"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={content}
          onChange={handleContentChange}
        />
      </div>
      <Button
        disabled={!memo?.id}
        id="save-memo"
        type="submit"
        className="self-start bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition"
      >
        Save
      </Button>
      <Button
        disabled={!memo?.id}
        id="delete-memo"
        onClick={handleDelete}
        className="self-start bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
      >
        Delete
      </Button>
    </form>
  )
}

export default MemoForm
