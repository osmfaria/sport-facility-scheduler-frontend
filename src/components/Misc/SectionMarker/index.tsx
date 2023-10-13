import { Box, Stack } from '@mui/material'
import { sxCircle, sxLine } from './styles'
import { ReactElement } from 'react'
import { SectionMarkerProp } from 'interfaces/componentsInterface'

const SectionMarker = ({ children }: SectionMarkerProp): ReactElement => {
  return (
    <Stack justifyContent='center' alignItems='center'>
      <Box component='span' sx={sxLine}></Box>
      <Box sx={sxCircle}>{children}</Box>
    </Stack>
  )
}

export default SectionMarker
