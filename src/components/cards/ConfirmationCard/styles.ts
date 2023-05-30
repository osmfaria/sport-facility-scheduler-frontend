import { SxProps, Theme } from '@mui/material'

export const sxCard: SxProps = {
  minHeight: '300px',
  maxWidth: '450px',
  margin: '20px auto',
  boxShadow: 5,
}

export const sxAvatar = (theme: Theme) => ({
  borderRadius: '8px',
  background: theme.palette.grey[100],
  border: `1px solid ${theme.palette.grey[300]}`,
  color: theme.palette.grey[600],
})
