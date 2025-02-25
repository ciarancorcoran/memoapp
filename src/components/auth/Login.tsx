import React  from "react"
import { LoginProps } from "./type"
import Button from "../button/Button"

const Login: React.FC<LoginProps> = ({
  accessTokenValid,
  accessToken,
  loggedIn,
  handleInputChange,
  onLoginClick
}) => (
    <>
      <div className="flex items-center">
        <div className="flex-grow">
          <input
            id="access_token"
            disabled={!!loggedIn}
            data-testid="access_token"
            type="text"
            placeholder="Access Token"
            value={accessToken}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 focus:ring-opacity-50 ${loggedIn && 'opacity-50 cursor-not-allowed'}`} />
        </div>
        <Button
          disabled={!accessTokenValid || !!loggedIn}
          id="login"
          dataTestId="login"
          className={`py-2 px-4 rounded text-white`}
          onClick={onLoginClick}>
            Login
        </Button>
      </div>
    </>
)

export default Login