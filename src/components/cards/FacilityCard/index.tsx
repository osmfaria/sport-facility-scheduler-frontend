import { Email, LocalPhone, Map, Stadium } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { sxAvatar, sxBox, sxContent, sxImage, sxList, sxStack } from './styles'
import { useFacility } from 'providers/FacilityProvider'
import Image from 'next/image'

const FacilityCard = () => {
  const { facility, addressString } = useFacility()

  return (
    <Box sx={sxBox} maxWidth='lg'>
      <Stack
        direction='row'
        alignItems='center'
        height='58px'
        maxWidth='fit-content'
        padding='8px 16px 8px 8px'
        spacing={1}
        color='Background'
        sx={sxStack}
        m='auto'
      >
        <Avatar>
          <Stadium />
        </Avatar>
        <Typography variant='h6' fontWeight='600'>
          {facility!.name}
        </Typography>
      </Stack>

      <Box sx={sxContent}>
        <List sx={sxList}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={sxAvatar}>
                <Map />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={addressString} />
          </ListItem>
          <Divider component='li' variant='inset' />
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={sxAvatar}>
                <LocalPhone />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={facility!.phone_number} />
          </ListItem>
          <Divider component='li' variant='inset' />
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={sxAvatar}>
                <Email />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={facility!.email} />
          </ListItem>
        </List>
      </Box>

      {/* <Box sx={sxImage}>
        <Image
          src='/sports.jpg'
          alt='Facility Background'
          fill
          style={{ objectFit:  'cover', borderRadius: '0 8px 8px 0'}}
        />
      </Box> */}
    </Box>
  )
}

const FacilityCardSkeleton = () => {
  return <Skeleton variant='rounded' width='100%' height='286px' />
}

export { FacilityCard, FacilityCardSkeleton }
