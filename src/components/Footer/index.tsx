import { GitHub, Home, LinkedIn } from '@mui/icons-material'
import {
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { Container } from '@mui/system'
import Link from 'next/link'
import { ReactElement } from 'react'
import { sxContainer, sxTypography } from './styles'

const Footer = (): ReactElement => {
  const currentYear = new Date().getFullYear()
  const isMobile = useMediaQuery('(max-width: 600px')

  return (
    <Container maxWidth='lg' sx={sxContainer} disableGutters>
      <Divider />
      <Toolbar>
        <Typography variant='caption' component='div' sx={sxTypography}>
          &#xa9; {currentYear} - Made with ❤️ by Osmar
        </Typography>
        <Stack direction='row' spacing={isMobile ? 0 : 2}>
          <Link
            href='https://github.com/osmfaria/sport-facility-scheduler-frontend'
            target='_blank'
          >
            <IconButton>
              <GitHub />
            </IconButton>
          </Link>
          <Link href='https://www.linkedin.com/in/osmar-faria/' target='_blank'>
            <IconButton>
              <LinkedIn />
            </IconButton>
          </Link>
          <Link href='/'>
            <IconButton>
              <Home />
            </IconButton>
          </Link>
        </Stack>
      </Toolbar>
    </Container>
  )
}

export default Footer
