import { SxProps } from '@mui/material'

export const sxLine = (firstColor: string): SxProps => ({
  display: 'block',
  width: '1px',
  height: '100px',
  paddingRight: '1px',
  gap: 1,
  background: `linear-gradient(to bottom, #fff , ${firstColor})`,
})

export const sxCircle = (firstColor: string, secondColor: string): SxProps => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '40px',
  width: '40px',
  background: `linear-gradient(to right, ${firstColor}, ${secondColor})`,
  borderRadius: '50%',
  color: '#fff',
  fontWeight: 600,
})
