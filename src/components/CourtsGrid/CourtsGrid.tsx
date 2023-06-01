import { Grid } from '@mui/material'
import { Court } from 'interfaces/providerInterface'
import { useCourt } from 'providers/courts'
import { ReactElement } from 'react'
import NoCourtsAvailableCard from '../cards/NoCourtsAvailableCard'
import { CourtCard, CourtCardSkeleton } from '../cards/CourtCard'
import { sxGrid } from './styles'
import { useFacility } from 'providers/FacilityProvider'

const CourtsGrid = ({
  source = 'schedule',
}: {
  source: 'facility' | 'schedule'
}): ReactElement => {
  const { courts, isLoadingCourts } = useCourt()
  const { courtsByFacility, isLoadingCourtsByFacility } = useFacility()

  const isLoading = source === 'schedule' ? isLoadingCourts : isLoadingCourtsByFacility

  const courtsArray = source === 'schedule' ? courts : courtsByFacility

  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={2}
      margin='50px auto'
      maxWidth={{ xs: '300px', md: '600px', lg: '900px' }}
    >
      {isLoading ? (
        [...Array(6)].map((_, index) => (
          <Grid item zeroMinWidth key={index} sx={sxGrid}>
            <CourtCardSkeleton />
          </Grid>
        ))
      ) : courtsArray.length > 0 ? (
        courtsArray.map((court: Court) => (
          <Grid item zeroMinWidth key={court.id} sx={sxGrid}>
            <CourtCard court={court} />
          </Grid>
        ))
      ) : (
        <NoCourtsAvailableCard />
      )}
    </Grid>
  )
}

export default CourtsGrid
