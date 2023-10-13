import { SxProps, Theme } from '@mui/material'

export const sxBox: SxProps = {
  borderRadius: '30px',
  overflow: 'hidden',
  position: 'relative',
  boxShadow: 3,
  transition: 'all 200ms ease-in-out',
  cursor: 'pointer',
  '&: hover': {
    boxShadow:
      'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
    transform: 'scale(1.05)',
  },
}

export const sxImage = (imagePath: string) => ({
  background: `url("${imagePath}")`,
  backgroundSize: 'cover',
  width: '100%',
  height: '70%',
})

export const sxDescriptionBox = (theme: Theme) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  position: 'absolute',
  borderRadius: '30px',
  top: '55%',
  height: '65%',
  width: '108%',
  transform: 'skew(19deg, -9deg)',
})

export const sxDescription: SxProps = {
  position: 'absolute',
  left: '50px',
  bottom: '20%',
  paddingRight: '20px',
}

export const sxLogo: SxProps = {
  position: 'absolute',
  bottom: '24%',
  left: '20px',
  width: '140px',
  height: '140px',
}

export const sxButton: SxProps = {
  position: 'absolute',
  bottom: '7%',
  right: '0',
  paddingRight: '20px',
  color: '#fff',
}
