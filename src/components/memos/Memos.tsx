import React, { useEffect, useState } from 'react'
import Loading from '../loading/Loading'
import CategoryItem from './CategoryItem'
import Error from '../error/Error'
import { useGetMemos } from '../../hooks/useGetMemos'
import MemoForm from './MemoForm'
import { useGetSelectedMemo } from '../../hooks/useGetSelectedMemo'
import { useAddMemo } from '../../hooks/useAddMemo'
import Button from '../button/Button'
import { useMemoContext } from '../../context/memoContext'
import { useDeleteMemo } from '../../hooks/useDeleteMemo'
import { useUpdateMemo } from '../../hooks/useUpdateMemo'

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
  const { selectedCat, setSelectedCat } = useMemoContext()
  const [ selectedMemo, setSelectedMemo ] = useState<number | undefined>()
  const [ isDeleteEnabled, setIsDeleteEnabled ] = useState(false)
  const [ title, setTitle ] = useState("")
  const [ content, setContent ] = useState("")
  const { data: memos, isLoading: memosLoading, error: memosError } = useGetMemos(accessToken, selectedCat, !!selectedCat)
  const { data: memo } = useGetSelectedMemo(accessToken, selectedMemo, !!selectedMemo)
  const { mutate: addNewMemo } = useAddMemo()
  const { mutate: saveMemo } = useUpdateMemo()
  const { mutate: deleteMemo } = useDeleteMemo()

  useEffect(() => {
    if (memo) {
      setTitle(memo.title)
      setContent(memo.content)
    }
  }, [memo])

  const handleCatClick = (id: number) => {
    setSelectedCat(selectedCat === id ? undefined : id)
  }

  const handleMemoClick = (id: number, catId: number, event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation()
    setSelectedCat(catId)
    setIsDeleteEnabled(true)
    setSelectedMemo(id)
  }

  const handleNewMemo = () => {
    if (!selectedCat) return

    addNewMemo({
      token: accessToken,
      catId: selectedCat,
      title: "New Memo",
      content: " "
    }, { onSuccess: (memo: Memo) => setSelectedMemo(memo.id)})

  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    saveMemo({
      token: accessToken,
      memoId: memo?.id!,
      catId: selectedCat!,
      title,
      content,
    })
  }

  const handleDelete = () => {
    setIsDeleteEnabled(false)
    deleteMemo({ token: accessToken, id: memo?.id! }, { onSuccess: () => setSelectedMemo(undefined) })
  }

  return (
    <div className="flex w-full h-screen">
      <ul className='w-1/3 h-screen overflow-y-auto border-r border-gray-300 flex flex-col'>
        {catsLoading && <Loading loadingText="Loading categories..." />}
        {catsError && <Error error={catsError} />}
        {cats &&
          cats.map((cat: Category) =>
            <CategoryItem
              key={cat.id}
              cat={cat}
              selectedCat={selectedCat}
              memos={memos}
              memosLoading={memosLoading}
              memosError={memosError}
              handleCatClick={handleCatClick}
              handleMemoClick={handleMemoClick}
            />
        )}
        <Button
          id={'new-memo'}
          disabled={!selectedCat}
          onClick={handleNewMemo}
          className='bg-green-500 py-2 px-4 mt-4 self-end w-auto mr-5 rounded hover:bg-green-600'
        >
          New
        </Button>
      </ul>
      <MemoForm
        key={memo?.id || "new"}
        memo={memo!}
        isDeleteEnabled={isDeleteEnabled}
        title={title}
        content={content}
        handleTitleChange={handleTitleChange}
        handleContentChange={handleContentChange}
        handleSaveSubmit={handleSaveSubmit}
        handleDelete={handleDelete} />
    </div>
  )
}

export default Memos