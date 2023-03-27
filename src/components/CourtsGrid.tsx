import { Grid } from '@mui/material'
import { Court } from 'interfaces/providerInterface'
import { useCourt } from 'providers/courts'
import { ReactElement } from 'react'
import { CourtCard, CourtCardSkeleton } from './CourtCard'

const CourtsGrid = (): ReactElement => {
  const { courts, isLoading } = useCourt()

  return (
    <Grid
      container
      alignItems='center'
      justifyContent='center'
      rowSpacing={4}
      columnSpacing={4}
      marginTop={2}
    >
      {isLoading
        ? [...Array(6)].map((_, index) => (
            <Grid
              item
              zeroMinWidth
              key={index}
              sx={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}
            >
              <CourtCardSkeleton />
            </Grid>
          ))
        : !!courts.length &&
          courts.map((court: Court) => (
            <Grid
              item
              zeroMinWidth
              key={court.id}
              sx={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}
            >
              <CourtCard court={court} />
            </Grid>
          ))}
    </Grid>
  )
}

export default CourtsGrid
