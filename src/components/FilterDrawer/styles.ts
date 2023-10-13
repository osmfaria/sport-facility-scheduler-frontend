import { PaperProps, SxProps } from '@mui/material'

export const sxPaper: Partial<PaperProps> = {
  sx: { borderRadius: '0 10px 10px 0' },
}

export const sxBox: SxProps = {
  height: '64px',
  lineHeight: '64px',
  padding: '0 10px',
  textAlign: 'right',
}

export const sxStack: SxProps = {
  padding: '15px 10px',
}

export const sxBoxItem: SxProps = { display: 'flex', gap: 1 }
