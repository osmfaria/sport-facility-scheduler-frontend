import { sxDivider } from '@/styles/courtmanager.styles'
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
import Head from 'next/head'

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
    <>
      <Head>
        <title>Ninja Sports | Facility</title>
        <meta name='Facility page' content='facility data' />
      </Head>
      <Container maxWidth='lg' sx={{ marginTop: '40px' }}>
        {isLoadingFacility || !facility ? (
          <FacilityCardSkeleton />
        ) : (
          facility && <FacilityCard />
        )}

        <Divider>
          <Box height='30px' padding='0 15px' m='20px 0' sx={sxDivider}>
            <Typography variant='overline' color='white' fontWeight='600'>
              Sport Venues
            </Typography>
          </Box>
        </Divider>

        <CourtsGrid source='facility' />
      </Container>
    </>
  )
}

export default Facility
