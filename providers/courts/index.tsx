import { createContext, useContext, useState } from 'react'
import { childrenProp } from 'interfaces/utilityInterface'
import dayjs from 'dayjs'
import API from 'services/api'
import { Court, CourtProviderContext } from 'interfaces/providerInterface'

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
      .catch((err) => console.log(err))
  }

  const getCourt = async (id: string): Promise<void> => {
    setIsLoadingCourt(true)
    await API.get(`sport_facilities/courts/${id}/`)
      .then((res) => {
        setCourt(res.data)
        setIsLoadingCourt(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoadingCourt(false)
      })
  }

  const selectCourtId = (id: string): void => {
    setCourtId(id)
  }

  const selectCity = (name: string): void => {
    setCity(name)
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
      }}
    >
      {children}
    </CourtContext.Provider>
  )
}

export const useCourt = () => useContext(CourtContext)
