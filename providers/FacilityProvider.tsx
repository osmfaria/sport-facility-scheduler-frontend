import { capitalize } from '@/utils/functions'
import { Court } from 'interfaces/providerInterface'
import {
  Address,
  Facility,
  FacilityProviderContext,
} from 'interfaces/providerInterface'
import { childrenProp } from 'interfaces/utilityInterface'
import { createContext, useContext, useState } from 'react'
import API from 'services/api'

const FacilityContext = createContext<FacilityProviderContext>(
  {} as FacilityProviderContext
)

export const FacilityProvider = ({ children }: childrenProp) => {
  const [address, setAddress] = useState<Address>()
  const [isLoadingAddress, setIsLoadingAddress] = useState<boolean>(false)
  const [isLoadingFacility, setIsLoadingFacility] = useState<boolean>(true)
  const [isLoadingCourtsByFacility, setIsLoadingCourtsByFacility] =
    useState<boolean>(true)
  const [facility, setFacility] = useState<Facility>()
  const [courtsByFacility, setCourtsByFacility] = useState<Court[]>([])
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

  const getFacility = async (
    facilityId: string,
    token: string
  ): Promise<void> => {
    console.log('token: ', token)
    API.get(`sport_facilities/${facilityId}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        setFacility(res.data)
        const { number, street, city, state } = res.data.address
        setAddressString(
          `${number} ${capitalize(street)}, ${capitalize(city)}, ${state}`
        )
        setIsLoadingFacility(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoadingFacility(false)
      })
  }

  const getFacilityCourts = async (
    facilityId: string,
    token: string
  ): Promise<void> => {
    API.get(`sport_facilities/${facilityId}/courts/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        setCourtsByFacility(res.data)
        setIsLoadingCourtsByFacility(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoadingCourtsByFacility(false)
      })
  }

  return (
    <FacilityContext.Provider
      value={{
        getAddress,
        getFacilityCourts,
        courtsByFacility,
        address,
        isLoadingAddress,
        isLoadingFacility,
        addressString,
        facility,
        getFacility,
        isLoadingCourtsByFacility,
      }}
    >
      {children}
    </FacilityContext.Provider>
  )
}

export const useFacility = () => useContext(FacilityContext)
