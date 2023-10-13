import { Box } from '@mui/material'
import { childrenProp } from 'interfaces/utilityInterface'
import Footer from '../Footer'
import Header from '../Header'
import { sxBox, sxBoxMain } from './styles'
import { useRouter } from 'next/router'

const Layout = ({ children }: childrenProp) => {
  const router = useRouter()
  const route = router.pathname

  return (
    <Box sx={sxBox(route)}>
      <Header />
      <Box sx={sxBoxMain}>{children}</Box>
      <Footer />
    </Box>
  )
}

export default Layout
