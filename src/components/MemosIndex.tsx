import React from "react"
import Login from "./auth/Login"
import Memos from "./memos/Memos"
import { useLogin } from "../hooks/useLogin"
import { useCategories } from "../hooks/useCategories"
import { useMemoContext } from "../context/memoContext"

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
        loggedIn={loggedIn}
        accessTokenValid={accessTokenValid}
        handleInputChange={handleInputChange}
        onLoginClick={onLoginClick}
      />
      { loggedIn && <Memos
          accessToken={submittedToken}
          loggedIn={loggedIn}
          cats={cats}
          catsLoading={catsLoading}
          catsError={catsError} /> }
    </>
  )
}

export default MemoApp