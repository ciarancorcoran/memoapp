import React from "react"
import { useLogin } from "../../hooks/useLogin"

const Login: React.FC = () => {
  const { accessToken, accessTokenValid, handleAccessTokenChange, onLoginClick } = useLogin()

  return (
    <div className="bg-blue-500 flex items-center">
      <div className="flex-grow">
        <input
          id="access_token"
          data-testid="access_token"
          type="text"
          placeholder="Access Token"
          value={accessToken}
          onChange={(e) => handleAccessTokenChange(e)}
          className="w-full px-4 py-2 bg-blue-500 text-white border-none rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" />
      </div>
      <button
        disabled={!accessTokenValid}
        id="login"
        data-testid="login"
        className={`font-bold py-2 px-4 rounded text-white ${!accessTokenValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        onClick={onLoginClick}>
          Login
      </button>
    </div>
  )
}

export default Login