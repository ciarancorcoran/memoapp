export interface LoginProps {
  accessToken: string
  accessTokenValid: boolean
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onLoginClick: () => void
}