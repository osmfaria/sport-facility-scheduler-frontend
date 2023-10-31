import { SxProps, Theme } from '@mui/material'

export const sxSkeletonBox: SxProps = { width: { xs: '100%', md: '500px' } }
export const sxSkeletonText: SxProps = { margin: '3px 0 0 14px' }
export const sxFormControl: SxProps = { width: { xs: '100%', md: '500px' } }
export const sxDivider = (theme: Theme) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  borderRadius: '30px',
  boxShadow: 1,
})
export const sxIcon: SxProps = { marginRight: '5px' }
export const sxContainer: SxProps = { marginTop: '40px' }
export const SxSkeletonChip: SxProps = {
  borderRadius: '30px',
  margin: '20px 0',
}
export const SxLodadingBox: SxProps = { width: '100%', marginTop: 5 }
export const sxButton = (theme: Theme) => ({
  flex: '1 1 50%',
})
