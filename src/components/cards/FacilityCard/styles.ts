import { SxProps, Theme } from '@mui/material'

export const sxAvatar = (theme: Theme) => ({
  borderRadius: '8px',
  color: 'white',
})

export const sxBox = (theme: Theme) => ({
  margin: 'auto',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: 3,
  backgroundImage: 'url("/secondary/sport-facility.webp")',
  backgroundSize: 'cover',
  backgroundPosition: '100%',
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  overflow: 'clip',
  '&:: before': {
    content: '""',
    background: `linear-gradient(296.95deg, ${theme.palette.background.paper} 50%, rgba(35,35,46, 0.35) 99.96%)`,
    transform: 'matrix(-1,0,0,1,0,0)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    display: 'block',
    width: '102%',
    height: '102%',
    borderRadius: '8px',
  },
})

export const sxStack = (theme: Theme) => ({
  borderRadius: '58px',
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
})

export const sxList: SxProps = { maxWidth: 'fit-content' }
