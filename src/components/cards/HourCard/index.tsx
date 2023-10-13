import { Avatar, Chip, Skeleton, Zoom } from '@mui/material'
import { HourCardProp } from 'interfaces/componentsInterface'
import { useSchedule } from 'providers/schedule'
import { CheckCircle } from '@mui/icons-material'
import dayjs from 'dayjs'
import { sxChip, sxSkeleton } from './styles'

const HourCard = ({ hour }: HourCardProp) => {
  const { selectedHour, selectTimeSlot } = useSchedule()
  const timeSlot = dayjs().set('hour', hour).set('minute', 0).format('h:mm a')
  const isSelected = selectedHour === hour

  return (
    <>
      {isSelected ? (
        <Chip
          avatar={
            <Zoom in={isSelected}>
              <Avatar>
                <CheckCircle color='success' fontSize='small' />
              </Avatar>
            </Zoom>
          }
          onClick={() => selectTimeSlot(hour)}
          sx={sxChip}
          variant='filled'
          label={timeSlot}
          color='success'
        />
      ) : (
        <Chip
          sx={sxChip}
          label={timeSlot}
          variant='outlined'
          onClick={() => selectTimeSlot(hour)}
          color='primary'
        />
      )}
    </>
  )
}

const HourCardSkeleton = () => (
  <Skeleton variant='rectangular' height={32} width={130} sx={sxSkeleton} />
)

export { HourCard, HourCardSkeleton }
