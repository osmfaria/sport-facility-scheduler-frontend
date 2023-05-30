import { Box } from '@mui/system'
import DummyCourtCard from '../DummyCourtCard'
import { sxContainer, sxBox } from './styles'
import { useTheme } from '@mui/material'

const CardFan = () => {
  const theme = useTheme()

  return (
    <Box sx={sxContainer(theme)}>
      <Box sx={sxBox('0', 10)}>
        <DummyCourtCard />
      </Box>
      <Box sx={sxBox('5', 5)}>
        <DummyCourtCard />
      </Box>
      <Box sx={sxBox('10', 1)}>
        <DummyCourtCard />
      </Box>
    </Box>
  )
}

export default CardFan
