import { DeleteOutline } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import {
  CancelHolidayCardProps,
} from 'interfaces/componentsInterface'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { LoadingButton } from '@mui/lab'
import { useSession } from 'next-auth/react'
import { useSchedule } from 'providers/schedule'
import { useFacility } from 'providers/FacilityProvider'
dayjs.extend(advancedFormat)
dayjs.extend(utc)

const CancelHolidayCard = ({
  isOpen,
  handleClose,
  eventData,
  courtId,
}: CancelHolidayCardProps) => {
  const { isLoading, deleteHoliday } = useSchedule()
  const { getFacilitiesByOwner } = useFacility()
  const { data: session } = useSession()
  const formattedDate = dayjs(eventData.event.start).format('MMMM Do, YYYY')
  const eventDate = dayjs
    .utc(eventData.event.start)
    .format('YYYY-MM-DD')
    .toString()

  const handleClick = async () => {
    const token = session!.user.accessToken
    await deleteHoliday(token, courtId, eventDate)
    await getFacilitiesByOwner(token)
    handleClose()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Remove Holiday</DialogTitle>
      <DialogContent>
        Would you like to remove <strong>{formattedDate}</strong> holiday?
      </DialogContent>

      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>
          Go back
        </Button>
        <LoadingButton
          loading={isLoading}
          loadingPosition='start'
          variant='contained'
          color='error'
          onClick={handleClick}
          startIcon={<DeleteOutline />}
        >
          Remove
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default CancelHolidayCard
