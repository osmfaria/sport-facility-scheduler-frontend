import { Avatar, Divider, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { sxAvatar, sxBox } from './styles'
import { EventBusy } from '@mui/icons-material'

const NoTimeAvailableCard = () => {
  return (
    <Box sx={sxBox}>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='center'
        spacing={2}
      >
        <Avatar sx={sxAvatar}>
          <EventBusy />
        </Avatar>
        <Divider orientation='vertical' flexItem />
        <Box>
          <Typography variant='body1' gutterBottom fontSize='20px'>
            Unavailable on this date
          </Typography>

          <Typography variant='body2' color='GrayText'>
            Explore alternative dates
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}

export default NoTimeAvailableCard
