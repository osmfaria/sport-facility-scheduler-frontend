import { Box, Container, useTheme } from '@mui/material'
import { childrenProp } from 'interfaces/utilityInterface'
import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }: childrenProp) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Header />
      <Container maxWidth='lg' sx={{ minHeight: 'calc(100vh - 149px)' }}>
        {children}
      </Container>
      <Footer />
    </Box>
  )
}

export default Layout
