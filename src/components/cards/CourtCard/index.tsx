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
import { ReactElement, useEffect } from 'react'
import { useSteps } from 'providers/StepsProvider'
import {
  sxCardAction,
  sxCardHeader,
  sxCard,
  sxDividerSkeleton,
  sxDivider,
} from './styles'

const CourtCard = ({ court }: { court: Court }): ReactElement => {
  const startingHour = convertToHour(court.opening_hour)
  const closingHour = convertToHour(court.closing_hour)
  const price = convertToCurrency(court.price_by_hour)
  const { handleNext } = useSteps()

  const handleClick = (): void => {
    handleNext(`/courts/${court.id}`)
  }

  return (
    <Card sx={sxCard}>
      <CardHeader
        title={court.name}
        subheader={
          <>
            Facility <strong>{court.sport_facility.name}</strong>
          </>
        }
        sx={sxCardHeader}
      />
      <Divider sx={sxDivider} />
      <CardContent>
        <Chip label={court.sport} variant='filled' />
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccessTimeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${startingHour} - ${closingHour}`} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <MonetizationOn />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={price} secondary='per hour' />
          </ListItem>
        </List>
      </CardContent>
      <Divider sx={sxDivider} />
      <CardActions disableSpacing sx={sxCardAction}>
        <Button size='medium' variant='contained' onClick={handleClick}>
          Book
        </Button>
      </CardActions>
    </Card>
  )
}

const CourtCardSkeleton = (): ReactElement => {
  return (
    <Card sx={sxCard}>
      <Skeleton variant='rectangular' height={72} width='100%' />
      <Divider sx={sxDividerSkeleton} />
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
      <Divider sx={sxDividerSkeleton} />
      <CardActions disableSpacing sx={sxCardAction}>
        <Skeleton variant='rounded' height={36.5} width={70.5} />
      </CardActions>
    </Card>
  )
}

export { CourtCard, CourtCardSkeleton }
