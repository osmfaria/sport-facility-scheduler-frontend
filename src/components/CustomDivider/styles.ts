import { Theme } from '@mui/material'

export const sxDivider = (theme: Theme) => ({
  border: '1px dashed #d3d3d3',
  '&:before': {
    content: '""',
    position: 'absolute',
    maxHeight: '4px',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: `linear-gradient(to right, ${theme.palette.background.default} 0%, transparent 50%, ${theme.palette.background.default} 100%)`,
    zIndex: 0,
  },
})
