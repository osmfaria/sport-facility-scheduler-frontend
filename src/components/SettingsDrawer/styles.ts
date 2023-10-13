import { PaperProps, SxProps } from '@mui/material'

export const sxPaper: Partial<PaperProps> = {
  sx: {
    borderRadius: '10px 0 0 10px',
  },
}

export const sxBoxMain: SxProps = { width: '250px' }

export const sxBox: SxProps = {
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 10px',
}

export const sxStack: SxProps = { padding: '0 10px' }

export const sxToggleButton: SxProps = { flexGrow: '1' }

export const sxListText: SxProps = {
  width: '140px',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  display: 'inline-block',
}

export const sxLink = { textDecoration: 'none', color: 'inherit' }
