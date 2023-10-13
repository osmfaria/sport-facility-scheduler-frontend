import { Save } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { HolidayCardProps } from 'interfaces/componentsInterface'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { LoadingButton } from '@mui/lab'
import { useSession } from 'next-auth/react'
import { useSchedule } from 'providers/schedule'
import { useFacility } from 'providers/FacilityProvider'
dayjs.extend(advancedFormat)
dayjs.extend(utc)

const HolidayCard = ({
  isOpen,
  handleClose,
  dateData,
  courtId,
}: HolidayCardProps) => {
  const { isLoading, createHoliday } = useSchedule()
  const { getFacilitiesByOwner } = useFacility()
  const { data: session } = useSession()
  const dateStr = dateData.dateStr
  const formattedDate = dayjs(dateStr, 'YYYY-MM-DD').format('MMMM Do, YYYY')

  const handleClick = async () => {
    const token = session!.user.accessToken
    const data = { holiday: dateStr }
    await createHoliday(token, courtId, data)
    await getFacilitiesByOwner(token)
    handleClose()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Add Holiday</DialogTitle>
      <DialogContent>
        Would you like to make <strong>{formattedDate}</strong> as a holiday?
      </DialogContent>

      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>
          Go back
        </Button>
        <LoadingButton
          loading={isLoading}
          loadingPosition='start'
          variant='contained'
          color='success'
          onClick={handleClick}
          startIcon={<Save />}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default HolidayCard
