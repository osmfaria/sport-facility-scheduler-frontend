import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from '@mui/material'
import { Court } from 'interfaces/providerInterface'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { MonetizationOn } from '@mui/icons-material'
import { convertToCurrency, convertToHour } from '@/utils/functions'
import { ReactElement } from 'react'
import { useRouter } from 'next/router'

const CourtCard = ({ court }: { court: Court }): ReactElement => {
  const startingHour = convertToHour(court.opening_hour)
  const closingHour = convertToHour(court.closing_hour)
  const price = convertToCurrency(court.price_by_hour)
  const router = useRouter()

  const handleClick = (): void => {
    router.push(`/courts/${court.id}`)
  }

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
        <Chip label={court.sport} variant='filled' color='secondary' />
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
        <Button size='medium' variant='contained' onClick={handleClick}>
          Book
        </Button>
      </CardActions>
    </Card>
  )
}

const CourtCardSkeleton = (): ReactElement => {
  return (
    <Card sx={{ width: '256px' }}>
      <Skeleton variant='rectangular' height={72} width='100%' />
      <Divider sx={{ margin: '16px 16px 0' }} />
      <CardContent>
        <Skeleton variant='rounded' width='50%' height={32} />
        <List>
          <ListItem>
            <ListItemAvatar>
              <Skeleton variant='circular' width={40} height={40} />
            </ListItemAvatar>
            <Skeleton variant='rectangular' height={40} width='100%' />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Skeleton variant='circular' width={40} height={40} />
            </ListItemAvatar>
            <Skeleton variant='rectangular' height={40} width='100%' />
          </ListItem>
        </List>
      </CardContent>
      <Divider sx={{ margin: '16px 16px 0' }} />
      <CardActions
        disableSpacing
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '8px 16px',
        }}
      >
        <Skeleton variant='rounded' height={36.5} width={70.5} />
      </CardActions>
    </Card>
  )
}

export { CourtCard, CourtCardSkeleton }
