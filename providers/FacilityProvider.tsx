import { capitalize } from '@/utils/functions'
import { Address, FacilityProviderContext } from 'interfaces/providerInterface'
import { childrenProp } from 'interfaces/utilityInterface'
import { createContext, useContext, useState } from 'react'
import API from 'services/api'

const FacilityContext = createContext<FacilityProviderContext>(
  {} as FacilityProviderContext
)

export const FacilityProvider = ({ children }: childrenProp) => {
  const [address, setAddress] = useState<Address | undefined>()
  const [isLoadingAddress, setIsLoadingAddress] = useState<boolean>(false)
  const [addressString, setAddressString] = useState<string>('')

  const getAddress = async (facilityId: string): Promise<void> => {
    setIsLoadingAddress(true)
    API.get(`sport_facilities/${facilityId}/address/`)
      .then((res) => {
        setAddress(res.data)
        const { number, street, city, state } = res.data
        setAddressString(
          `${number} ${capitalize(street)}, ${capitalize(city)}, ${state}`
        )
        setIsLoadingAddress(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoadingAddress(false)
      })
  }

  return (
    <FacilityContext.Provider
      value={{ getAddress, address, isLoadingAddress, addressString }}
    >
      {children}
    </FacilityContext.Provider>
  )
}

export const useFacility = () => useContext(FacilityContext)
