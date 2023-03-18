import { LoginUserProps, RegisterProps } from './registerInterface'

export interface UserProviderContext {
  registerUser: (user: RegisterProps) => void
  loginUser: (credentials: LoginUserProps) => Promise<string | undefined>
  isLoading: boolean
}
