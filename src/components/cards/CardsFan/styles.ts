import { Theme } from '@mui/material'

type BoxContainerStylesFn = (theme: Theme) => Record<string, any>

export const sxContainer: BoxContainerStylesFn = (theme) => ({
  position: 'relative',
  width: '300px',
  height: '400px',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
})

export const sxBox = (angle: string, index: number) => ({
  position: 'absolute',
  transform: `rotate(${angle}deg)`,
  transformOrigin: 'right bottom',
  zIndex: index,
  left: 0,
  bottom: 0,
})
