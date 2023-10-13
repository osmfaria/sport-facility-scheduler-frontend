import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { sxAvatar, sxBox } from './styles'
import { AddCircleOutline, DomainDisabledOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'

const NoFacilityCard = () => {
  const router = useRouter()

  return (
    <Box sx={sxBox}>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='center'
        spacing={2}
      >
        <Avatar sx={sxAvatar}>
          <DomainDisabledOutlined />
        </Avatar>
        <Divider orientation='vertical' flexItem />
        <Box>
          <Typography variant='body1' gutterBottom fontSize='20px'>
            No facility found
          </Typography>

          <Stack direction='row' alignItems='center'>
            <Typography variant='body2' color='GrayText'>
              You can add facilities here
            </Typography>
            <IconButton
              color='success'
              onClick={() =>
                router.push('/dashboard/facilitymanager/newfacility')
              }
            >
              <AddCircleOutline />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default NoFacilityCard
