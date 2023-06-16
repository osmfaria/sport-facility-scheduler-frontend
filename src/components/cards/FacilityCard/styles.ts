import { SxProps, Theme } from '@mui/material'

export const sxAvatar = (theme: Theme) => ({
  borderRadius: '8px',
  background: theme.palette.grey[100],
  border: `1px solid ${theme.palette.grey[300]}`,
  color: theme.palette.grey[600],
})

export const sxBox = (theme: Theme) => ({
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paper,
  margin: 'auto',
  borderRadius: '8px',
  padding: '20px'
})

export const sxStack: SxProps = {
  borderRadius: '58px',
  background: 'linear-gradient(to right, #ee0979, #ff6a00)',
}

export const sxList: SxProps = { maxWidth: 'fit-content'}


