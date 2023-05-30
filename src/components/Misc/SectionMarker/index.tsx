import { Box, Stack } from '@mui/material'
import { sxCircle, sxLine } from './styles'
import { ReactElement } from 'react'
import { SectionMarkerProp } from 'interfaces/componentsInterface'

const SectionMarker = ({
  children,
  firstColor,
  secondColor,
}: SectionMarkerProp): ReactElement => {
  return (
    <Stack justifyContent='center' alignItems='center'>
      <Box component='span' sx={sxLine(firstColor)}></Box>
      <Box sx={sxCircle(firstColor, secondColor)}>{children}</Box>
    </Stack>
  )
}

export default SectionMarker
