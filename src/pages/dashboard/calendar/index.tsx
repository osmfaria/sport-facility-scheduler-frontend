import CalendarOptions from '../../../components/CalendarOptions'
import FullCalendarView from '../../../components/FullCallendarView'
import { sxContainer, sxIcon } from '@/styles/calendar.styles'
import { List, Stadium } from '@mui/icons-material'
import {
  Container,
  SelectChangeEvent,
  Typography,
  Grid,
  LinearProgress,
  Box,
} from '@mui/material'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import { useFacility } from 'providers/FacilityProvider'
import { useSchedule } from 'providers/schedule'
import { useEffect } from 'react'
import CustomSelect from '../../../components/forms/CustomSelect'
import NoCourtsByFacilityCard from '../../../components/cards/NoCourtsByFacilityCard'
import NoFacilityCard from '../../../components/cards/NoFacilityCard'

const Calendar = () => {
  const {
    getFacilitiesByOwner,
    facilitiesByOwner,
    isLoadingFacilityByOwner,
    chosenCourt,
    chosenFacility,
    selectCourt,
    selectFacility,
    selectInitialData,
  } = useFacility()
  const { getCourtEvents, getHoliday } = useSchedule()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) getFacilitiesByOwner(session.user.accessToken)
  }, [session])

  useEffect(() => {
    if (facilitiesByOwner) {
      selectInitialData()
    }
  }, [facilitiesByOwner])

  useEffect(() => {
    const loadCourtEvents = async () => {
      const maxRange = chosenCourt!.max_schedule_range_in_days
      const initialDate = dayjs(new Date()).format('YYYY-MM-DD')
      const finalDate = dayjs(new Date())
        .add(maxRange, 'day')
        .format('YYYY-MM-DD')

      const token = session!.user.accessToken
      await getCourtEvents(token, chosenCourt!.id, initialDate, finalDate)
      await getHoliday(token, chosenCourt!.id)
    }

    if (chosenCourt) {
      loadCourtEvents()
    }
  }, [chosenCourt])

  const handleChangeFacility = (event: SelectChangeEvent) => {
    const facilityId: string = event.target.value

    const facility = facilitiesByOwner!.filter(
      (elem) => elem.id === facilityId
    )[0]

    selectFacility(facility)

    if (facility.courts.length > 0) {
      selectCourt(facility.courts[0])
    } else {
      selectCourt(undefined)
    }
  }

  const handleChangeCourt = (event: SelectChangeEvent) => {
    const courtId: string = event.target.value
    const court = chosenFacility!.courts.filter(
      (elem) => elem.id === courtId
    )[0]

    selectCourt(court)
  }

  return (
    <Container maxWidth='lg' sx={sxContainer}>
      <Typography variant='h1' fontSize='1.5rem' fontWeight='500' ml='10px'>
        Calendar
      </Typography>

      {!isLoadingFacilityByOwner && !chosenFacility ? (
        <NoFacilityCard />
      ) : (
        <>
          <Box margin={'44px 0'}>
            <Grid
              container
              alignItems='center'
              justifyContent='center'
              rowSpacing={3}
              columnSpacing={1}
            >
              <Grid item xs={12} sm={6}>
                <CustomSelect
                  isLoading={isLoadingFacilityByOwner}
                  item={chosenFacility}
                  itemArray={facilitiesByOwner}
                  handleChange={handleChangeFacility}
                  helperText='Facility'
                  icon={<Stadium sx={sxIcon} />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomSelect
                  isLoading={isLoadingFacilityByOwner}
                  item={chosenCourt}
                  itemArray={chosenFacility?.courts}
                  handleChange={handleChangeCourt}
                  helperText='Sport Venue'
                  icon={<List sx={sxIcon} />}
                />
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              position: 'relative',
              height: '6px',
            }}
          >
            {isLoadingFacilityByOwner && !chosenCourt && (
              <LinearProgress sx={{ width: '100%', position: 'absolute' }} />
            )}
          </Box>

          {!isLoadingFacilityByOwner && !chosenCourt && (
            <NoCourtsByFacilityCard />
          )}

          {chosenCourt && (
            <>
              <CalendarOptions chosenCourt={chosenCourt} />
              <FullCalendarView chosenCourt={chosenCourt} />
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default Calendar
