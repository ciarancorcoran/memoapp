import React from "react"
import { Memo } from "./Memos"
import Button from "../button/Button"

interface MemoFormProps {
  memo: Memo
  isDeleteEnabled: boolean
  title: string
  content: string
  handleSaveSubmit: (e: React.FormEvent) => void
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleDelete: () => void
}

const MemoForm: React.FC<MemoFormProps> = ({ memo, content, title, handleSaveSubmit, isDeleteEnabled, handleTitleChange, handleContentChange, handleDelete }) =>
(
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
        className="w-full p-2 border"
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
        className="w-full p-2 border"
        value={content}
        onChange={handleContentChange}
      />
    </div>
    <div className="flex gap-2">
      <Button
        disabled={!memo?.id}
        id="save-memo"
        type="submit"
        className="py-2 px-4 bg-green-500 hover:bg-green-600">
        Save
      </Button>
      <Button
        disabled={!isDeleteEnabled}
        id="delete-memo"
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4">
        Delete
      </Button>
    </div>
  </form>
)

export default MemoForm
