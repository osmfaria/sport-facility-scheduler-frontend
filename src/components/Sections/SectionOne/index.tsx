import SectionMarker from '../../Misc/SectionMarker'
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import CustomGrowAnimation from '../../customAnimations/CustomGrowAnimation'
import Portraits from '../../Portraits'
import Image from 'next/image'
import { sxContainer, sxSpan } from './styles'
import { Launch } from '@mui/icons-material'
import SportsGrid from '../../SportsGrid'
import FloatingNumbers from '../../../components/FloatingNumbers'
import { useRouter } from 'next/router'
import CustomSlideAnimation from '../../../components/customAnimations/CustomSlideAnimation'
import { Fade } from 'react-awesome-reveal'
import CustomTextAnimation from '../../../components/customAnimations/CustomTextAnimation'
import { sxTitle } from '../SectionThree/styles'

function SectionOne() {
  const router = useRouter()

  return (
    <Container maxWidth='lg' sx={sxContainer}>
      <Fade>
        <SectionMarker>1</SectionMarker>
      </Fade>
      <CustomTextAnimation
        text='Discover Sport Facilities'
        speed={0.2}
        sx={sxTitle}
      />

      <Grid
        container
        sx={{ position: 'relative', overflow: 'visible' }}
        mt='80px'
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            position: 'relative',
            overflow: 'visible',
          }}
        >
          <CustomGrowAnimation>
            <Portraits />
          </CustomGrowAnimation>
        </Grid>

        <Grid item xs={12} md={6} alignItems='center' overflow='hidden'>
          <Stack
            minHeight='450px'
            gap={{ xs: 5, md: 9 }}
            maxWidth={'450px'}
            margin='auto'
          >
            <CustomSlideAnimation direction='left'>
              <Box>
                <Typography
                  variant='h3'
                  fontSize='25px'
                  fontWeight='600'
                  mb='15px'
                >
                  Users
                </Typography>
                <Stack
                  direction='row'
                  alignItems='center'
                  spacing={1}
                  mb='12px'
                >
                  <CustomGrowAnimation>
                    <Image
                      src='/sectionIcons/location.webp'
                      alt='user'
                      height={100}
                      width={100}
                    />
                  </CustomGrowAnimation>
                  <Typography
                    m='15px 0'
                    variant='body2'
                    fontWeight='500'
                    fontSize={{ xs: '18px', sm: '20px' }}
                  >
                    Discover Great Sport Venues: Explore a
                    <Box component='span' sx={sxSpan}>
                      {' '}
                      diverse selection{' '}
                    </Box>
                    of sports facilities, from state-of-the-art gyms to
                    beautiful outdoor fields.
                  </Typography>
                </Stack>
                <Button
                  endIcon={<Launch />}
                  variant='contained'
                  sx={{ float: 'right' }}
                  onClick={() => router.push('/courts')}
                >
                  Start here
                </Button>
              </Box>
            </CustomSlideAnimation>

            <CustomSlideAnimation direction='right'>
              <Box>
                <Typography
                  variant='h3'
                  fontSize='25px'
                  fontWeight='600'
                  mb='15px'
                >
                  Business owners
                </Typography>
                <Stack
                  direction='row'
                  alignItems='center'
                  spacing={1}
                  mb='12px'
                >
                  <Image
                    src='/sectionIcons/rocket.webp'
                    alt='user icon'
                    height={100}
                    width={100}
                  />
                  <Typography
                    m='15px 0'
                    variant='body2'
                    fontWeight='500'
                    fontSize={{ xs: '18px', sm: '20px' }}
                  >
                    Register Your Facility: Are you a sports facility owner?{' '}
                    <Box component='span' sx={sxSpan}>
                      Join our platform{' '}
                    </Box>
                    and showcase your venue to a wide audience of sports
                    enthusiasts.
                  </Typography>
                </Stack>
                <Button
                  endIcon={<Launch />}
                  variant='contained'
                  sx={{ float: 'right' }}
                  onClick={() => router.push('/dashboard')}
                >
                  Start here
                </Button>
              </Box>
            </CustomSlideAnimation>
          </Stack>
        </Grid>
      </Grid>

      <FloatingNumbers />
      <SportsGrid />
    </Container>
  )
}

export default SectionOne
