import { Paper, Typography } from '@mui/material'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useCourt } from 'providers/courts'
import { useSchedule } from 'providers/schedule'
import { sxPaper, sxTypography } from './styles'

const CalendarCard = () => {
  const { selectTimeSlot, selectDate, selectedDate } = useSchedule()
  const { court } = useCourt()
  const today = dayjs(new Date())

  const handleDate = (dateObj: dayjs.Dayjs) => {
    const datePick = dateObj.toDate()
    //Remove selection when switching days
    selectTimeSlot(0)
    selectDate(datePick)
  }

  return (
    <Paper sx={sxPaper} elevation={2}>
      <Typography variant='h5' sx={sxTypography}>
        Select a Date & Starting Time
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={dayjs(selectedDate)}
          onChange={(newValue) => handleDate(newValue!)}
          minDate={today}
          maxDate={today.add(court?.max_schedule_range_in_days || 60, 'day')}
        />
      </LocalizationProvider>
    </Paper>
  )
}

export default CalendarCard
