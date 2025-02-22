import { useState } from "react"
import { uuid } from "../utils/generateAccessToken"
import { isAccessTokenValid } from "../utils/isTokenValid"

export const useLogin = () => {
  const access_token = uuid()
  const [ accessToken, setAccessToken ] = useState(access_token)
  const [ accessTokenValid, setAccessTokenValid ] = useState(isAccessTokenValid(access_token))
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ submittedToken, setSubmittedToken ] = useState('')

  const handleAccessTokenChange = (token: string) => {
    setAccessToken(token)
    setAccessTokenValid(isAccessTokenValid(token))
  }

  const loginClicked = () =>{
    setSubmittedToken(accessToken)
    setLoggedIn(true)
    setAccessTokenValid(false)
  }

  return {
    loggedIn,
    accessToken,
    accessTokenValid,
    submittedToken,
    loginClicked,
    handleAccessTokenChange
  }
}