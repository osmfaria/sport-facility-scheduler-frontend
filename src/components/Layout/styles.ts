import { SxProps, Theme } from '@mui/material'

export const sxBox = (route: string) => (theme: Theme) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background:
    route === '/' ? theme.palette.background.default : 'url("/blurry-bg.svg")',
  backgroundSize: 'cover',
})

export const sxBoxMain: SxProps = {
  marginTop: '74px',
  minHeight: 'calc(100vh - 159px)',
}
