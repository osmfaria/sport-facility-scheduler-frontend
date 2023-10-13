import { SxProps } from '@mui/material'

export const sxContainer: SxProps = {
  marginTop: '200px',
  position: 'relative',
  overflow: 'hidden',
}

export const sxSpan: SxProps = {
  background: 'linear-gradient(to right, #ee0979, #ff6a00)',

  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',

  color: 'transparent',
  WebkitTextFillColor: 'transparent',
}

export const sxImageWrapper = {
  margin: '40px auto',
  maxWidth: '800px',
  position: 'relative',
  aspectRatio: '1.36/1',
  WebkitMask: 'url("/paint6.svg")',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'top',
  WebkitMaskSize: '90%',
  overflow: 'visible',
}

export const sxTitle: SxProps = {
  fontVariant: 'h1',
  margin: '40px 0',
  textAlign: 'start',
  fontSize: { xs: '30px', md: '50px' },
}
