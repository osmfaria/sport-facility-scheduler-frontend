import CourtManagerSkeleton from '../../../components/skeletons/CourtManagerSkeleton'
import { sxContainer } from '@/styles/courtmanager.styles'
import { Container } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useFacility } from 'providers/FacilityProvider'
import { useEffect } from 'react'
import NoFacilityCard from '../../../components/cards/NoFacilityCard'
import CourtManagerComponent from '../../../components/CourtManagerComponent'

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
    <Container maxWidth='lg' sx={sxContainer}>
      {isLoading ? (
        <CourtManagerSkeleton />
      ) : isFacilityAvailable ? (
        <CourtManagerComponent />
      ) : (
        <NoFacilityCard />
      )}
    </Container>
  )
}

export default CourtManager
