import FullCalendar from '@fullcalendar/react'
import { EventClickArg } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Box } from '@mui/material'
import { useSchedule } from 'providers/schedule'
import { useState } from 'react'
import CancelEventCard from '../cards/CancelEventCard'
import { FullcalendarProps } from 'interfaces/componentsInterface'

const FullCalendarView = ({
  startTime,
  endTime,
  daysOfWeek,
}: FullcalendarProps) => {
  const { courtEvents } = useSchedule()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [eventData, setEventData] = useState<EventClickArg>()

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleEvent = (e: EventClickArg) => {
    setEventData(e)
    setIsOpen(true)
  }

  console.log(courtEvents)

  return (
    <Box>
      {eventData && (
        <CancelEventCard
          isOpen={isOpen}
          handleClose={handleClose}
          eventData={eventData!}
        />
      )}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        timeZone={'UTC'}
        initialView='dayGridMonth'
        headerToolbar={{
          start: 'title',
          center: 'dayGridMonth,timeGridWeek,timeGridDay',
          end: 'today prev,next',
        }}
        events={courtEvents}
        businessHours={{
          daysOfWeek,
          startTime,
          endTime,
        }}
        allDaySlot={false}
        eventClick={handleEvent}
        editable
      />
    </Box>
  )
}

export default FullCalendarView
