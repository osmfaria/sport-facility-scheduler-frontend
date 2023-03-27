import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LoginIcon from '@mui/icons-material/Login'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import { Box, Container, Divider, styled, Tooltip } from '@mui/material'
import { Stack } from '@mui/system'
import { useState } from 'react'
import SettingsDrawer from './SettingsDrawer'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Header() {
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    boxShadow: 'none',
    WebkitBackdropFilter: 'blur(5px)',
    backdropFilter: 'blur(5px)',
    color: 'inherit',
  }

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleDrawer = (): void => {
    setIsOpen((state) => !state)
  }
  const { data: session } = useSession()

  const handleSignOut = async (): Promise<void> => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <Box sx={{ zIndex: 10, paddingBottom: '64px' }} position='sticky'>
      <SettingsDrawer isOpen={isOpen} handleDrawer={handleDrawer} />
      <AppBar sx={glassStyle}>
        <Container maxWidth='lg'>
          <Toolbar>
            <Typography
              variant='h6'
              color='primary'
              component='div'
              sx={{ flexGrow: 1 }}
            >
              <Link
                href='/'
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Court-Scheduler
              </Link>
            </Typography>
            <Stack spacing={1} direction='row'>
              {!!session ? (
                <Tooltip title='Sign out'>
                  <IconButton
                    onClick={handleSignOut}
                    color='primary'
                    sx={(theme) => ({
                      borderRadius: '10px',
                      border: `1px solid  ${theme.palette.divider}`,
                    })}
                  >
                    <LogoutIcon sx={{ height: '20px', width: '20px' }} />
                  </IconButton>
                </Tooltip>
              ) : (
                <>
                  <Tooltip title='Sign in'>
                    <Link href='/login'>
                      <IconButton
                        color='primary'
                        sx={(theme) => ({
                          borderRadius: '10px',
                          border: `1px solid  ${theme.palette.divider}`,
                        })}
                      >
                        <LoginIcon sx={{ height: '20px', width: '20px' }} />
                      </IconButton>
                    </Link>
                  </Tooltip>
                  <Tooltip title='Sign up'>
                    <Link href='/register'>
                      <IconButton
                        color='primary'
                        sx={(theme) => ({
                          borderRadius: '10px',
                          border: `1px solid  ${theme.palette.divider}`,
                        })}
                      >
                        <HowToRegIcon sx={{ height: '20px', width: '20px' }} />
                      </IconButton>
                    </Link>
                  </Tooltip>
                </>
              )}

              <Tooltip title='Settings'>
                <IconButton
                  color='primary'
                  sx={(theme) => ({
                    borderRadius: '10px',
                    border: `1px solid  ${theme.palette.divider}`,
                  })}
                  onClick={handleDrawer}
                >
                  <SettingsIcon sx={{ height: '20px', width: '20px' }} />
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
