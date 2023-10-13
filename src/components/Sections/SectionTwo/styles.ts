import { SxProps, Theme } from '@mui/material'

export const sxContainer: SxProps = {
  position: 'relative',
  overflow: 'hidden',
}

export const sxSpan = (theme: Theme) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,

  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',

  color: 'transparent',
  WebkitTextFillColor: 'transparent',
})

export const sxImageWrapper = {
  position: 'relative',
  aspectRatio: '1/1',
  maxWidth: '400px',
  margin: 'auto',
}
