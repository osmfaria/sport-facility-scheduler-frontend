import { SxProps, Theme } from '@mui/material'

export const sxContainer: SxProps = {
  position: 'relative',
  overflow: 'visible',
  minHeight: '100vh',
}

export const sxSpan = (theme: Theme) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,

  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',

  color: 'transparent',
  WebkitTextFillColor: 'transparent',
})
