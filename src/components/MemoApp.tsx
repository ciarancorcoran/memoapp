import React from "react"
import Login from "./auth/Login"
import { useLogin } from "../hooks/useLogin"
import { useCategories } from "../hooks/useCategories"
import { useMemoContext } from "../context/memoContext"
import Memos from "./memo/Memos"

const MemoApp = () => {
  const { accessToken, submittedToken, accessTokenValid, loggedIn, loginClicked, handleAccessTokenChange } = useLogin()
  const { data: cats, isLoading: catsLoading, error: catsError } = useCategories(submittedToken, loggedIn)
  const { setSelectedCat } = useMemoContext()

  const onLoginClick = () => {
    if (!accessToken) return
    loginClicked()
    setSelectedCat(undefined)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleAccessTokenChange(e.target.value)
  }

  return (
    <>
      <Login
        accessToken={accessToken}
        accessTokenValid={accessTokenValid}
        handleInputChange={handleInputChange}
        onLoginClick={onLoginClick}
      />
      { loggedIn && <Memos
          accessToken={accessToken}
          loggedIn={loggedIn}
          cats={cats}
          catsLoading={catsLoading}
          catsError={catsError} /> }
    </>
  )
}

export default MemoApp