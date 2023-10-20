import {
  AccountCircle,
  DateRange,
  DeleteOutline,
  Email,
} from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { capitalize } from '@/utils/functions'
import { sxList } from './styles'
import { CancelEventCardProps } from 'interfaces/componentsInterface'
import { useSchedule } from 'providers/schedule'
import { useSession } from 'next-auth/react'
import { LoadingButton } from '@mui/lab'

const CancelEventCard = ({
  isOpen,
  handleClose,
  eventData,
}: CancelEventCardProps) => {
  dayjs.extend(utc)
  const { cancelBooking, isLoading, selectEvents, courtEvents } = useSchedule()
  const { data: session } = useSession()

  const eventDate = dayjs
    .utc(eventData.event.start)
    .format('YYYY/MM/DD')
    .toString()
  const start = dayjs.utc(eventData.event.start).format('h A')
  const end = dayjs.utc(eventData.event.end).format('h A')
  const clientName = capitalize(eventData.event.title)
  const clientEmail = eventData.event.extendedProps.email
  const eventId = eventData.event.id

  const handleCancelation = async () => {
    const token = session!.user.accessToken
    await cancelBooking(token, eventId)

    const updatedEvents = courtEvents.filter((event) => event.id !== eventId)
    selectEvents(updatedEvents)
    handleClose()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Reservation</DialogTitle>
      <Divider />
      <DialogContent>
        <List sx={sxList}>
          <ListItem>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary={clientName} />
          </ListItem>
          <Divider variant='inset' />

          <ListItem>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText primary={clientEmail} />
          </ListItem>
          <Divider variant='inset' />

          <ListItem>
            <ListItemIcon>
              <DateRange />
            </ListItemIcon>
            <ListItemText primary={`${eventDate} from ${start} to ${end}`} />
          </ListItem>
        </List>
        <DialogContentText mt={2}>
          <Typography variant='caption'>
            *An email will be sent to the client in the event of cancellation.
          </Typography>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>
          Go back
        </Button>
        <LoadingButton
          loading={isLoading}
          loadingPosition='start'
          onClick={handleCancelation}
          variant='contained'
          color='error'
          startIcon={<DeleteOutline />}
        >
          Cancel Reservation
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default CancelEventCard
