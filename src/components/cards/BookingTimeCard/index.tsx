import { Divider, Typography } from '@mui/material'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import dayjs from 'dayjs'
import { useSchedule } from 'providers/schedule'
import { Stack } from '@mui/system'
import { sxDivider } from './styles'
dayjs.extend(advancedFormat)

const BookingTimeCard = () => {
  const { selectedHour, selectedDate } = useSchedule()
  const dateString = dayjs(selectedDate).format('MMMM Do, YYYY')
  const timeString = dayjs(selectedHour?.toString(), 'HH').format('h:mm a')

  return (
    <>
      <Stack
        direction='row'
        spacing={1}
        justifyContent='center'
        alignItems='center'
      >
        <Typography variant='body1'>{dateString}</Typography>
        {selectedHour! > 0 && (
          <>
            <TrendingFlatIcon color='primary' fontSize='medium' />
            <Typography variant='body1'>{timeString}</Typography>
            <EventAvailableIcon color='success' />
          </>
        )}
      </Stack>
      <Divider sx={sxDivider} />
    </>
  )
}

export default BookingTimeCard
