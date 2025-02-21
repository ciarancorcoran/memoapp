import React from 'react'
import Loading from '../loading/Loading'
import CategoryItem from './CategoryItem'
import Error from '../error/Error'
import { useGetMemos } from '../../hooks/useGetMemos'
import { useMemoContext } from '../../context/memoContext'

type Category = {
  id: number
  name: string
}

interface MemosProps {
  accessToken: string
  loggedIn: boolean
  catsLoading: boolean
  catsError: Error | null
  cats: Category[]
}

const Memos: React.FC<MemosProps> = ({ accessToken, cats, catsLoading, catsError }) => {
  const { selectedCat, setSelectedCat } = useMemoContext()
  const { data: memos, isLoading: memosLoading, error: memosError } = useGetMemos(accessToken, selectedCat, !!selectedCat)

  const handleCatClick = (id: number) => {
    setSelectedCat(selectedCat === id ? undefined : id)
  }

  return (
    <>
      {catsLoading && <Loading loadingText="Loading categories..." />}
      {catsError && <Error error={catsError} />}
      {cats && <ul className='w-1/3 h-screen overflow-y-auto border-r border-gray-300'> {
        cats.map((cat: Category) =>
          <CategoryItem
            key={cat.id}
            id={cat.id}
            name={cat.name}
            handleCatClick={handleCatClick}
            selectedCat={selectedCat}
            memos={memos}
            memosLoading={memosLoading}
            memosError={memosError}
          />)
        }
        </ul>
      }
    </>
  )
}

export default Memos