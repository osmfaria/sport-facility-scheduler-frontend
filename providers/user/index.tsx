import { UserProviderContext } from 'interfaces/providerInterface'
import { RegisterProps, LoginUserProps } from 'interfaces/registerInterface'
import { childrenProp } from 'interfaces/utilityInterface'
import { createContext, useContext, useState } from 'react'
import API from 'services/api'

const UserContext = createContext<UserProviderContext>(
  {} as UserProviderContext
)

export const UserProvider = ({ children }: childrenProp) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const registerUser = async (user: RegisterProps): Promise<void> => {
    setIsLoading(true)
    await API.post('register/', user)
      .then((res) => {
        setIsLoading(false)
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  const loginUser = async (
    credentials: LoginUserProps
  ): Promise<string | undefined> => {
    const user = await API.post('login/', credentials)
      .then((res) => res.data)
      .catch((err) => console.log(err))

    return user
  }

  return (
    <UserContext.Provider value={{ registerUser, loginUser, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
