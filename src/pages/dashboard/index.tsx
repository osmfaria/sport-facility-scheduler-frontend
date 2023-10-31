import {
  sxAvatar,
  sxBox,
  sxCard,
  sxCardAction,
  sxContainer,
  sxGridContainer,
  sxIconButton,
} from '@/styles/dashboard.styles'
import {
  CalendarMonth,
  OpenInNew,
  Settings,
  Stadium,
  Villa,
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
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const Dashboard = (): ReactElement => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Ninja Sports | Dashboard</title>
        <meta name='Dashboard' content='Dashboard manager' />
      </Head>
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
                  <Avatar sx={sxAvatar}>
                    <Villa />
                  </Avatar>
                }
              />
              <IconButton className='icon' sx={sxIconButton}>
                <OpenInNew />
              </IconButton>
              <CardContent>
                <Box sx={sxBox}>
                  <Typography variant='caption' color='primary'>
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
            <Card
              sx={sxCard}
              onClick={() => router.push('/dashboard/facilitymanager')}
            >
              <CardHeader
                title='Manage Facility'
                avatar={
                  <Avatar sx={sxAvatar}>
                    <Stadium />
                  </Avatar>
                }
              />
              <IconButton className='icon' sx={sxIconButton}>
                <OpenInNew />
              </IconButton>
              <CardContent>
                <Box sx={sxBox}>
                  <Typography variant='caption' color='primary'>
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
            <Card
              sx={sxCard}
              onClick={() => router.push('/dashboard/calendar')}
            >
              <CardHeader
                title='Calendar'
                avatar={
                  <Avatar sx={sxAvatar}>
                    <CalendarMonth />
                  </Avatar>
                }
              />
              <IconButton className='icon' sx={sxIconButton}>
                <OpenInNew />
              </IconButton>
              <CardContent>
                <Box sx={sxBox}>
                  <Typography variant='caption' color='primary'>
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
    </>
  )
}

export default Dashboard
