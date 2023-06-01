import { SxProps, Theme } from '@mui/material'

export const sxBox = (theme: Theme) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default,
})

export const sxBoxMain: SxProps = {
  minHeight: 'calc(100vh - 149px)',
}
