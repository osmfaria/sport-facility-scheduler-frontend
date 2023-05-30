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
      PaperProps={{
        sx: {
          borderRadius: '0 10px 10px 0',
        },
      }}
    >
      <Box sx={{ width: '250px' }}>
        <Box
          sx={{
            height: '64px',
            lineHeight: '64px',
            padding: '0 10px',
            textAlign: 'right',
          }}
        >
          <IconButton onClick={handleDrawer}>
            <ChevronLeftIcon color='primary' />
          </IconButton>
        </Box>
        <Divider />
        <Stack spacing={2} sx={{ padding: '15px 10px' }}>
          <TuneIcon color='primary' />
          <Box sx={{ display: 'flex', gap: 1 }}>
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
