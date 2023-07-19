import { capitalize } from '@/utils/functions'
import {
  AddressAxiosError,
  AddressProp,
  FacilityPatchProp,
  FacilityRegisterProp,
  RegisterFacilityAxiosError,
} from 'interfaces/facilityInterface'
import { Court } from 'interfaces/providerInterface'
import {
  Address,
  Facility,
  FacilityProviderContext,
} from 'interfaces/providerInterface'
import { childrenProp } from 'interfaces/utilityInterface'
import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import API from 'services/api'

const FacilityContext = createContext<FacilityProviderContext>(
  {} as FacilityProviderContext
)

export const FacilityProvider = ({ children }: childrenProp) => {
  const [address, setAddress] = useState<Address>()
  const [isLoadingAddress, setIsLoadingAddress] = useState<boolean>(false)
  const [isLoadingFacility, setIsLoadingFacility] = useState<boolean>(false)
  const [isLoadingCourtsByFacility, setIsLoadingCourtsByFacility] =
    useState<boolean>(true)
  const [facility, setFacility] = useState<Facility>()
  const [courtsByFacility, setCourtsByFacility] = useState<Court[]>()
  const [addressString, setAddressString] = useState<string>('')
  const [facilitiesByOwner, setFacilitiesByOwner] = useState<Facility[]>()
  const [isLoadingFacilityByOwner, setIsLoadingFacilityByOwner] =
    useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [chosenCourt, setChosenCourt] = useState<Court>()
  const [chosenFacility, setChosenFacility] = useState<Facility>()
  const router = useRouter()

  const getAddress = async (facilityId: string): Promise<void> => {
    setIsLoadingAddress(true)
    API.get(`sport_facilities/${facilityId}/address/`)
      .then((res) => {
        setAddress(res.data)
        const { address1, address2, city, state, country } = res.data
        setAddressString(
          `${capitalize(address1)}, ${address2 && address2 + ','} ${capitalize(
            city
          )}, ${state}, ${country}`
        )
      })
      .catch((_) => {
        toast.error('ops... something went wrong, try again later')
      })
      .finally(() => setIsLoadingAddress(false))
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
      })
      .catch((err) => {
        toast.error('ops... something went wrong, try again later')
      })
      .finally(() => setIsLoadingFacility(false))
  }

  const getFacilityCourts = async (
    facilityId: string,
    token: string
  ): Promise<void> => {
    if (!isLoadingCourtsByFacility) setIsLoadingCourtsByFacility(true)
    API.get(`sport_facilities/${facilityId}/courts/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        setCourtsByFacility(res.data)
      })
      .catch((err) => {
        toast.error('ops... something went wrong, try again later')
      })
      .finally(() => setIsLoadingCourtsByFacility(false))
  }

  const getFacilitiesByOwner = async (token: string): Promise<void> => {
    setIsLoadingFacilityByOwner(true)
    await API.get('sport_facilities/filter/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        setFacilitiesByOwner(res.data)
      })
      .catch((err) => {
        toast.error('ops... something went wrong, try again later')
        console.log(err)
      })
      .finally(() => setIsLoadingFacilityByOwner(false))
  }

  const createFacility = async (token: string, data: FacilityRegisterProp) => {
    setIsLoading(true)
    const res = await API.post('sport_facilities/', data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((_) => {
        router.push('/dashboard')
        toast.success('Facility created!')
      })
      .catch((err) => err.response.data)
      .finally(() => setIsLoading(false))

    return res
  }

  const updateFacilityArray = (facilityId: string) => {
    const updatedFacilityArray = facilitiesByOwner!.filter(
      (elem) => elem.id !== facilityId
    )
    setFacilitiesByOwner(updatedFacilityArray)
  }

  const updateCourtArray = (courtId: string) => {
    const updatedCourtArray = courtsByFacility!.filter(
      (elem) => elem.id !== courtId
    )
    setCourtsByFacility(updatedCourtArray)
  }

  const removeFacility = async (token: string, facilityId: string) => {
    setIsLoading(true)
    await API.delete(`sport_facilities/${facilityId}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((_) => {
        updateFacilityArray(facilityId)
        toast.success('Facility removed!')
      })
      .catch((_) => toast.error('ops... something went wrong, try again later'))
      .finally(() => setIsLoading(false))
  }

  const removeCourt = async (token: string, courtId: string) => {
    setIsLoading(true)
    await API.delete(`sport_facilities/courts/${courtId}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((_) => {
        updateCourtArray(courtId)
        toast.success('Sport venue removed!')
      })
      .catch((_) => toast.error('ops... something went wrong, try again later'))
      .finally(() => setIsLoading(false))
  }

  const updateFacility = async (
    token: string,
    facilityId: string,
    data: FacilityPatchProp
  ): Promise<Omit<RegisterFacilityAxiosError, 'address'>> => {
    setIsLoading(true)
    const res = await API.patch(`sport_facilities/${facilityId}/`, data, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((_) => null)
      .catch((err) => err.response.data)
      .finally(() => setIsLoading(false))

    return res
  }

  const updateAddress = async (
    token: string,
    facilityId: string,
    data: AddressProp
  ): Promise<AddressAxiosError> => {
    setIsLoading(true)
    const res = await API.patch(
      `sport_facilities/${facilityId}/address/`,
      data,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
      .then((_) => null)
      .catch((err) => err.response.data)
      .finally(() => setIsLoading(false))

    return res
  }

  const selectCourt = (court: Court | undefined) => {
    setChosenCourt(court)
    if (court) {
      localStorage.setItem(
        'initial-court-courtscheduler',
        JSON.stringify(court.id)
      )
    }
  }

  const selectFacility = (facility: Facility) => {
    setChosenFacility(facility)
    if (facility) {
      localStorage.setItem(
        'initial-facility-courtscheduler',
        JSON.stringify(facility.id)
      )
    }
  }

  const selectInitialData = () => {
    const storedFacilityString = localStorage.getItem(
      'initial-facility-courtscheduler'
    )
    const storedCourtString = localStorage.getItem(
      'initial-court-courtscheduler'
    )

    const storedFacilityId: string | null = storedFacilityString
      ? JSON.parse(storedFacilityString)
      : null
    const storedCourtId: string | null = storedCourtString
      ? JSON.parse(storedCourtString)
      : null

    if (storedFacilityId) {
      // Check if the last facility selected still exists in the last fetch made
      const lastFacilitySelected = facilitiesByOwner!.filter(
        (elem) => elem.id === storedFacilityId
      )

      if (lastFacilitySelected?.length > 0) {
        selectFacility(lastFacilitySelected[0])

        if (storedCourtId) {
          // Check if the last court selected still exists in the last fetch made
          const lastCourtSelected = lastFacilitySelected[0].courts.filter(
            (elem) => elem.id === storedCourtId
          )

          if (lastCourtSelected.length > 0) {
            selectCourt(lastCourtSelected[0])
          }
        } else {
          selectCourt(lastFacilitySelected[0].courts[0])
        }
      }
    } else {
      selectFacility(facilitiesByOwner![0])
      selectCourt(facilitiesByOwner![0].courts[0])
    }
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
        chosenFacility,
        chosenCourt,
        facilitiesByOwner,
        isLoadingFacilityByOwner,
        createFacility,
        isLoading,
        removeFacility,
        removeCourt,
        updateFacility,
        updateAddress,
        selectCourt,
        selectFacility,
        selectInitialData,
      }}
    >
      {children}
    </FacilityContext.Provider>
  )
}

export const useFacility = () => useContext(FacilityContext)
