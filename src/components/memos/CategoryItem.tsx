import React from "react"
import MemoItem from "./MemoItem"
import Loading from "../loading/Loading"
import Error from "../error/Error"
import { Category } from "./Memos"

type Memos = {
  id: number
  title: string
}

interface CategoryProps {
  cat: Category
  memos: Memos[]
  selectedCat: number | undefined
  memosLoading: boolean
  memosError: Error | null
  handleCatClick: (id: number) => void
  handleMemoClick: (id: number, catId: number, event: React.MouseEvent<HTMLLIElement>) => void
}
const CategoryItem: React.FC<CategoryProps> = ({ cat, selectedCat, memos, memosLoading, memosError, handleCatClick, handleMemoClick }) => {
  const selected = selectedCat === cat.id

  return (
    <div key={cat.id}>
      <li
        className={`p-3 text-gray-700 cursor-pointer ${selected && 'text-blue-500'}
        hover:bg-gray-200`}
        id={`category-${cat.id}`}
        onClick={() => handleCatClick(cat.id)}>
        <p id={`category-${cat.id}-title`}>{cat.name}</p>
        {selected && (
          <>
            {memosLoading && <Loading loadingText="Loading memos items..." />}
            {memosError && <Error error={memosError} />}
            {memos && <ul>{memos.map((memo) => <MemoItem key={memo.id} title={memo.title} id={memo.id} catId={selectedCat} handleMemoClick={handleMemoClick} />)}</ul>}
          </>
        )}
      </li>
    </div>
  )
}

export default CategoryItem