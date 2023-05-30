import { Theme, SxProps } from '@mui/material'
import { keyframes } from '@emotion/react'

const colorChangeKeyframes = keyframes`
  0% {
    color: black;
  }
  50% {
    color: transparent;
    -webkit-text-fill-color: 'transparent';
  }
  100% {
    color: black;
  }
`

const sxTransparentText: SxProps = {
  WebkitBackgroundClip: 'text',
  fontWeight: 800,
  fontSize: { xs: '70px', md: '96px' },
}

export const typographyDiscover: SxProps = {
  background: 'linear-gradient(to right, #ee0979, #ff6a00)',
  ...sxTransparentText,
  animation: `${colorChangeKeyframes} 4s infinite`,
  animationDelay: '0s',
}

export const typographyBook: SxProps = {
  background: 'linear-gradient(to right, #3494E6 0%, #EC6EAD 50%, #3494E6)',
  ...sxTransparentText,
  animation: `${colorChangeKeyframes} 4s infinite`,
  animationDelay: '1s',
}

export const typographyPlay: SxProps = {
  background: 'linear-gradient(to right, #67B26F, #4ca2cd)',
  ...sxTransparentText,
  animation: `${colorChangeKeyframes} 4s infinite`,
  animationDelay: '2s',
}

export const buttonStyles: SxProps = {
  padding: '5px 50px',
  flowGrow: 0,
}

export const buttonStyles2: SxProps = {
  padding: '5px 80px',
  flowGrow: 0,
}

export const sxBackgroundColor = (theme: Theme) => ({
  background: theme.palette.background.paper,
})

export const boxStyles = (theme: Theme) => ({
  paddingTop: '40px',
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
})
