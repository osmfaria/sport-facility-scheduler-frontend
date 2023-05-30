import { SxProps, Theme } from '@mui/material'

export const sxBox = { zIndex: 10, paddingBottom: '64px' }

export const sxAppBar: SxProps = {
  background: 'rgba(255, 255, 255, 0.03)',
  boxShadow: 'none',
  WebkitBackdropFilter: 'blur(5px)',
  backdropFilter: 'blur(5px)',
  color: 'inherit',
}

export const sxLogo: SxProps = {
  fontFamily: "'Poppins', sans-serif",
  fontSize: { xs: '1.3rem', sm: '1.5rem' },
  fontWeight: 'bold',
  background: 'linear-gradient(90deg, #C33764, #1D2671)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  padding: '5px 10px',
  borderRadius: '5px',
  flexGrow: 1,
}

export const sxLink = {
  textDecoration: 'none',
  color: 'inherit',
}

export const sxIconButton = (theme: Theme) => ({
  borderRadius: '10px',
  border: `1px solid  ${theme.palette.divider}`,
})

export const sxIcon: SxProps = { height: '20px', width: '20px' }
