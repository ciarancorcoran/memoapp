import React from 'react'
import Loading from '../loading/Loading'
import CategoryItem from './CategoryItem'
import Error from '../error/Error'
import { useGetMemos } from '../../hooks/useGetMemos'
import { useMemoContext } from '../../context/memoContext'
import MemoForm from './MemoForm'
import { useGetSelectedMemo } from '../../hooks/useGetSelectedMemo'

export type Category = {
  id: number
  name: string
}

export type Memo = {
  id: number
  category_id: number
  title: string
  content: string
}

interface MemosProps {
  accessToken: string
  loggedIn: boolean
  catsLoading: boolean
  catsError: Error | null
  cats: Category[]
}

const Memos: React.FC<MemosProps> = ({ accessToken, cats, catsLoading, catsError }) => {
  const { selectedCat, selectedMemo, setSelectedMemo, setSelectedCat } = useMemoContext()
  const { data: memos, isLoading: memosLoading, error: memosError } = useGetMemos(accessToken, selectedCat, !!selectedCat)
  const { data: memo } = useGetSelectedMemo(accessToken, selectedMemo, !!selectedMemo)

  const handleCatClick = (id: number) => {
    setSelectedCat(selectedCat === id ? undefined : id)
  }

  const handleMemoClick = (id: number) => {
    setSelectedMemo(id)
  }

  return (
    <>
      {catsLoading && <Loading loadingText="Loading categories..." />}
      {catsError && <Error error={catsError} />}
      {cats &&
        <div className="flex w-full h-screen">
          <ul className='w-1/3 h-screen overflow-y-auto border-r border-gray-300'>
            { cats.map((cat: Category) =>
              <CategoryItem
                key={cat.id}
                cat={cat}
                selectedCat={selectedCat}
                memos={memos}
                memosLoading={memosLoading}
                memosError={memosError}
                handleCatClick={handleCatClick}
                handleMemoClick={handleMemoClick}
              />)}
          </ul>
          <MemoForm
            key={memo?.id || "new"}
            memo={memo}
            accessToken={accessToken} />
        </div>
      }
    </>
  )
}

export default Memos