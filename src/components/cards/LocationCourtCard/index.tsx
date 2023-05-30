import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material'
import { useFacility } from 'providers/FacilityProvider'
import { FmdGood } from '@mui/icons-material'
import { sxCard } from './styles'
import styles from '../../../styles/Location.module.css'

const LocationCourtCard = () => {
  const { addressString, address } = useFacility()
  const { number, street, city, state } = address!

  const imageSrc = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_EMBEDDED_MAPS_KEY}&q=${number}+${street},${city}+${state}`

  return (
    <Card sx={sxCard}>
      <CardHeader title='Directions' />
      <iframe
        className={styles.iframe}
        width='100%'
        height='200px'
        loading='lazy'
        src={imageSrc}
      ></iframe>
      <CardContent>
        <Stack direction='row' alignItems='center' spacing={1}>
          <Avatar>
            <FmdGood />
          </Avatar>
          <Typography variant='body1'>{addressString}</Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default LocationCourtCard
