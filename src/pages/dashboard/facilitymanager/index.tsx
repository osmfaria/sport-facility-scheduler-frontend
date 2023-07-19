import NoFacilityCard from '../../../components/cards/NoFacilityCard'
import FacilityTable from '../../../components/FacilityTable'
import {
  sxDivider,
  sxContainer,
  SxSkeletonChip,
  SxLodadingBox,
} from '@/styles/courtmanager.styles'
import { AddCircleOutline } from '@mui/icons-material'
import {
  Container,
  Typography,
  Skeleton,
  Box,
  Button,
  Divider,
  LinearProgress,
  Stack,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useFacility } from 'providers/FacilityProvider'
import { useEffect } from 'react'

const FacilityManager = () => {
  const router = useRouter()
  const { getFacilitiesByOwner, facilitiesByOwner, isLoadingFacilityByOwner } =
    useFacility()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) getFacilitiesByOwner(session!.user.accessToken)
  }, [session])

  const isLoading = isLoadingFacilityByOwner && facilitiesByOwner === undefined

  return (
    <Container maxWidth='lg' sx={sxContainer}>
      <Typography variant='h1' fontSize='1.5rem' fontWeight='500' ml='10px'>
        Facility Manager
      </Typography>
      {isLoading ? (
        <Stack direction='row' spacing={2} m='44px 0'>
          <Skeleton variant='rounded' width={'207.48px'} height={'36.5px'} />
          <Skeleton variant='rounded' width={'136.22px'} height={'36.5px'} />
        </Stack>
      ) : (
        <Stack direction='row' spacing={2} m='44px 0'>
          <Button
            variant='contained'
            startIcon={<AddCircleOutline />}
            color='success'
            onClick={() =>
              router.push('/dashboard/facilitymanager/newfacility')
            }
          >
            Create New Facility
          </Button>
          <Button
            variant='outlined'
            onClick={() => router.push('/dashboard/courtmanager')}
          >
            Sport Venues
          </Button>
        </Stack>
      )}

      <Divider>
          <Box height='30px' padding='0 15px' m='20px 0' sx={sxDivider}>
            <Typography variant='overline' color='white' fontWeight='600'>
              Facilities
            </Typography>
          </Box>
      </Divider>

      {isLoading ? (
        <Box sx={SxLodadingBox}>
          <LinearProgress />
        </Box>
      ) : facilitiesByOwner && facilitiesByOwner.length > 0 ? (
        <FacilityTable />
      ) : (
        <NoFacilityCard />
      )}
    </Container>
  )
}

export default FacilityManager
