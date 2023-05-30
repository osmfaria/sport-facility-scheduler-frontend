import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LoginIcon from '@mui/icons-material/Login'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import { Box, Container, Divider, Tooltip } from '@mui/material'
import { Stack } from '@mui/system'
import { useState } from 'react'
import SettingsDrawer from '../SettingsDrawer'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { sxAppBar, sxBox, sxIconButton, sxIcon, sxLink, sxLogo } from './styles'

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleDrawer = (): void => {
    setIsOpen((state) => !state)
  }
  const { data: session } = useSession()

  const handleSignOut = async (): Promise<void> => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <Box sx={sxBox}>
      <SettingsDrawer isOpen={isOpen} handleDrawer={handleDrawer} />
      <AppBar sx={sxAppBar}>
        <Container maxWidth='lg' disableGutters>
          <Toolbar>
            <Typography
              variant='h6'
              color='primary'
              component='div'
              sx={sxLogo}
            >
              <Tooltip title='home'>
                <Link href='/' style={sxLink}>
                  Schedule & Play
                </Link>
              </Tooltip>
            </Typography>
            <Stack spacing={1} direction='row'>
              {!!session ? (
                <Tooltip title='Sign out'>
                  <IconButton
                    onClick={handleSignOut}
                    color='primary'
                    sx={sxIconButton}
                  >
                    <LogoutIcon sx={sxIcon} />
                  </IconButton>
                </Tooltip>
              ) : (
                <>
                  <Tooltip title='Sign in'>
                    <Link href='/login'>
                      <IconButton color='primary' sx={sxIconButton}>
                        <LoginIcon sx={sxIcon} />
                      </IconButton>
                    </Link>
                  </Tooltip>
                  <Tooltip title='Sign up'>
                    <Link href='/register'>
                      <IconButton color='primary' sx={sxIconButton}>
                        <HowToRegIcon sx={sxIcon} />
                      </IconButton>
                    </Link>
                  </Tooltip>
                </>
              )}

              <Tooltip title='Settings'>
                <IconButton
                  color='primary'
                  sx={sxIconButton}
                  onClick={handleDrawer}
                >
                  <SettingsIcon sx={sxIcon} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Toolbar>
        </Container>
        <Divider />
      </AppBar>
    </Box>
  )
}
