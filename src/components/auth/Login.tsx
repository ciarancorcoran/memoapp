import React from "react"
import { LoginProps } from "./type"
import Button from "../button/Button"

const Login: React.FC<LoginProps> = ({
  accessToken,
  handleInputChange,
  accessTokenValid,
  onLoginClick
}) => {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e)
  }

  return (
    <div className="bg-blue-500 flex items-center">
      <div className="flex-grow">
        <input
          id="access_token"
          data-testid="access_token"
          type="text"
          placeholder="Access Token"
          value={accessToken}
          onChange={onInputChange}
          className="w-full px-4 py-2 bg-blue-500 text-white border-none rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" />
      </div>
      <Button
        disabled={!accessTokenValid}
        id="login"
        data-testid="login"
        className={`bg-blue-500 font-bold py-2 px-4 rounded text-white ${accessTokenValid && 'hover:bg-blue-700'}`}
        onClick={onLoginClick}>
          Login
      </Button>
    </div>
)}

export default Login