import { SxProps, Theme } from '@mui/material'

export const sxLine = (theme: Theme) => ({
  display: 'block',
  width: '1px',
  height: '100px',
  paddingRight: '1px',
  gap: 1,
  background: `linear-gradient(to bottom, #fff , ${theme.palette.primary.main})`,
})

export const sxCircle = (theme: Theme) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '40px',
  width: '40px',
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  borderRadius: '50%',
  color: '#fff',
  fontWeight: 600,
})
