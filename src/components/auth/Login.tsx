import React from "react"
import { LoginProps } from "./type"

const Login: React.FC<LoginProps> = ({
  accessToken,
  handleInputChange,
  accessTokenValid,
  onLoginClick
}) => (
  <div className="bg-blue-500 flex items-center">
    <div className="flex-grow">
      <input
        id="access_token"
        data-testid="access_token"
        type="text"
        placeholder="Access Token"
        value={accessToken}
        onChange={(e) => handleInputChange(e)}
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

export default Login