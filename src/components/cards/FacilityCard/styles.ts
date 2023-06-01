import { SxProps, Theme } from '@mui/material'

const path = '../../../../public/phone-booking.png'

export const sxAvatar = (theme: Theme) => ({
  borderRadius: '8px',
  background: theme.palette.grey[100],
  border: `1px solid ${theme.palette.grey[300]}`,
  color: theme.palette.grey[600],
})

export const sxBox = (theme: Theme) => ({
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paper,
  margin: 'auto',
  borderRadius: '8px',
  position: 'relative',
  display: 'flex',
  // [theme.breakpoints.down('sm')]: {
  //   flexDirection: 'column',
  //   height: '500px'
  // },

  // '&::before': {
  //   [theme.breakpoints.down('sm')]: {
  //     width: '120%',
  //     height: '40%',
  //     top: '-5em',
  //     left: '50%',
  //     transform: 'translateX(-50%) rotate(10deg)'
  //   },
  // },
})

export const sxStack: SxProps = {
  boxShadow: 1,
  borderRadius: '58px',
  background: 'linear-gradient(to right, #ee0979, #ff6a00)',
  position: 'absolute',
  top: '5%',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  zIndex: '2',
}

export const sxList: SxProps = { maxWidth: 'fit-content', padding: '70px 0 10px 20px' }

export const sxSection = {}

export const sxContent = (theme: Theme) => ({
  width: '45%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
})

export const sxImage = (theme: Theme) => ({
  width: '55%',
  position: 'relative',
  overflow: 'hidden',

  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    left: '-180px',
    top: '40%',
    transform: 'translateY(-50%) rotate(20deg)',
    background: `${theme.palette.background.paper}`,
    width: '40%',
    height: '140%',
    zIndex: '1',
    [theme.breakpoints.down('sm')]: {
      width: '120%',
      height: '40%',
      top: '-5em',
      left: '50%',
      transform: 'translateX(-50%) rotate(10deg)',
    },
  },
})
