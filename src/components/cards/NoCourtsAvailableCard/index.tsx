import { Avatar, Box, Divider, Stack, Typography } from '@mui/material'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import { sxAvatar, sxBox } from './styles'

const NoCourtsAvailableCard = () => {
  return (
    <Box sx={sxBox}>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='center'
        spacing={2}
      >
        <Avatar sx={sxAvatar}>
          <EventBusyIcon />
        </Avatar>
        <Divider orientation='vertical' flexItem />
        <Box>
          <Typography variant='body1' gutterBottom fontSize='20px'>
            No sports venues found
          </Typography>

          <Typography variant='body2' color='GrayText'>
            Please try another date or explore a different location
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}

export default NoCourtsAvailableCard
