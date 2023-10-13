import { SxProps, Theme } from '@mui/material'

export const sxImageWrapper: SxProps = {
  position: 'relative',
  height: '200px',
  maxWidth: '300px',
  width: '100vw',
  WebkitMask: 'url("/paint4.svg")',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  WebkitMaskSize: '80%',
  overflow: 'visible',
  '& img': {
    objectFit: 'cover',
  },
}

export const sxCard = (theme: Theme) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  boxShadow:
    '1px 1px 0px #000, 2px 2px 0px #000,3px 3px 0px #000, 4px 4px 0px #000, 5px 5px 0px #000,6px 6px 0px #000',
})
