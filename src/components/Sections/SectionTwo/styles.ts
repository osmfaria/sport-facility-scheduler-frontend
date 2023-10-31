import { SxProps, Theme } from '@mui/material'
import { convertToObject } from 'typescript'

export const sxContainer: SxProps = {
  position: 'relative',
  overflow: 'hidden',
}

export const sxSpan = (theme: Theme) => ({
  color: theme.palette.primary.main,
})

export const sxImageWrapper = {
  position: 'relative',
  aspectRatio: '1/1',
  maxWidth: '400px',
  margin: 'auto',
}
