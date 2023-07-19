import { SxProps, Theme } from '@mui/material'

export const sxDivider: SxProps = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  overflow: 'hidden',
  lineHeight: 0,
  zIndex: 1,
}

export const sxSvgIcon: SxProps = {
  position: 'relative',
  display: 'block',
  width: 'calc(113% + 1.3px)',
  height: '198px',
}

export const shapeFillLight = (theme: Theme) => ({
  fill: theme.palette.background.default,
})

export const shapeFillDark = (theme: Theme) => ({
  fill: theme.palette.background.paper,
})
