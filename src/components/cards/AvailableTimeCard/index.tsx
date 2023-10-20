import BookingTimeCard from '../BookingTimeCard'
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Zoom,
} from '@mui/material'
import { HourCard, HourCardSkeleton } from '../HourCard'
import NoTimeAvailableCard from '../NoTimeAvailableCard'
import { useSchedule } from 'providers/schedule'
import { sxFormControl, sxPaper } from './styles'
import { ArrowCircleRightOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { CustomSession } from 'interfaces/nextauthInterface'
import { LoadingButton } from '@mui/lab'

const AvailableTimeCard = () => {
  const router = useRouter()
  const [numberOfHours, setNumberOfHours] = useState<number>(1)
  const {
    isLoading,
    courtSchedule,
    selectedHour,
    timeSlotRange,
    bookCourt,
    isLoadingBooking,
  } = useSchedule()
  const { courtid } = router.query
  const { data: session } = useSession()
  const isCourtAvailable = courtSchedule.length > 0
  const isTimeSelected = selectedHour !== undefined ? selectedHour > 0 : false

  const handleRangeSelection = (e: SelectChangeEvent) => {
    setNumberOfHours(Number(e.target.value))
  }

  const handleBooking = async (): Promise<void> => {
    const accessToken = (session as CustomSession).user.accessToken
    const res = await bookCourt(courtid as string, numberOfHours, accessToken!)
    if (res === 201) {
      router.push(`/courts/${courtid}/confirmation`)
    } else {
      router.push('/opss')
    }
  }

  useEffect(() => {
    setNumberOfHours(1)
  }, [timeSlotRange])

  return (
    <Paper sx={sxPaper}>
      <BookingTimeCard />
      <Stack justifyContent='space-between' height='80%' spacing={2}>
        <Grid container rowSpacing={1} columnSpacing={1}>
          {isLoading ? (
            [...Array(14)].map((_, index) => (
              <Grid item key={index}>
                <HourCardSkeleton />
              </Grid>
            ))
          ) : (
            <>
              {isCourtAvailable ? (
                courtSchedule.map((hour) => (
                  <Grid item key={hour}>
                    <HourCard hour={hour} />
                  </Grid>
                ))
              ) : (
                <NoTimeAvailableCard />
              )}
            </>
          )}
        </Grid>

        <Zoom in={isTimeSelected}>
          <Stack direction='row' justifyContent='flex-end' alignItems='center'>
            <FormControl sx={sxFormControl}>
              <InputLabel>number of hours</InputLabel>
              <Select
                value={(numberOfHours <= timeSlotRange
                  ? numberOfHours
                  : timeSlotRange
                ).toString()}
                onChange={handleRangeSelection}
                size='small'
                label='number of hours'
              >
                {[...Array(timeSlotRange)].map((_, index) =>
                  index === 0 ? (
                    <MenuItem value={index + 1} key={index}>
                      1 hour
                    </MenuItem>
                  ) : (
                    <MenuItem value={index + 1} key={index}>
                      {index + 1} hours
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>

            <LoadingButton
              loading={isLoadingBooking}
              variant='contained'
              loadingPosition='end'
              endIcon={<ArrowCircleRightOutlined />}
              onClick={() => handleBooking()}
            >
              Book
            </LoadingButton>
          </Stack>
        </Zoom>
      </Stack>
    </Paper>
  )
}

export default AvailableTimeCard
