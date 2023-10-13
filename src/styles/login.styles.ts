import { SxProps, Theme } from '@mui/material'

export const sxContainer: SxProps = {
  paddingTop: 10,
}

export const sxBox: SxProps = {
  boxShadow: 1,
  borderRadius: 1,
  padding: '20px 40px 50px',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  maxWidth: '400px',
  margin: 'auto',
}

export const sxAvatar = (theme: Theme) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.main} , ${theme.palette.secondary.main})`,
  margin: '-50px auto',
  marginBottom: 2,
  width: '65px',
  height: '65px',
  boxShadow: 2,
  color: '#fff',
})
