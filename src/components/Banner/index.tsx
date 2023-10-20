import { Box, Button, Theme, Typography } from '@mui/material'
import { boxStyles, sxButton, sxTypographyTitle } from './styles'
import { useRouter } from 'next/router'
import { Map } from '@mui/icons-material'
import CustomTextAnimation from '../customAnimations/CustomTextAnimation'
import CustomSlideAnimation from '../customAnimations/CustomSlideAnimation'
import Image from 'next/image'

function Banner() {
  const router = useRouter()

  return (
    <Box sx={boxStyles}>
      <Image
        className='bgimage'
        src='/main/sports-small.jpg'
        alt='Sports examples'
        fill
        sizes='100vw'
        priority
      />
      <Box
        textAlign='center'
        margin={{ xs: '15px auto', md: '60px auto' }}
        minHeight='350px'
        overflow='hidden'
      >
        <CustomTextAnimation
          text='Discover. Book. Play.'
          sx={sxTypographyTitle}
          speed={0.3}
        />
        <CustomSlideAnimation direction='left'>
          <Typography
            fontSize={{ xs: '18px', sm: '22px' }}
            fontWeight={600}
            color={(theme: Theme) => theme.palette.grey[300]}
            marginTop='30px'
            maxWidth='650px'
          >
            Uniting communities through sports. Unleash your inner athlete: Find
            top sports facilities and book your next challange.
          </Typography>
        </CustomSlideAnimation>
        <CustomSlideAnimation direction='right'>
          <Button
            variant='contained'
            sx={sxButton}
            onClick={() => router.push('/courts')}
            startIcon={<Map />}
          >
            Find Venues
          </Button>
        </CustomSlideAnimation>
      </Box>
    </Box>
  )
}

export default Banner
