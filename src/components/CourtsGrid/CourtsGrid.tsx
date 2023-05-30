import { Grid } from '@mui/material'
import { Court } from 'interfaces/providerInterface'
import { useCourt } from 'providers/courts'
import { ReactElement } from 'react'
import NoCourtsAvailableCard from '../cards/NoCourtsAvailableCard'
import { CourtCard, CourtCardSkeleton } from '../cards/CourtCard'
import { sxGrid } from './styles'

const CourtsGrid = (): ReactElement => {
  const { courts, isLoadingCourts } = useCourt()

  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={2}
      margin='50px auto'
      maxWidth={{ xs: '300px', md: '600px', lg: '900px' }}
    >
      {isLoadingCourts ? (
        [...Array(6)].map((_, index) => (
          <Grid item zeroMinWidth key={index} sx={sxGrid}>
            <CourtCardSkeleton />
          </Grid>
        ))
      ) : courts.length > 0 ? (
        courts.map((court: Court) => (
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
