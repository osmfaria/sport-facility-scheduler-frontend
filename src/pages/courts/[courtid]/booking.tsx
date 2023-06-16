import { Button, Container, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSchedule } from 'providers/schedule'
import { useSession } from 'next-auth/react'
import { CustomSession } from 'interfaces/nextauthInterface'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import AvailableTimeCard from '../../../components/cards/AvailableTimeCard'
import dayjs from 'dayjs'
import CalendarCard from '../../../components/cards/CalendarCard'
import CustomStepper from '../../../components/Misc/CustomStepper'
import { useSteps } from 'providers/StepsProvider'
import { ArrowCircleLeftOutlined } from '@mui/icons-material'
import { buttonStyles, containerStyles } from '../../../styles/booking.styles'
dayjs.extend(advancedFormat)

const Booking = () => {
  const router = useRouter()
  const { courtid } = router.query
  const { getAvailableHours } = useSchedule()
  const { selectedDate } = useSchedule()
  const { data: session } = useSession()
  const { selectCurrentStep, handleBack } = useSteps()

  useEffect(() => {
    if (session) {
      const accessToken = (session as CustomSession).accessToken
      getAvailableHours(courtid, accessToken!)
    }
  }, [selectedDate])

  useEffect(() => {
    selectCurrentStep(2)
  }, [])

  return (
    <Container maxWidth='lg' sx={containerStyles}>
      <CustomStepper />
      <Button
        variant='outlined'
        startIcon={<ArrowCircleLeftOutlined />}
        sx={buttonStyles}
        onClick={() => handleBack(`/courts/${courtid}`)}
      >
        Go back
      </Button>
      <Grid container spacing={2}>
        <Grid item md={5} xs={12}>
          <CalendarCard />
        </Grid>
        <Grid item md={7} xs={12}>
          <AvailableTimeCard />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Booking
