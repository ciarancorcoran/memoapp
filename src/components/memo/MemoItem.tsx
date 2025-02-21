import React from "react"

interface MemoItemProps {
  id: number
  title: string
}

const MemoItem: React.FC<MemoItemProps> = ({ id, title }) => {

  return <li
    id={`memo-${id}`}
    className="pl-4 py-2 text-gray-700 cursor-pointer transition duration-200 hover:bg-gray-200 hover:text-blue-500"
    key={id}>
      {title}
    </li>
}

export default MemoItem