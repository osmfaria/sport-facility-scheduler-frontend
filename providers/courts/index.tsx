import { createContext, useContext, useState } from 'react'
import { childrenProp } from 'interfaces/utilityInterface'
import dayjs from 'dayjs'
import API from 'services/api'
import {
  Court,
  CourtProviderContext,
  HolidayProp,
} from 'interfaces/providerInterface'
import { CreateCourtProp, UpdateCourtProp } from 'interfaces/courtInterface'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const CourtContext = createContext<CourtProviderContext>(
  {} as CourtProviderContext
)

export const CourtProvider = ({ children }: childrenProp) => {
  const [isLoadingCourts, setIsLoadingCourts] = useState<boolean>(false)
  const [isLoadingCourt, setIsLoadingCourt] = useState<boolean>(false)
  const [courts, setCourts] = useState<Court[]>([])
  const [city, setCity] = useState<string>('')
  const [court, setCourt] = useState<Court | undefined>()
  const [courtId, setCourtId] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const getCourtsByLocationAndTime = async (
    date: Date,
    sport: string | undefined
  ) => {
    setIsLoadingCourts(true)
    const formattedDate = dayjs(date).format('YYYY-MM-DD')
    const formattedSport = sport ? '?sport=' + sport.trim().toLowerCase() : ''

    await API.get(
      `sport_facilities/courts/filter/${
        city || 'vancouver'
      }/${formattedDate}/${formattedSport}`
    )
      .then((res) => {
        setIsLoadingCourts(false)
        setCourts(res.data)
      })
      .catch((_) => toast.error('ops... something went wrong, try again later'))
  }

  const getCourt = async (id: string): Promise<void> => {
    setIsLoadingCourt(true)
    await API.get(`sport_facilities/courts/${id}/`)
      .then((res) => {
        setCourt(res.data)
      })
      .catch((_) => {
        toast.error('ops... something went wrong, try again later')
      })
      .finally(() => setIsLoadingCourt(false))
  }

  const selectCourtId = (id: string): void => {
    setCourtId(id)
  }

  const selectCity = (name: string): void => {
    setCity(name)
  }

  const createCourt = async (token: string, data: CreateCourtProp) => {
    const { facilityId, ...requestData } = data
    API.post(`/sport_facilities/${facilityId}/courts/`, requestData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((_) => {
        router.push('/dashboard')
        toast.success('Sport venue created!')
      })
      .catch((_) => toast.error('ops... something went wrong, try again later'))
      .finally(() => setIsLoading(false))
  }

  const updateCourt = async (
    token: string,
    data: UpdateCourtProp,
    id: string
  ) => {
    setIsLoading(true)
    await API.patch(`/sport_facilities/courts/${id}/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((_) => {
        toast.success('Changes saved!')
      })
      .catch((_) => toast.error('ops... something went wrong, try again later'))
      .finally(() => setIsLoading(false))

    return
  }

  const createCourtDaysOff = async (
    token: string,
    data: string[],
    id: string
  ): Promise<void> => {
    setIsLoading(true)
    await API.post(`/sport_facilities/courts/${id}/non_operating_day/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((_) => toast.success('Changes saved!'))
      .catch((_) => toast.error('ops... something went wrong, try again later'))
      .finally(() => setIsLoading(false))

    return
  }

  return (
    <CourtContext.Provider
      value={{
        getCourtsByLocationAndTime,
        courts,
        isLoadingCourts,
        city,
        getCourt,
        court,
        isLoadingCourt,
        selectCourtId,
        courtId,
        selectCity,
        createCourt,
        isLoading,
        updateCourt,
        createCourtDaysOff,
      }}
    >
      {children}
    </CourtContext.Provider>
  )
}

export const useCourt = () => useContext(CourtContext)
