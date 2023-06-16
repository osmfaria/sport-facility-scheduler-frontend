import { capitalize } from '@/utils/functions'
import { FacilityRegisterProp } from 'interfaces/facilityInterface'
import { Court } from 'interfaces/providerInterface'
import {
  Address,
  Facility,
  FacilityProviderContext,
} from 'interfaces/providerInterface'
import { childrenProp } from 'interfaces/utilityInterface'
import { useRouter } from 'next/router'
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
  const [facilitiesByOwner, setIsFacilitiesByOwner] = useState<Facility[]>()
  const [isLoadingFacilityByOwner, setIsLoadingFacilityByOwner] =
    useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

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

  const getFacilitiesByOwner = async (token: string): Promise<void> => {
    setIsLoadingFacilityByOwner(true)
    API.get('sport_facilities/filter/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        setIsFacilitiesByOwner(res.data)
        setIsLoadingFacilityByOwner(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoadingFacilityByOwner(false)
      })
  }

  const createFacility = async (token: string, data: FacilityRegisterProp) => {
    setIsLoading(true)
    const res = await API.post('sport_facilities/', data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((_) => router.push('/dashboard'))
      .catch((err) => console.log(err))
      .catch((err) => err.response.data)
      .finally(() => setIsLoading(false))

    return res
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
        getFacilitiesByOwner,
        facilitiesByOwner,
        isLoadingFacilityByOwner,
        createFacility,
        isLoading
      }}
    >
      {children}
    </FacilityContext.Provider>
  )
}

export const useFacility = () => useContext(FacilityContext)
