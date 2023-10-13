import { SxProps, Theme } from '@mui/material'

export const sxLine: SxProps = {
  display: 'block',
  width: '60px',
  height: '3px',
  paddingRight: '1px',
  gap: 1,
  background: `linear-gradient(to right, #ee0979 , #ff6a00)`,
  borderRadius: '1.5px',
}

export const sxIconButton: SxProps = {
  transition: ' color 1s, background 1s',
  color: '#333333',
  background: 'transparent',
  '&:hover': {
    background: 'linear-gradient(to right, #ee0979 , #ff6a00)',
    color: 'white',
  },
}

export const sxBox = {
  float: 'right',
}
