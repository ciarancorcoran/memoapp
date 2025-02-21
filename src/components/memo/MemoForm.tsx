import React, { useState } from "react"
import { Memo } from "./Memos"
import { useUpdateMemo } from "../../hooks/useUpdateMemo"

interface MemoFormProps {
  memo?: Memo
  accessToken: string
}

const MemoForm: React.FC<MemoFormProps> = ({ memo, accessToken }) => {
  const [title, setTitle] = useState(memo?.title || "")
  const [content, setContent] = useState(memo?.content || "")
  const [saving, setSaving] = useState(false)
  const { mutateAsync } = useUpdateMemo()

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setSaving(true)

    try {
      await mutateAsync({
        accessToken,
        memoId: memo?.id!,
        title,
        content,
      })
    } catch (err) {
      console.error('Error updating memo:', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-2/3 flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg">
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
      <button
        disabled={saving || !memo?.id}
        id="save-memo"
        type="submit"
        className={`bg-green-500 text-white py-2 px-4 rounded transition ${!memo?.id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
      >
        {saving ? 'Saving...' : 'Save'}
      </button>
    </form>
  )
}

export default MemoForm
