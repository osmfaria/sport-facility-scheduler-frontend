import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import { Box, Container, Tooltip } from '@mui/material'
import { Stack } from '@mui/system'
import { useState } from 'react'
import SettingsDrawer from '../SettingsDrawer'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import {
  sxIconButton,
  sxIcon,
  sxLink,
  sxLogo,
  sxToolbar,
  sxAppBar,
  sxIconButtonMobile,
} from './styles'
import {
  AccountCircle,
  Brightness4,
  Brightness5,
  Dashboard,
  Menu,
  Search,
} from '@mui/icons-material'
import Image from 'next/image'
import { useColorMode } from 'providers/theme'
import ninja from '../../../public/main/ninja-logo.png'

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { mode, toggleColorMode } = useColorMode()
  const { data: session } = useSession()

  const handleDrawer = (): void => {
    setIsOpen((state) => !state)
  }

  const handleSignOut = async (): Promise<void> => {
    signOut({ callbackUrl: '/' })
  }

  const handleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark'
    toggleColorMode(null as any, newMode)
  }

  return (
    <>
      <SettingsDrawer isOpen={isOpen} handleDrawer={handleDrawer} />
      <AppBar sx={sxAppBar}>
        <Container maxWidth='lg'>
          <Toolbar sx={sxToolbar}>
            <Box sx={sxLogo}>
              <Tooltip title='home'>
                <Link href='/' style={sxLink}>
                  <Image
                    src={ninja}
                    alt='logo'
                    height='50'
                    width='150'
                    priority
                  />
                </Link>
              </Tooltip>
            </Box>
            <Stack spacing={1} direction='row'>
              <Link href='/courts'>
                <Tooltip title='Search for venues'>
                  <IconButton color='primary' sx={sxIconButton}>
                    <Search sx={sxIcon} />
                  </IconButton>
                </Tooltip>
              </Link>
              {!!session ? (
                <>
                  <Link href='/dashboard'>
                    <Tooltip title='Dashboard'>
                      <IconButton sx={sxIconButton} color='primary'>
                        <Dashboard sx={sxIcon} />
                      </IconButton>
                    </Tooltip>
                  </Link>

                  <Link href='/profile'>
                    <Tooltip title='Profile'>
                      <IconButton sx={sxIconButton} color='primary'>
                        <AccountCircle sx={sxIcon} />
                      </IconButton>
                    </Tooltip>
                  </Link>

                  <Tooltip title='Sign out'>
                    <IconButton
                      onClick={handleSignOut}
                      color='primary'
                      sx={sxIconButton}
                    >
                      <LogoutIcon sx={sxIcon} />
                    </IconButton>
                  </Tooltip>
                </>
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

              <Tooltip title='Switch theme'>
                <IconButton
                  color='primary'
                  sx={sxIconButton}
                  onClick={handleColorMode}
                >
                  {mode === 'light' ? (
                    <Brightness4 sx={sxIcon} />
                  ) : (
                    <Brightness5 sx={sxIcon} />
                  )}
                </IconButton>
              </Tooltip>

              <Tooltip title='Settings'>
                <IconButton
                  color='primary'
                  sx={sxIconButtonMobile}
                  onClick={handleDrawer}
                >
                  <Menu sx={sxIcon} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}
