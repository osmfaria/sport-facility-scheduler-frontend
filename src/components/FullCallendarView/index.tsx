import FullCalendar from '@fullcalendar/react'
import { EventClickArg } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { Box } from '@mui/material'
import { useSchedule } from 'providers/schedule'
import { useState } from 'react'
import CancelEventCard from '../cards/CancelEventCard'
import { FullcalendarProps } from 'interfaces/componentsInterface'
import { courtOperatingDays } from '@/utils/functions'
import HolidayCard from '../cards/HolidayCard'
import CancelHolidayCard from '../cards/CancelHolidayCard'
import { sxCalendarWrap } from './styles'

const FullCalendarView = ({ chosenCourt }: FullcalendarProps) => {
  const { courtEvents } = useSchedule()
  const [isOpenEvent, setIsOpenEvent] = useState<boolean>(false)
  const [isOpenDate, setIsOpenDate] = useState<boolean>(false)
  const [isOpenCancelDate, setIsOpenCancelDate] = useState<boolean>(false)
  const [eventData, setEventData] = useState<EventClickArg>()
  const [dateData, setDateData] = useState<DateClickArg>()
  const startTime = chosenCourt.opening_hour
  const endTime = chosenCourt.closing_hour
  const daysOfWeek = courtOperatingDays(chosenCourt)

  const handleCloseEvent = () => {
    setIsOpenEvent(false)
  }

  const handleCloseDate = () => {
    setIsOpenDate(false)
  }

  const handleCloseCancelDate = () => {
    setIsOpenCancelDate(false)
  }

  const handleEvent = (e: EventClickArg) => {
    const title = e.event._def.title
    setEventData(e)
    if (title === 'Holiday') {
      setIsOpenCancelDate(true)
    } else {
      setIsOpenEvent(true)
    }
  }

  const handleDate = (e: DateClickArg) => {
    setDateData(e)
    setIsOpenDate(true)
  }

  return (
    <Box>
      {eventData && (
        <CancelEventCard
          isOpen={isOpenEvent}
          handleClose={handleCloseEvent}
          eventData={eventData!}
        />
      )}
      {dateData && (
        <HolidayCard
          isOpen={isOpenDate}
          handleClose={handleCloseDate}
          dateData={dateData}
          courtId={chosenCourt.id}
        />
      )}
      {eventData && (
        <CancelHolidayCard
          isOpen={isOpenCancelDate}
          handleClose={handleCloseCancelDate}
          eventData={eventData!}
          courtId={chosenCourt.id}
        />
      )}

      <Box sx={sxCalendarWrap}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          timeZone={'UTC'}
          initialView='dayGridMonth'
          headerToolbar={{
            start: 'title',
            center: 'dayGridMonth,timeGridWeek,timeGridDay',
            end: 'prev,next',
          }}
          events={courtEvents}
          businessHours={{
            daysOfWeek,
            startTime,
            endTime,
          }}
          rerenderDelay={100}
          allDaySlot={false}
          eventClick={handleEvent}
          dateClick={handleDate}
          editable
          dragScroll={false}
        />
      </Box>
    </Box>
  )
}

export default FullCalendarView
