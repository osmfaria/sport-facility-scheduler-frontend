import { SxProps, Theme } from '@mui/material'

export const sxContainer: SxProps = {
  position: 'relative',
  overflow: 'visible',
  minHeight: '100vh',
}

export const sxSpan = (theme: Theme) => ({
  color: theme.palette.primary.main,
})
