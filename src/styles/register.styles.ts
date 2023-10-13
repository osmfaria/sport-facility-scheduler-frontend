import { SxProps, Theme } from '@mui/material'

export const sxContainer: SxProps = {
  paddingTop: 10,
}

export const sxBox: SxProps = {
  boxShadow: 1,
  borderRadius: 1,
  padding: { xs: '10px 10px 20px', md: '20px 40px 50px' },
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  minHeight: '520px',
}

export const sxAvatar = (theme: Theme) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  margin: '-50px auto',
  marginBottom: 2,
  width: '65px',
  height: '65px',
  boxShadow: 8,
  color: '#fff',
})

export const sxButton: SxProps = {
  flexGrow: 1,
  maxWidth: '50%',
}

export const sxLoadingButton: SxProps = { marginTop: 7, width: '100%' }

export const sxIcon: SxProps = { marginRight: 1 }

export const sxSpan = (theme: Theme) => ({
  marginLeft: '4px',
  color: theme.palette.primary.main,
})
