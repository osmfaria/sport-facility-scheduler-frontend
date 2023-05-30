import { Button, Container, Grid, Skeleton } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCourt } from 'providers/courts'
import { useFacility } from 'providers/FacilityProvider'
import ScheduleCourtCard from '../../components/cards/ScheduleCourtCard'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import LocationCourtCard from '../../components/cards/LocationCourtCard'
import dayjs from 'dayjs'
import CustomStepper from '../../components/Misc/CustomStepper'
import { useSteps } from 'providers/StepsProvider'
import {
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined,
} from '@mui/icons-material'
import { buttonStyles, containerStyles } from '@/styles/courts.[courtid]'
import { useSchedule } from 'providers/schedule'
dayjs.extend(advancedFormat)

const Court = () => {
  const router = useRouter()
  const { courtid } = router.query
  const { selectTimeSlot } = useSchedule()
  const { court, getCourt, isLoadingCourt } = useCourt()
  const { getAddress, address } = useFacility()
  const { selectCurrentStep, handleBack, handleNext } = useSteps()

  useEffect(() => {
    selectTimeSlot(0) // Reset time slot state
    if (courtid) {
      getCourt(courtid as string)
    }
  }, [courtid])

  useEffect(() => {
    if (court) getAddress(court.sport_facility.id)
    selectCurrentStep(1)
  }, [court])

  return (
    <Container maxWidth='lg' sx={containerStyles}>
      <CustomStepper />
      <Button
        variant='contained'
        endIcon={<ArrowCircleRightOutlined />}
        sx={buttonStyles}
        onClick={() => handleNext(`/courts/${courtid}/booking`)}
      >
        Continue
      </Button>
      <Button
        variant='outlined'
        startIcon={<ArrowCircleLeftOutlined />}
        onClick={() => handleBack(`/courts`)}
      >
        Go back
      </Button>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          {!!court && !isLoadingCourt ? (
            <ScheduleCourtCard />
          ) : (
            <Skeleton animation='wave' variant='rounded' height={'351px'} />
          )}
        </Grid>
        <Grid item md={6} xs={12}>
          {!!address ? (
            <LocationCourtCard />
          ) : (
            <Skeleton animation='wave' variant='rounded' height={'351px'} />
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Court
