import CourtManagerSkeleton from '../../../components/skeletons/CourtManagerSkeleton'
import { sxContainer } from '@/styles/courtmanager.styles'
import { Container, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useFacility } from 'providers/FacilityProvider'
import { useEffect } from 'react'
import NoFacilityCard from '../../../components/cards/NoFacilityCard'
import CourtManagerComponent from '../../../components/CourtManagerComponent'
import Head from 'next/head'

const CourtManager = () => {
  const { getFacilitiesByOwner, facilitiesByOwner, isLoadingFacilityByOwner } =
    useFacility()

  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      getFacilitiesByOwner(session!.user.accessToken)
    }
  }, [session])

  const isFacilityAvailable = facilitiesByOwner && facilitiesByOwner.length > 0
  const isLoading = facilitiesByOwner === undefined && isLoadingFacilityByOwner

  return (
    <>
      <Head>
        <title>Ninja Sports | Venue Manager</title>
        <meta name='New Venue' content='New venue form' />
      </Head>
      <Container maxWidth='lg' sx={sxContainer}>
        <Typography variant='h1' fontSize='1.5rem' fontWeight='500' ml='10px'>
          Sport Venues Manager
        </Typography>
        {isLoading ? (
          <CourtManagerSkeleton />
        ) : isFacilityAvailable ? (
          <CourtManagerComponent />
        ) : (
          <NoFacilityCard />
        )}
      </Container>
    </>
  )
}

export default CourtManager
