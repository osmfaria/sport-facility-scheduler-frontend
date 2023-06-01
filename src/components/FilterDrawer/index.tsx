import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  TextField,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import TuneIcon from '@mui/icons-material/Tune'
import { SettingsDrawerProps } from 'interfaces/componentsInterface'
import { useCourt } from 'providers/courts'
import { useState } from 'react'
import { useSchedule } from 'providers/schedule'
import { sxBox, sxBoxItem, sxPaper, sxStack } from './styles'

const FilterDrawer = ({ isOpen, handleDrawer }: SettingsDrawerProps) => {
  const { getCourtsByLocationAndTime } = useCourt()
  const { selectedDate } = useSchedule()
  const [sport, setSport] = useState<string>('')

  const handleFilter = (): void => {
    getCourtsByLocationAndTime(selectedDate, sport)
    setSport('')
    handleDrawer()
  }

  return (
    <Drawer
      anchor='left'
      open={isOpen}
      onClose={handleDrawer}
      PaperProps={sxPaper}
    >
      <Box sx={{ width: '250px' }}>
        <Box sx={sxBox}>
          <IconButton onClick={handleDrawer}>
            <ChevronLeftIcon color='primary' />
          </IconButton>
        </Box>
        <Divider />
        <Stack spacing={2} sx={sxStack}>
          <TuneIcon color='primary' />
          <Box sx={sxBoxItem}>
            <TextField
              label='sport'
              size='small'
              value={sport}
              onChange={(e) => setSport(e.target.value)}
            />
            <Button variant='contained' onClick={() => handleFilter()}>
              Go
            </Button>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  )
}

export default FilterDrawer
