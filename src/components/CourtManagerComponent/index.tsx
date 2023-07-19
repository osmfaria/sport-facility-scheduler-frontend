import NoCourtsByFacilityCard from '../cards/NoCourtsByFacilityCard'
import CourtsTable from '../CourtsTable'
import {
  sxDivider,
  sxFormControl,
  sxContainer,
  sxIcon,
  SxLodadingBox,
} from '@/styles/courtmanager.styles'
import { AddCircleOutline, Stadium } from '@mui/icons-material'
import {
  Container,
  Select,
  SelectChangeEvent,
  Typography,
  MenuItem,
  FormControl,
  FormHelperText,
  Box,
  Button,
  Divider,
  LinearProgress,
  Stack,
} from '@mui/material'
import { Facility } from 'interfaces/providerInterface'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useFacility } from 'providers/FacilityProvider'
import { useEffect, useState } from 'react'

const CourtManagerComponent = () => {
  const [firstFacility, setFirstFacility] = useState<Facility>()
  const router = useRouter()
  const { data: session } = useSession()

  const {
    facilitiesByOwner,
    getFacilityCourts,
    courtsByFacility,
    isLoadingCourtsByFacility,
  } = useFacility()

  const isLoading = isLoadingCourtsByFacility && courtsByFacility === undefined
  const isCourtsAvailable = courtsByFacility && courtsByFacility.length > 0

  useEffect(() => {
    setFirstFacility(facilitiesByOwner![0])
    getFacilityCourts(facilitiesByOwner![0].id, session!.user.accessToken)
  }, [])

  const handleChangeFacility = (event: SelectChangeEvent) => {
    const facilityId: string = event.target.value
    const filterFacility = facilitiesByOwner!.filter(
      (elem) => elem.id === facilityId
    )[0]
    getFacilityCourts(filterFacility.id, session!.user.accessToken)
    setFirstFacility(filterFacility)
  }

  return (
    <Container maxWidth='lg' sx={sxContainer}>
      <Typography variant='h1' fontSize='1.5rem' fontWeight='500' ml='10px'>
        Sport Venues Manager
      </Typography>
      <Box m='44px 0'>
        {firstFacility && (
          <FormControl sx={sxFormControl}>
            <Select
              startAdornment={<Stadium sx={sxIcon} />}
              id='select-facility'
              value={firstFacility.id}
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
      </Box>
      <Stack direction='row' spacing={2}>
        <Button
          variant='contained'
          startIcon={<AddCircleOutline />}
          color='success'
          onClick={() => router.push('/dashboard/courtmanager/newcourt')}
        >
          Add Venues
        </Button>
        <Button
          variant='outlined'
          onClick={() => router.push('/dashboard/facilitymanager/')}
        >
          Manage Facilities
        </Button>
      </Stack>
      <Divider>
        <Box height='30px' padding='0 15px' m='20px 0' sx={sxDivider}>
          <Typography variant='overline' color='white' fontWeight='600'>
            Sport Venues
          </Typography>
        </Box>
      </Divider>

      {isLoading ? (
        <Box sx={SxLodadingBox}>
          <LinearProgress />
        </Box>
      ) : isCourtsAvailable ? (
        <CourtsTable />
      ) : (
        <NoCourtsByFacilityCard />
      )}
    </Container>
  )
}

export default CourtManagerComponent
