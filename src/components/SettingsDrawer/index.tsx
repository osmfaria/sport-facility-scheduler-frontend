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
import { sxBox, sxBoxMain, sxPaper, sxStack, sxToggleButton } from './styles'

const SettingsDrawer = ({ isOpen, handleDrawer }: SettingsDrawerProps) => {
  const { mode, toggleColorMode } = useColorMode()

  const lightModeIconStyle = {
    color: mode === 'light' ? 'orange' : undefined,
  }

  const darkModeIconStyle = {
    color: mode === 'dark' ? 'blue' : undefined,
  }

  return (
    <Drawer
      anchor='right'
      open={isOpen}
      onClose={handleDrawer}
      PaperProps={sxPaper}
    >
      <Box sx={sxBoxMain}>
        <Box sx={sxBox}>
          <Typography variant='body1'>Settings</Typography>
          <IconButton onClick={handleDrawer}>
            <CloseIcon color='primary' />
          </IconButton>
        </Box>
        <Divider />
        <Stack spacing={2} sx={sxStack}>
          <Typography>Mode</Typography>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={toggleColorMode}
            size='small'
          >
            <ToggleButton value='light' sx={sxToggleButton}>
              Light
              <LightModeIcon
                fontSize='small'
                sx={{ ...lightModeIconStyle, marginLeft: 1 }}
              />
            </ToggleButton>
            <ToggleButton value='dark' sx={sxToggleButton}>
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

export default SettingsDrawer
