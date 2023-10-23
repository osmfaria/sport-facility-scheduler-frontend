import { SxProps, Theme } from '@mui/material'

export const sxAppBar: SxProps = {
  marginTop: '10px',
  background: 'transparent',
  boxShadow: 'none',
  zIndex: 5,
}

export const sxToolbar: SxProps = {
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '16px',
  boxShadow: 2,
  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
  height: '64px',
}

export const sxLogo: SxProps = {
  flexGrow: 1,
  height: '100%',
  display: 'flex',
  maxHeight: '50px',
}

export const sxLink = {
  textDecoration: 'none',
  color: 'inherit',
}

const IconButtonStyles = (theme: Theme) => ({
  borderRadius: '10px',
})

export const sxIconButton = (theme: Theme) => ({
  ...IconButtonStyles(theme),
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
})

export const sxIconButtonMobile = (theme: Theme) => ({
  ...IconButtonStyles(theme),
  display: 'inherit',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
})

export const sxIcon: SxProps = { height: '20px', width: '20px' }
