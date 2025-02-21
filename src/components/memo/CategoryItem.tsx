import React from "react"
import MemoItem from "./MemoItem"
import Loading from "../loading/Loading"
import Error from "../error/Error"

type Memos = {
  id: number
  title: string
}

interface CategoryProps {
  id: number
  name: string
  memos: Memos[]
  selectedCat: number | undefined
  memosLoading: boolean
  memosError: Error | null
  handleCatClick: (id: number) => void
}
const CategoryItem: React.FC<CategoryProps> = ({ id, name, selectedCat, memos, memosLoading, memosError, handleCatClick }) => {
  const selected = selectedCat === id

  return (
    <div key={id}>
      <li
        className={ `p-3 text-gray-700 cursor-pointer transition duration-200 ${selectedCat === id ? 'text-blue-500' : ''}
        hover:bg-gray-200`}
        id={`category-${id}`}
        onClick={() => handleCatClick(id)}>
        <p id={`category-${id}-title`}>{name}</p>
      </li>
      {selected && (
        <>
          {memosLoading && <Loading loadingText="Loading memos items..." />}
          {memosError && <Error error={memosError} />}
          {memos && <ul>{memos.map((memo) => <MemoItem key={memo.id} title={memo.title} id={memo.id} />)}</ul>}
        </>
      )}
    </div>
  )
}

export default CategoryItem