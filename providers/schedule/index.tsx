import { capitalize } from '@/utils/functions'
import dayjs from 'dayjs'
import {
  BookingResponse,
  CourtEvent,
  HolidayProp,
  RawCourtEvent,
  RawHoliday,
  ScheduleProviderContext,
} from 'interfaces/providerInterface'
import { childrenProp } from 'interfaces/utilityInterface'
import { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import API from 'services/api'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

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
      })
      .catch((_) => {
        toast.error('ops... something went wrong, try again later')
      })
      .finally(() => setIsLoading(false))
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
    await API.get(
      `sport_facilities/courts/${courtId}/management/${initialDate}/${finalDate}/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
      .then((res) => {
        const events = formatEvents(res.data)
        setCourtEvents(events)
      })
      .catch((err) => {
        toast.error('ops... something went wrong, try again later')
      })

    return
  }

  const formatEvents = (events: RawCourtEvent[]): CourtEvent[] => {
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
          overlap: false,
        }
        acc.push(event)
        durationTrack = cur.number_of_hours - 1
      } else {
        durationTrack--
      }
      return acc
    }, [])

    return eventList
  }

  const resetCourtEvents = () => {
    setCourtEvents([])
  }

  const selectEvents = (events: CourtEvent[]) => {
    setCourtEvents(events)
  }

  const cancelBooking = async (token: string, id: string) => {
    setIsLoading(true)

    await API.delete(`/sport_facilities/courts/schedules/${id}`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.data)
      .catch((_) => toast.error('ops... something went wrong, try again later'))
      .finally(() => setIsLoading(false))
  }

  const createHoliday = async (
    token: string,
    id: string,
    data: HolidayProp
  ): Promise<void> => {
    setIsLoading(true)
    await API.post(`/sport_facilities/courts/${id}/holidays/`, data, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((_) => toast.success('Holiday added'))
      .catch((_) => toast.error('ops... something went wrong, try again later'))
      .finally(() => setIsLoading(false))
  }

  const deleteHoliday = async (
    token: string,
    id: string,
    date: string
  ): Promise<void> => {
    setIsLoading(true)
    await API.delete(`sport_facilities/courts/${id}/holidays/${date}/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((_) => toast.success('Changes saved!'))
      .catch((_) => toast.error('ops... something went wrong, try again later'))
      .finally(() => setIsLoading(false))
  }

  const getHoliday = async (token: string, id: string): Promise<void> => {
    setIsLoading(true)
    await API.get(`/sport_facilities/courts/${id}/holidays/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        const holidays = formatHoliday(res.data)
        setCourtEvents((prev) => [...prev, ...holidays])
      })
      .catch((err) => {
        toast.error('ops... something went wrong, try again later')
      })
      .finally(() => setIsLoading(false))
  }

  const formatHoliday = (holidays: RawHoliday[]): CourtEvent[] => {
    const holidayList = holidays.reduce<CourtEvent[]>((acc, cur) => {
      const start = dayjs(cur.holiday, 'YYYY-MM-DD').toISOString()
      const event = {
        id: cur.id,
        title: 'Holiday',
        start,
        textColor: 'black',
        backgroundColor: 'yellow',
        allDay: true,
      }
      acc.push(event)
      return acc
    }, [])

    return holidayList
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
        cancelBooking,
        createHoliday,
        deleteHoliday,
        getHoliday,
        selectEvents,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  )
}

export const useSchedule = () => useContext(ScheduleContext)
