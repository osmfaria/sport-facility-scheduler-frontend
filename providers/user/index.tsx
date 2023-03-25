import { UserProviderContext } from 'interfaces/providerInterface'
import {
  RegisterProps,
  LoginUserProps,
  RegisterAxiosError,
} from 'interfaces/registerInterface'
import { childrenProp } from 'interfaces/utilityInterface'
import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'
import API from 'services/api'

const UserContext = createContext<UserProviderContext>(
  {} as UserProviderContext
)

export const UserProvider = ({ children }: childrenProp) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const registerUser = async (
    user: RegisterProps
  ): Promise<RegisterAxiosError | undefined> => {
    setIsLoading(true)
    const res = await API.post('register/', user)
      .then((_) => {
        setIsLoading(false)
        router.push('/login')
      })
      .catch((err) => {
        setIsLoading(false)
        return err.response.data
      })

    return res
  }

  const loginUser = async (
    credentials: LoginUserProps
  ): Promise<string | undefined> => {
    const user = await API.post('login/', credentials)
      .then((res) => res.data)
      .catch((err) => console.log('provider error:',err))

    return user
  }

  return (
    <UserContext.Provider value={{ registerUser, loginUser, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
