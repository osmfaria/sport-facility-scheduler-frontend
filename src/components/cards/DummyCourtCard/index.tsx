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
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { MonetizationOn } from '@mui/icons-material'
import { ReactElement } from 'react'
import {
  sxCardAction,
  sxCardHeader,
  sxCard,
  sxDivider,
} from './styles'

const DummyCourtCard = (): ReactElement => {
  return (
    <Card sx={sxCard}>
      <CardHeader
        title='Tennis - Court 05'
        subheader={
          <>
            Facility <strong>Van Sports</strong>
          </>
        }
        sx={sxCardHeader}
      />
      <Divider sx={sxDivider} />
      <CardContent>
        <Chip label='Tennis' variant='filled' />
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccessTimeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='9:00 am - 5:00 pm' />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <MonetizationOn />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='$15.25' secondary='per hour' />
          </ListItem>
        </List>
      </CardContent>
      <Divider sx={sxDivider} />
      <CardActions disableSpacing sx={sxCardAction}>
        <Button size='medium' variant='contained'>
          Book
        </Button>
      </CardActions>
    </Card>
  )
}

export default DummyCourtCard
