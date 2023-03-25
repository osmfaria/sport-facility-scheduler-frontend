import { Box, Button, Container, styled, useTheme } from '@mui/material'
import { childrenProp } from 'interfaces/utilityInterface'
import { useState } from 'react'
import FilterDrawer from './FilterDrawer'
import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }: childrenProp) => {
  const theme = useTheme()
  const [open, setOpen] = useState<boolean>(false)
  const handleFilterDrawer = () => {
    setOpen(!open)
  }

const drawerWidth = 250

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}))

  return (
    <Box sx={{ display: 'flex' }}>
      <Main
        // sx={{
        //   margin: '0 auto',
        //   display: 'flex',
        //   flexDirection: 'column',
        //   justifyContent: 'space-between',
        //   backgroundColor: theme.palette.background.default,
        // }}
        open={open}
      >
        {/* <Header /> */}
        <Container maxWidth='lg' sx={{ minHeight: 'calc(100vh - 149px)' }}>
          {children}
        </Container>
        <Button onClick={handleFilterDrawer}>Open</Button>
        <Footer />
      </Main>

      <FilterDrawer handleDrawer={handleFilterDrawer} isOpen={open} />
    </Box>
  )
}

export default Layout
