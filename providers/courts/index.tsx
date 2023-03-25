import { createContext, useContext, useState } from 'react'
import { childrenProp } from 'interfaces/utilityInterface'
import dayjs from 'dayjs'
import API from 'services/api'
import { Court, CourtProviderContext } from 'interfaces/providerInterface'

const CourtContext = createContext<CourtProviderContext>(
  {} as CourtProviderContext
)

export const CourtProvider = ({ children }: childrenProp) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [courts, setCourts] = useState<Court[]>([])

  const getCourtsByLocationAndTime = async (city: string, date: Date) => {
    setIsLoading(true)
    const formattedDate = dayjs(date).format('YYYY-MM-DD')
    await API.get(
      `sport_facilities/courts/filter/${city || 'vancouver'}/${formattedDate}/`
    )
      .then((res) => {
        setIsLoading(false)
        setCourts(res.data)
      })
      .catch((err) => console.log(err))
  }

  return (
    <CourtContext.Provider value={{ getCourtsByLocationAndTime, courts, isLoading }}>
      {children}
    </CourtContext.Provider>
  )
}

export const useCourt = () => useContext(CourtContext)
