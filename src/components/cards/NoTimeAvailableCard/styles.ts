import { SxProps, Theme } from '@mui/material'

export const sxBox: SxProps = {
  height: '100%',
  margin: { xs: '50px auto 0', sm: '100px auto 0' },
}

export const sxAvatar = (theme: Theme) => ({
  borderRadius: '8px',
  background: theme.palette.grey[100],
  border: `1px solid ${theme.palette.grey[300]}`,
  color: theme.palette.grey[600],
})
