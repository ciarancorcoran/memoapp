export interface LoginProps {
  accessToken: string
  accessTokenValid: boolean
  loggedIn: boolean
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onLoginClick: () => void
}