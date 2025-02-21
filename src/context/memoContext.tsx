import React, { createContext, useContext, useState, ReactNode } from "react"

interface MemoContextType {
  selectedCat: number | undefined
  selectedMemo: number | undefined
  setSelectedCat: (id: number | undefined) => void
  setSelectedMemo: (id: number | undefined) => void
  resetState: () => void
}

const MemoContext = createContext<MemoContextType | undefined>(undefined)

export const MemoProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCat, setSelectedCat] = useState<number | undefined>()
  const [selectedMemo, setSelectedMemo] = useState<number | undefined>()

  const resetState = () => {
    setSelectedCat(undefined)
  }

  return (
    <MemoContext.Provider value={{ selectedCat, selectedMemo, setSelectedCat, setSelectedMemo, resetState }}>
      {children}
    </MemoContext.Provider>
  )
}

export const useMemoContext = () => {
  const context = useContext(MemoContext)
  if (!context) throw new Error("useMemoContext must be used within MemoProvider")
  return context
}
