import React, { useEffect, useState } from "react"
import { getCategories } from "../api/api"
import { uuid } from "../utils/generateAccessToken"
import { isAccessTokenValid } from "../utils/isTokenValid"

export const useLogin = () => {
  const [ accessToken, setAccessToken ] = useState('')
  const [ accessTokenValid, setAccessTokenValid ] = useState(false)

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

  const onLoginClick = async () => {
    if (!accessToken) return
    const data = await getCategories(accessToken)
    console.log("here is data: ", data)
  }

  const handleAccessTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessToken(e.target.value)
    setAccessTokenValid(isAccessTokenValid(e.target.value))
  }

  return {
    accessToken,
    accessTokenValid,
    onLoginClick,
    handleAccessTokenChange
  }
}