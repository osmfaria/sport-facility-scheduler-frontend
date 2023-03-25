import { Grid } from '@mui/material'
import { Court } from 'interfaces/providerInterface'
import { useCourt } from 'providers/courts'
import React from 'react'
import CourtCard from './CourtCard'

const CourtsGrid = () => {
  const { courts } = useCourt()
  console.log(courts)
  return (
    <Grid
      container
      alignItems='center'
      justifyContent='center'
      rowSpacing={4}
      columnSpacing={4}
      marginTop={2}
    >
      {!!courts.length &&
        courts.map((court: Court) => (
          <Grid item zeroMinWidth key={court.id} sx={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <CourtCard court={court} />
          </Grid>
        ))}
    </Grid>
  )
}

export default CourtsGrid
