import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import CloseIcon from '@mui/icons-material/Close'
import { SettingsDrawerProps } from 'interfaces/componentsInterface'
import { useColorMode } from 'providers/theme'

const FilterDrawer = ({ isOpen, handleDrawer }: SettingsDrawerProps) => {
  const { mode, toggleColorMode } = useColorMode()

  const lightModeIconStyle = {
    color: mode === 'light' ? 'orange' : undefined,
  }

  const darkModeIconStyle = {
    color: mode === 'dark' ? 'blue' : undefined,
  }

  return (
    <Drawer
      anchor='left'
      open={isOpen}
      onClose={handleDrawer}
      variant='persistent'
    >
      <Box sx={{ width: '250px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '15px 10px',
          }}
        >
          <Typography variant='body1'>Settings</Typography>
          <IconButton onClick={handleDrawer}>
            <CloseIcon color='primary' />
          </IconButton>
        </Box>
        <Divider />
        <Stack spacing={2} sx={{ padding: '15px 10px' }}>
          <Typography>Mode</Typography>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={toggleColorMode}
            size='small'
          >
            <ToggleButton value='light' sx={{ flexGrow: '1' }}>
              Light
              <LightModeIcon
                fontSize='small'
                sx={{ ...lightModeIconStyle, marginLeft: 1 }}
              />
            </ToggleButton>
            <ToggleButton value='dark' sx={{ flexGrow: '1' }}>
              Dark{' '}
              <DarkModeIcon
                fontSize='small'
                sx={{ ...darkModeIconStyle, marginLeft: 1 }}
              />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Box>
    </Drawer>
  )
}

export default FilterDrawer
