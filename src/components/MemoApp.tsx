import React from "react"
import Login from "./auth/Login"
import { useLogin } from "../hooks/useLogin"
import { isAccessTokenValid } from "../utils/isTokenValid"
import { useCategories } from "../hooks/useCategories"
import { useMemoContext } from "../context/memoContext"
import Memos from "./memo/Memos"


const MemoApp = () => {
  const { accessToken, accessTokenValid, loggedIn, setLoggedIn, handleAccessTokenChange } = useLogin()
  const { data: cats, isLoading: catsLoading, error: catsError } = useCategories(accessToken, loggedIn)
  const { setSelectedCat } = useMemoContext()

  const onLoginClick = () => {
    if (!accessToken) return
    setLoggedIn(true)
    setSelectedCat(undefined)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAccessTokenValid(e.target.value)) {
      return
    }
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