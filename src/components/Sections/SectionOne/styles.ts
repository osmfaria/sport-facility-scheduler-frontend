import { SxProps, Theme } from '@mui/material'

export const sxBoxWrapper = (theme: Theme) => ({
  overflow: 'visible',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%23808080' fill-opacity='0.12'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E")`,
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: `linear-gradient(to bottom, ${theme.palette.background.default} 0%, transparent 50%, ${theme.palette.background.default} 100%)`,
    zIndex: 0,
  },
})

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
