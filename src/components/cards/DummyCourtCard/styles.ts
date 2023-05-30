import { SxProps } from '@mui/material'

export const sxCard: SxProps = {
  width: '280px',
  overflow: 'hidden',
  boxShadow:
    'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
}

export const sxCardHeader: SxProps = {
  '& .MuiCardHeader-title, & .MuiCardHeader-subheader': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '220px',
  },
}

export const sxDivider: SxProps = { margin: '0 16px' }

export const sxCardAction: SxProps = {
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '8px 16px',
}
