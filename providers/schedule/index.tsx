import { capitalize } from '@/utils/functions'
import dayjs from 'dayjs'
import {
  BookingResponse,
  CourtEvent,
  RawCourtEvent,
  ScheduleProviderContext,
} from 'interfaces/providerInterface'
import { childrenProp } from 'interfaces/utilityInterface'
import { createContext, useContext, useState } from 'react'
import API from 'services/api'

const ScheduleContext = createContext<ScheduleProviderContext>(
  {} as ScheduleProviderContext
)

export const ScheduleProvider = ({ children }: childrenProp) => {
  const [courtSchedule, setCourtSchedule] = useState<number[]>([])
  const [selectedHour, SetSelectedHour] = useState<number | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingBooking, setIsLoadingBooking] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [timeSlotRange, setTimeSlotRange] = useState<number>(1)
  const [bookingConfirmation, setBookingConfirmation] = useState<
    BookingResponse | undefined
  >()
  const [courtEvents, setCourtEvents] = useState<CourtEvent[]>([])

  const selectTimeSlot = (newSelectedHour: number): void => {
    // Make sure only one hour can be selected at time
    if (newSelectedHour === selectedHour) {
      SetSelectedHour(undefined)
    } else {
      SetSelectedHour(newSelectedHour)
      setTimeSlotRange(getTimeSlotRange(newSelectedHour))
    }
  }

  const getTimeSlotRange = (hour: number): number => {
    let startingHour = hour
    let count = 1
    for (let i = 1; i < courtSchedule.length; i++) {
      if (courtSchedule[i] === startingHour + 1) {
        count++
        startingHour++
      }
      if (courtSchedule[i] > startingHour + 1 || count > 2) break
    }

    return count
  }

  const selectDate = (date: Date): void => {
    setSelectedDate(date)
  }

  const getAvailableHours = async (
    courtId: string | string[] | undefined,
    token: string
  ): Promise<void> => {
    const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD')

    setIsLoading(true)
    await API.get(
      `sport_facilities/courts/${courtId}/schedules/${formattedDate}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        const availableHours = res.data.available_hours
        if (Array.isArray(availableHours)) {
          setCourtSchedule(availableHours)
        } else {
          setCourtSchedule([])
        }
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err)
      })
  }

  const bookCourt = async (
    courtId: string,
    numberOfHours: number,
    token: string
  ): Promise<number> => {
    setIsLoadingBooking(true)

    const dateString = dayjs(selectedDate)
      .set('hour', selectedHour as number)
      .set('minute', 0)
      .format('YYYY-MM-DD HH:mm')

    const data = {
      datetime: dateString,
      number_of_hours: numberOfHours,
    }

    const response = await API.post(
      `sport_facilities/courts/${courtId}/schedules/`,
      data,
      {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        setIsLoadingBooking(false)
        setBookingConfirmation(res.data)
        return res.status
      })
      .catch((err) => {
        setIsLoadingBooking(false)
        return err.status
      })

    return response
  }

  const getCourtEvents = async (
    token: string,
    courtId: string,
    initialDate: string,
    finalDate: string
  ) => {
    API.get(
      `sport_facilities/courts/${courtId}/management/${initialDate}/${finalDate}/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
      .then((res) => formatEvents(res.data))
      .catch((err) => console.log(err))
  }

  const formatEvents = (events: RawCourtEvent[]) => {
    let durationTrack = 0
    const eventList = events.reduce<CourtEvent[]>((acc, cur) => {
      if (durationTrack === 0) {
        const event = {
          id: cur.id,
          title: capitalize(cur.user.username),
          start: cur.datetime,
          end: dayjs(cur.datetime)
            .add(cur.number_of_hours, 'hour')
            .toISOString(),
          extendedProps: {
            email: cur.user.email,
          },
        }
        acc.push(event)
        durationTrack = cur.number_of_hours - 1
      } else {
        durationTrack--
      }
      return acc
    }, [])

    setCourtEvents(eventList)
  }

  const resetCourtEvents = () => {
    setCourtEvents([])
  }

  return (
    <ScheduleContext.Provider
      value={{
        getAvailableHours,
        courtSchedule,
        selectedHour,
        selectTimeSlot,
        isLoading,
        selectedDate,
        selectDate,
        timeSlotRange,
        bookCourt,
        bookingConfirmation,
        isLoadingBooking,
        getCourtEvents,
        courtEvents,
        resetCourtEvents,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  )
}

export const useSchedule = () => useContext(ScheduleContext)
