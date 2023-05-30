import { convertToCurrency, convertToHour } from '@/utils/functions'
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from '@mui/material'
import { useCourt } from 'providers/courts'
import {
  MonetizationOn,
  ReduceCapacity,
  OtherHouses,
  AccessTime,
  OpenInNew,
} from '@mui/icons-material'
import {
  sxButton,
  sxCardAction,
  sxCardHeader,
  sxCard,
  sxDivider,
} from './styles'

function ScheduleCourtCard() {
  const { court } = useCourt()
  const startingHour = convertToHour(court!.opening_hour)
  const closingHour = convertToHour(court!.closing_hour)
  const price = convertToCurrency(court!.price_by_hour)

  return (
    <Card sx={sxCard}>
      <CardHeader title={court!.name} sx={sxCardHeader} />
      <Divider sx={sxDivider} />
      <CardActions sx={sxCardAction}>
        <Tooltip title='Explore other sports venues within this facility'>
          <Button variant='contained' endIcon={<OpenInNew />} sx={sxButton}>
            {court!.sport_facility.name}
          </Button>
        </Tooltip>
      </CardActions>
      <CardContent>
        <Container>
          <Chip label={court!.sport} variant='filled' />
          <List>
            <Grid container direction={{ xs: 'column', sm: 'row' }}>
              <Grid item>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AccessTime />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${startingHour} - ${closingHour}`}
                    secondary='operating hours'
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <MonetizationOn />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={price} secondary='per hour' />
                </ListItem>
              </Grid>
              <Grid item>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ReduceCapacity />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={court!.capacity + ' people'}
                    secondary='capacity'
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <OtherHouses />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={court!.is_indoor ? 'yes' : 'no'}
                    secondary='indoor'
                  />
                </ListItem>
              </Grid>
            </Grid>
          </List>
        </Container>
      </CardContent>
    </Card>
  )
}

export default ScheduleCourtCard
