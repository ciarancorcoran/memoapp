import React from "react"

interface MemoItemProps {
  id: number
  catId: number
  title: string
  handleMemoClick: (id: number, catId: number, event: React.MouseEvent<HTMLLIElement>) => void
}

const MemoItem: React.FC<MemoItemProps> = ({ id, catId, title, handleMemoClick }) =>
<li
  id={`memo-${id}`}
  className="pl-4 py-2 cursor-pointer hover:bg-gray-200 hover:text-blue-500"
  onClick={(e) => handleMemoClick(id, catId, e)}>
  {title}
</li>

export default MemoItem