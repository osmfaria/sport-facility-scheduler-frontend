import { SxProps } from '@mui/material'

export const sxCard: SxProps = {
  width: '280px',
  overflow: 'hidden',
  boxShadow:
    '0 0 0 1px rgb(0 0 0 / 7%), 0 2px 4px rgb(0 0 0 / 5%), 0 12px 24px rgb(0 0 0 / 5%);}',
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
export const sxDividerSkeleton: SxProps = { margin: '16px 16px 0' }

export const sxCardAction: SxProps = {
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '8px 16px',
}
