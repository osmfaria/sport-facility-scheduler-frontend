import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import { Court } from 'interfaces/providerInterface'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import dayjs from 'dayjs'
import { MonetizationOn } from '@mui/icons-material'

const CourtCard = ({ court }: { court: Court }) => {
  const convertToHour = (input: string): string => {
    return dayjs(input, 'HH:mm:ss').format('h:mm A')
  }
  const startingHour = convertToHour(court.opening_hour)
  const closingHour = convertToHour(court.closing_hour)
  const price = Number(court.price_by_hour).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return (
    <Card>
      <CardHeader
        title={court.name}
        subheader={
          <>
            Facility <strong>{court.sport_facility.name}</strong>
          </>
        }
      />
      <Divider sx={{ margin: '0 16px' }} />
      <CardContent>
        {/* <Paper sx={{ maxWidth: '130px' }}> */}
        <Chip label={court.sport} variant='filled' color='secondary' />
        {/* <Typography variant='subtitle2' ml={2}>
            {court.sport}
          </Typography> */}
        {/* </Paper> */}
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccessTimeIcon color='secondary' />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${startingHour} - ${closingHour}`} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <MonetizationOn color='secondary' />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={price} secondary='per hour' />
          </ListItem>
        </List>
      </CardContent>
      <Divider sx={{ margin: '0 16px' }} />
      <CardActions
        disableSpacing
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '8px 16px',
        }}
      >
        <Button size='medium' variant='contained'>
          Book
        </Button>
      </CardActions>
    </Card>
  )
}

export default CourtCard
