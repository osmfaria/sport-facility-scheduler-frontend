import { UserProviderContext } from 'interfaces/providerInterface'
import {
  RegisterProps,
  LoginUserProps,
  RegisterAxiosError,
  UpdateUserProps,
  UserProps,
  UpdateUserAxiosError,
} from 'interfaces/registerInterface'
import { childrenProp } from 'interfaces/utilityInterface'
import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import API from 'services/api'

const UserContext = createContext<UserProviderContext>(
  {} as UserProviderContext
)

export const UserProvider = ({ children }: childrenProp) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserProps>()
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
      .catch((err) => err.response.data)
      .finally(() => setIsLoading(false))

    return res
  }

  const loginUser = async (
    credentials: LoginUserProps
  ): Promise<string | undefined> => {
    const user = await API.post('login/', credentials)
      .then((res) => res.data)
      .catch((_) => toast.error('ops... something went wrong, try again later'))

    return user
  }

  const updateUser = async (
    updatedUser: UpdateUserProps,
    id: string,
    token: string
  ): Promise<UpdateUserAxiosError | undefined> => {
    setIsLoadingUpdate(true)
    const res = await API.patch(`users/${id}/`, updatedUser, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((_) => toast.success('Changes saved!'))
      .catch((err) => err.response.data)
      .finally(() => setIsLoadingUpdate(false))

    return res
  }

  const getUser = async (id: string, token: string) => {
    setIsLoading(true)
    await API.get(`users/${id}`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => setUserData(res.data))
      .catch((_) => toast.error('ops... something went wrong, try again later'))
      .finally(() => setIsLoading(false))
  }

  return (
    <UserContext.Provider
      value={{
        registerUser,
        loginUser,
        isLoading,
        updateUser,
        getUser,
        userData,
        isLoadingUpdate,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
