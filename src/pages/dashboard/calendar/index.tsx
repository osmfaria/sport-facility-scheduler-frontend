import FullCalendarView from '../../../components/FullCallendarView'
import { sxContainer, sxFormControl, sxIcon } from '@/styles/calendar.styles'
import { courtOperatingDays } from '@/utils/functions'
import { Announcement, List, Stadium } from '@mui/icons-material'
import {
  Container,
  Select,
  SelectChangeEvent,
  Typography,
  MenuItem,
  FormControl,
  FormHelperText,
  Grid,
  Stack,
  Skeleton,
} from '@mui/material'
import dayjs from 'dayjs'
import { Court, Facility } from 'interfaces/providerInterface'
import { useSession } from 'next-auth/react'
import { useFacility } from 'providers/FacilityProvider'
import { useSchedule } from 'providers/schedule'
import { useEffect, useState } from 'react'

const Calendar = () => {
  const [chosenFacility, setChosenFacility] = useState<Facility>()
  const [chosenCourt, setChosenCourt] = useState<Court>()

  const { getFacilitiesByOwner, facilitiesByOwner, isLoadingFacilityByOwner } =
    useFacility()
  const { getCourtEvents, resetCourtEvents } = useSchedule()
  const { data: session } = useSession()
  
  const startTime = chosenCourt ? chosenCourt.opening_hour : '10:00'
  const endTime = chosenCourt ? chosenCourt.closing_hour : '20:00'
  const daysOfWeek = courtOperatingDays(chosenCourt)

  useEffect(() => {
    if (session) getFacilitiesByOwner(session!.user.accessToken)
  }, [session])

  useEffect(() => {
    if (facilitiesByOwner) {
      setChosenFacility(facilitiesByOwner[0])
      if (facilitiesByOwner[0].courts.length > 0) {
        setChosenCourt(facilitiesByOwner[0].courts[0])
      } else {
        setChosenCourt(undefined)
      }
    }
  }, [facilitiesByOwner])

  const handleChangeFacility = (event: SelectChangeEvent) => {
    const facilityId: string = event.target.value

    if (facilitiesByOwner && facilitiesByOwner.length > 0) {
      setChosenCourt(undefined)
      const filterFacility = facilitiesByOwner.filter(
        (elem) => elem.id === facilityId
      )[0]

      setChosenFacility(filterFacility)
      if (filterFacility.courts.length > 0) {
        setChosenCourt(filterFacility.courts[0])
      }
    }
  }

  const handleChangeCourt = (event: SelectChangeEvent) => {
    const courtId: string = event.target.value

    if (chosenFacility) {
      setChosenCourt(
        chosenFacility.courts.filter((elem) => elem.id === courtId)[0]
      )
    }
  }

  const maxRange =
    chosenFacility && chosenFacility.courts.length > 0
      ? (chosenCourt || chosenFacility.courts[0]).max_schedule_range_in_days
      : 30

  const initialDate = dayjs(new Date()).format('YYYY-MM-DD')
  const finalDate = dayjs(new Date()).add(maxRange, 'day').format('YYYY-MM-DD')

  useEffect(() => {
    if (chosenCourt) {
      getCourtEvents(
        session!.user.accessToken,
        chosenCourt.id,
        initialDate,
        finalDate
      )
    } else {
      resetCourtEvents()
    }
  }, [chosenCourt])

  return (
    <Container maxWidth='lg' sx={sxContainer}>
      <Typography variant='h1' fontSize='1.5rem' fontWeight='500' ml='10px'>
        Calendar
      </Typography>
      <Grid
        container
        alignItems='center'
        justifyContent='center'
        rowSpacing={3}
        columnSpacing={1}
        m='20px 0 40px'
      >
        <Grid item xs={12} sm={6}>
          {isLoadingFacilityByOwner ? (
            <Skeleton variant='rectangular' width={'100%'} height={'56px'} />
          ) : (
            <>
              {chosenFacility && (
                <FormControl sx={{ width: '100%' }}>
                  <Select
                    startAdornment={<Stadium sx={sxIcon} />}
                    id='select-facility'
                    value={chosenFacility.id}
                    onChange={handleChangeFacility}
                  >
                    {facilitiesByOwner!.map((facility) => (
                      <MenuItem value={facility.id} key={facility.id}>
                        {facility.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Facility</FormHelperText>
                </FormControl>
              )}
            </>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          {isLoadingFacilityByOwner ? (
            <Skeleton variant='rectangular' width={'100%'} height={'56px'} />
          ) : (
            <>
              {chosenCourt ? (
                <FormControl sx={sxFormControl}>
                  <Select
                    startAdornment={<List sx={sxIcon} />}
                    id='court-facility'
                    value={chosenCourt.id}
                    onChange={handleChangeCourt}
                  >
                    {chosenFacility!.courts.map((court) => (
                      <MenuItem value={court.id} key={court.id}>
                        {court.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Sport Venue</FormHelperText>
                </FormControl>
              ) : (
                <Stack spacing={1} direction='row' height='56px' mt='20px'>
                  <Announcement color='warning' />
                  <Typography>No sports venues found...</Typography>
                </Stack>
              )}
            </>
          )}
        </Grid>
      </Grid>
      <FullCalendarView
        startTime={startTime}
        endTime={endTime}
        daysOfWeek={daysOfWeek}
      />
    </Container>
  )
}

export default Calendar
