import { useEffect, useState } from "react"
import { uuid } from "../utils/generateAccessToken"
import { isAccessTokenValid } from "../utils/isTokenValid"

export const useLogin = () => {
  const [ accessToken, setAccessToken ] = useState('')
  const [ accessTokenValid, setAccessTokenValid ] = useState(false)
  const [ loggedIn, setLoggedIn ] = useState(false)


  useEffect(() => {
    const timer = setTimeout(() => {
      const access_token = uuid()
      if (isAccessTokenValid(access_token)) {
        setAccessToken(access_token)
        setAccessTokenValid(true)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleAccessTokenChange = (token: string) => {
    setAccessToken(token)
    setAccessTokenValid(isAccessTokenValid(token))
  }

  return {
    loggedIn,
    accessToken,
    accessTokenValid,
    setLoggedIn,
    handleAccessTokenChange
  }
}