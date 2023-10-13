import { Theme, SxProps } from '@mui/material'

export const sxButton: SxProps = {
  flexGrow: 1,
  width: { xs: '100%', md: '50%' },
}

export const sxBackgroundColor = (theme: Theme) => ({
  background: theme.palette.background.paper,
  paddingTop: '200px',
})

export const boxStyles = (theme: Theme) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  ...sxBackgroundColor(theme),
})

export const avatarStyles = (theme: Theme) => ({
  borderRadius: '8px',
  background: theme.palette.grey[100],
  border: `1px solid ${theme.palette.grey[300]}`,
  color: theme.palette.grey[600],
  position: 'relative',
  overflow: 'visible',
  '&:before': {
    content: '""',
    zIndex: -1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'linear-gradient(to right, #ee0979, #ff6a00)',
    transform: 'scale(0.95)',
    filter: 'blur(5px)',
    opacity: '0.7',
    transition: 'opacity 0.3s',
  },
})

export const sxImageWrapper: SxProps = {
  position: 'relative',
  width: '100vw',
  maxWidth: '350px',
  aspectRatio: '1/1',
}

export const sxSpanRose: SxProps = {
  background: 'linear-gradient(to right, #EC6EAD, #3494E6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}
export const sxSpanGreen: SxProps = {
  background: 'linear-gradient(to right, #67B26F, #4ca2cd)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

export const sxCard: SxProps = {
  padding: '12px 14px',
  WebkitBackdropFilter: 'blur(5px)',
  backdropFilter: 'blur(5px)',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
}

export const sxBoxWrapper = (theme: Theme) => ({
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

export const sxSectionsWrapper = (theme: Theme) => ({
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
