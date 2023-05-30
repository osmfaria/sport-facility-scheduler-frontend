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
}

export const sxAvatar: SxProps = {
  background: 'linear-gradient(to right, #3494E6, #EC6EAD)',
  margin: '-60px auto',
  marginBottom: 2,
  width: '80px',
  height: '80px',
  boxShadow: 8,
}

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
