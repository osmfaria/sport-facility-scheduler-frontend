import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from '@mui/material'
import { useCourt } from 'providers/courts'
import { sxAvatar, sxCard } from './styles'
import {
  Event,
  AccessTime,
  Timelapse,
  Place,
  OpenInNew,
} from '@mui/icons-material'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import utc from 'dayjs/plugin/utc'
import { useFacility } from 'providers/FacilityProvider'
import { useSchedule } from 'providers/schedule'
import Link from 'next/link'
dayjs.extend(advancedFormat)
dayjs.extend(utc)

const ConfirmationCard = () => {
  const { court } = useCourt()
  const { addressString } = useFacility()
  const { bookingConfirmation } = useSchedule()

  const datetimeDayjs = dayjs(bookingConfirmation!.datetime)
  const date = datetimeDayjs.format('MMMM Do, YYYY')
  const time = datetimeDayjs.utc().format('h:mm a')
  const duration =
    bookingConfirmation!! &&
    `${bookingConfirmation!.number_of_hours} ${
      bookingConfirmation!.number_of_hours > 1 ? 'hours' : 'hour'
    }`

  return (
    <Card sx={sxCard}>
      <CardHeader title={court?.name} />
      <Divider sx={{ margin: '0 16px' }}>{court?.sport_facility.name}</Divider>
      <CardContent>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={sxAvatar}>
                <Event color='primary' />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={date} />
          </ListItem>
          <Divider variant='inset' />
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={sxAvatar}>
                <AccessTime color='primary' />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={time} />
          </ListItem>
          <Divider variant='inset' />
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={sxAvatar}>
                <Timelapse color='primary' />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={duration} />
          </ListItem>
          <Divider variant='inset' />
          <ListItem
            secondaryAction={
              <Tooltip title='show in google maps'>
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${addressString}`}
                  target='_blank'
                >
                  <IconButton edge='end'>
                    <OpenInNew />
                  </IconButton>
                </Link>
              </Tooltip>
            }
          >
            <ListItemAvatar>
              <Avatar sx={sxAvatar}>
                <Place color='primary' />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={addressString} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}

export default ConfirmationCard
