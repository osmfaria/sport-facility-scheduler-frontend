import { SxProps, Theme } from '@mui/material'

export const sxContainer: SxProps = { marginTop: '40px' }

export const sxCard = (theme: Theme) => ({
  position: 'relative',
  overflow: 'visible',
  cursor: 'pointer',
  background: 'rgba(255, 255, 255, 0.2)',
  minHeight: '216px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'space-between',
  '&:hover': {
    boxShadow: 3,
  },
  '&:hover .icon': {
    opacity: 1,
    transform: 'translateY(0)',
  },
})

export const sxGridContainer: SxProps = { marginTop: '20px' }

export const sxCardAction: SxProps = {
  display: 'flex',
  justifyContent: 'flex-end',
}

export const sxAvatar = (theme: Theme): any => ({
  borderRadius: '8px',
  background: theme.palette.grey[100],
  border: `1px solid ${theme.palette.grey[300]}`,
  color: theme.palette.grey[600],
})

export const sxIconButton = (theme: Theme) => ({
  background: theme.palette.divider,
  opacity: 0,
  transform: 'translateY(10px)',
  transition: 'opacity 0.3s, transform 0.3s',
  position: 'absolute',
  top: '-20px',
  right: '10px',
})

export const sxBox = (theme: Theme) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: '3px 5px',
  borderRadius: '4px',
  background: theme.palette.background.paper,
})
