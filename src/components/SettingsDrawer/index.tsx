import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
import {
  sxBox,
  sxBoxMain,
  sxLink,
  sxListText,
  sxPaper,
  sxStack,
  sxToggleButton,
} from './styles'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import {
  AccountCircle,
  Dashboard,
  LoginOutlined,
  LogoutOutlined,
  Search,
} from '@mui/icons-material'

const SettingsDrawer = ({ isOpen, handleDrawer }: SettingsDrawerProps) => {
  const { mode, toggleColorMode } = useColorMode()
  const { data: session } = useSession()

  const handleSignOut = async (): Promise<void> => {
    signOut({ callbackUrl: '/' })
  }

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
        <Stack spacing={1} sx={sxStack}>
          <List>
            {!!session && (
              <>
                <ListItem>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText
                    secondaryTypographyProps={{ sx: sxListText }}
                    primary={session!.user.username}
                    secondary={session!.user.email}
                  />
                </ListItem>

                {session.user.is_owner && (
                  <Link href='/dashboard' style={sxLink}>
                    <ListItemButton onClick={handleDrawer}>
                      <ListItemIcon>
                        <Dashboard />
                      </ListItemIcon>
                      <ListItemText primary='Dashboard' />
                    </ListItemButton>
                  </Link>
                )}
              </>
            )}
            <Link href='/courts' style={sxLink}>
              <ListItemButton onClick={handleDrawer}>
                <ListItemIcon>
                  <Search />
                </ListItemIcon>
                <ListItemText
                  primary='Discover'
                  secondary='Search sport venues'
                />
              </ListItemButton>
            </Link>

            {!!session ? (
              <ListItemButton onClick={handleSignOut}>
                <ListItemIcon>
                  <LogoutOutlined />
                </ListItemIcon>
                <ListItemText primary='Sign out' />
              </ListItemButton>
            ) : (
              <Link href='/login' style={sxLink}>
                <ListItemButton onClick={handleDrawer}>
                  <ListItemIcon>
                    <LoginOutlined />
                  </ListItemIcon>
                  <ListItemText primary='Sign in' />
                </ListItemButton>
              </Link>
            )}
          </List>

          <Divider />

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
