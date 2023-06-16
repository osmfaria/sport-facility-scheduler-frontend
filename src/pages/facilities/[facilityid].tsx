// 67d5b51c-4362-487d-86cb-994861a3e314

import CourtsGrid from '../../components/CourtsGrid/CourtsGrid'
import {
  FacilityCard,
  FacilityCardSkeleton,
} from '../../components/cards/FacilityCard'
import { Box, Container, Divider, Typography } from '@mui/material'
import { CustomSession } from 'interfaces/nextauthInterface'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useFacility } from 'providers/FacilityProvider'
import { useEffect } from 'react'

const Facility = () => {
  const router = useRouter()
  const { facilityid } = router.query
  const { facility, getFacility, getFacilityCourts, isLoadingFacility } =
    useFacility()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      const accessToken = (session as CustomSession).user.accessToken
      getFacility(facilityid as string, accessToken!)
      getFacilityCourts(facilityid as string, accessToken!)
    }
  }, [session])

  return (
    <Container maxWidth='lg' sx={{ marginTop: '40px' }}>
      {isLoadingFacility ? (
        <FacilityCardSkeleton />
      ) : (
        facility && <FacilityCard />
      )}

      <Divider>
        <Box
          height='30px'
          padding='0 15px'
          m='20px 0'
          sx={{
            background: 'linear-gradient(to right, #ee0979, #ff6a00)',
            borderRadius: '30px',
            boxShadow: 1,
          }}
        >
          <Typography variant='overline' color='white' fontWeight='600'>
            Sport Venues
          </Typography>
        </Box>
      </Divider>

      <CourtsGrid source='facility' />
    </Container>
  )
}

export default Facility
