import { SxProps, Theme } from '@mui/material'

export const sxContainer: SxProps = {
  position: 'relative',
}

export const sxTypographyTitle: SxProps = {
  color: 'white',
  fontSize: { xs: '40px', md: '70px' },
}

export const sxBackgroundColor = (theme: Theme) => ({
  background: theme.palette.background.paper,
})

export const boxStyles: SxProps = {
  padding: '0 16px',
  minHeight: '100vh',
  paddingTop: '40px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(main/sports-small.webp)`,
  backgroundSize: 'cover',
  backgroundPosition: 'top-center',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    background:
      'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3))',
  },
  '& > *': {
    position: 'relative',
    zIndex: 10,
  },
}

export const sxButton: SxProps = {
  flexGrow: 1,
  marginTop: '60px',
  width: { xs: '100%', md: '50%' },
}
