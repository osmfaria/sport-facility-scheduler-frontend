import {
  sxBox,
  sxCard,
  sxCardAction,
  sxContainer,
  sxGridContainer,
  sxIconButton,
} from '@/styles/dashboard.styles'
import {
  CalendarMonth,
  HomeWork,
  OpenInNew,
  Settings,
  Stadium,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const Dashboard = (): ReactElement => {
  const router = useRouter()

  return (
    <Container maxWidth='lg' sx={sxContainer}>
      <Typography variant='h1' fontSize='1.5rem' fontWeight='500' ml='10px'>
        Dashboard
      </Typography>
      <Grid container spacing={2} sx={sxGridContainer}>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          onClick={() => router.push('/dashboard/courtmanager')}
        >
          <Card sx={sxCard}>
            <CardHeader
              title='Manage Sport Venues'
              avatar={
                <Avatar>
                  <HomeWork />
                </Avatar>
              }
            />
            <IconButton className='icon' sx={sxIconButton}>
              <OpenInNew />
            </IconButton>
            <CardContent>
              <Box sx={sxBox}>
                <Typography variant='caption' color='GrayText'>
                  Arrange operating hours, holidays, add venues...
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={sxCardAction}>
              <IconButton>
                <Settings />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={sxCard} onClick={() => router.push('/dashboard/facilitymanager')}>
            <CardHeader
              title='Manage Facility'
              avatar={
                <Avatar>
                  <Stadium />
                </Avatar>
              }
            />
            <IconButton className='icon' sx={sxIconButton}>
              <OpenInNew />
            </IconButton>
            <CardContent>
              <Box sx={sxBox}>
                <Typography variant='caption' color='GrayText'>
                  Create and edit facilities...
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={sxCardAction}>
              <IconButton>
                <Settings />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={sxCard} onClick={() => router.push('/dashboard/calendar')}>
            <CardHeader
              title='Calendar'
              avatar={
                <Avatar>
                  <CalendarMonth />
                </Avatar>
              }
            />
            <IconButton className='icon' sx={sxIconButton}>
              <OpenInNew />
            </IconButton>
            <CardContent>
              <Box sx={sxBox}>
                <Typography variant='caption' color='GrayText'>
                  Calendar with sport venues current schedule
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={sxCardAction}>
              <IconButton>
                <Settings />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard
