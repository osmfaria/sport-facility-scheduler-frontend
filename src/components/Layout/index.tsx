import { Box } from '@mui/material'
import { childrenProp } from 'interfaces/utilityInterface'
import Footer from '../Footer'
import Header from '../Header'
import { sxBox, sxBoxMain } from './styles'

const Layout = ({ children }: childrenProp) => {
  return (
    <Box sx={sxBox}>
      <Header />
      <Box sx={sxBoxMain}>{children}</Box>
      <Footer />
    </Box>
  )
}

export default Layout
