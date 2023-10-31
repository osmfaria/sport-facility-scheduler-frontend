import { SxProps, Theme } from '@mui/material'

export const sxImageWrapper: SxProps = {
  position: 'relative',
  height: { xs: '100px', md: '200px' },
  width: { xs: '100px', md: '200px' },
  border: '2px solid white',
  borderRadius: '100%',
  margin: '10px 15px',
  overflow: 'hidden',
  '& img': {
    objectFit: 'cover',
  },
}

export const sxDetialWrapper: SxProps = {
  position: 'relative',
  height: { xs: '30px', md: '65px' },
  width: { xs: '30px', md: '65px' },
}

export const sxCard = (theme: Theme) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  padding: { xs: '10px', md: '20px' },
  minHeight: { xs: '400px', md: 'auto' },
  boxShadow:
    '1px 1px 0px #000, 2px 2px 0px #000,3px 3px 0px #000, 4px 4px 0px #000, 5px 5px 0px #000,6px 6px 0px #000',
})
