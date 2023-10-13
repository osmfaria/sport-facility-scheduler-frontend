import { Box, Divider, LinearProgress, Skeleton, Stack } from '@mui/material'
import {
  sxSkeletonBox,
  sxSkeletonText,
  SxSkeletonChip,
  SxLodadingBox,
} from './styles'

function CourtManagerSkeleton() {
  return (
    <>
      <Skeleton variant='rectangular' height='28px' width='400px' />
      <Box m='44px 0'>
        <Skeleton variant='rectangular' height={'56px'} sx={sxSkeletonBox} />
        <Skeleton
          variant='rectangular'
          width={'200px'}
          height={'20px'}
          sx={sxSkeletonText}
        />
      </Box>
      <Stack direction='row' spacing={2}>
        <Skeleton variant='rounded' width={'143.5px'} height={'36.5px'} />
        <Skeleton variant='rounded' width={'168.38px'} height={'36.5px'} />
      </Stack>
      <Divider>
        <Skeleton
          height={'30px'}
          width={'127.67px'}
          variant='rectangular'
          sx={SxSkeletonChip}
        />
      </Divider>
      <Box sx={SxLodadingBox}>
        <LinearProgress />
      </Box>
    </>
  )
}

export default CourtManagerSkeleton
