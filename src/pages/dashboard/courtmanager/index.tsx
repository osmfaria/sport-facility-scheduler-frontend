import NoCourtsByFacilityCard from '../../../components/cards/NoCourtsByFacilityCard'
import CourtsTable from '../../../components/CourtsTable'
import {
  sxDivider,
  sxFormControl,
  sxSkeletonBox,
  sxSkeletonText,
  sxContainer,
  sxIcon,
  SxSkeletonChip,
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
  Skeleton,
  Box,
  Button,
  Divider,
  LinearProgress,
} from '@mui/material'
import { Facility } from 'interfaces/providerInterface'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useFacility } from 'providers/FacilityProvider'
import { useEffect, useState } from 'react'

const CourtManager = () => {
  const [chosenFacility, setChosenFacility] = useState<Facility>()
  const router = useRouter()

  const {
    getFacilitiesByOwner,
    facilitiesByOwner,
    isLoadingFacilityByOwner,
    getFacilityCourts,
    courtsByFacility,
    isLoadingCourtsByFacility,
  } = useFacility()

  const { data: session } = useSession()

  useEffect(() => {
    if (session) getFacilitiesByOwner(session!.user.accessToken)
  }, [session])

  useEffect(() => {
    if (facilitiesByOwner) {
      setChosenFacility(facilitiesByOwner[0])
      getFacilityCourts(facilitiesByOwner[0].id, session!.user.accessToken)
    }
  }, [facilitiesByOwner])

  const handleChangeFacility = (event: SelectChangeEvent) => {
    const facilityId: string = event.target.value

    if (facilitiesByOwner && facilitiesByOwner.length > 0) {
      const filterFacility = facilitiesByOwner.filter(
        (elem) => elem.id === facilityId
      )[0]
      getFacilityCourts(filterFacility.id, session!.user.accessToken)
      setChosenFacility(filterFacility)
    }
  }

  return (
    <Container maxWidth='lg' sx={sxContainer}>
      <Typography variant='h1' fontSize='1.5rem' fontWeight='500' ml='10px'>
        Sport Venues Manager
      </Typography>
      <Box m='44px 0'>
        {isLoadingFacilityByOwner ? (
          <>
            <Skeleton
              variant='rectangular'
              height={'56px'}
              sx={sxSkeletonBox}
            />
            <Skeleton
              variant='rectangular'
              width={'200px'}
              height={'20px'}
              sx={sxSkeletonText}
            />
          </>
        ) : (
          <>
            {chosenFacility && (
              <FormControl sx={sxFormControl}>
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
      </Box>
      {isLoadingFacilityByOwner ? (
        <Skeleton variant='rounded' width={'143.5px'} height={'36.5px'} />
      ) : (
        <Button
          variant='contained'
          startIcon={<AddCircleOutline />}
          color='success'
          onClick={() => router.push('/dashboard/courtmanager/newcourt')}
        >
          Add Venues
        </Button>
      )}
      <Divider>
        {isLoadingFacilityByOwner ? (
          <Skeleton
            height={'30px'}
            width={'127.67px'}
            variant='rectangular'
            sx={SxSkeletonChip}
          />
        ) : (
          <Box height='30px' padding='0 15px' m='20px 0' sx={sxDivider}>
            <Typography variant='overline' color='white' fontWeight='600'>
              Sport Venues
            </Typography>
          </Box>
        )}
      </Divider>

      {isLoadingCourtsByFacility ? (
        <Box sx={SxLodadingBox}>
          <LinearProgress />
        </Box>
      ) : courtsByFacility.length > 0 ? (
        <CourtsTable />
      ) : (
        <NoCourtsByFacilityCard />
      )}
    </Container>
  )
}

export default CourtManager
