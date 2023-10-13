import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import SectionMarker from '../../Misc/SectionMarker'
import CustomSlideAnimation from '../../customAnimations/CustomSlideAnimation'
import { sxContainer, sxImageWrapper, sxSpan } from './styles'
import CustomDivider from '../../CustomDivider'
import CustomGrowAnimation from '../../customAnimations/CustomGrowAnimation'
import Image from 'next/image'
import { Launch } from '@mui/icons-material'
import TestimonialsCarousel from '../../TestimonialsCarousel'
import { useRouter } from 'next/router'
import CustomTextAnimation from '../../customAnimations/CustomTextAnimation'
import { sxTitle } from '../SectionThree/styles'

const SectionTwo = () => {
  const router = useRouter()

  const handleSearchClick = () => {
    router.push('/courts')
  }

  const handleDashboardClick = () => {
    router.push('/dashboard')
  }

  return (
    <>
      <Container maxWidth='lg' sx={sxContainer}>
        <CustomDivider />
        <CustomSlideAnimation direction='left'>
          <SectionMarker>2</SectionMarker>
        </CustomSlideAnimation>
        <CustomTextAnimation
          text='Book your time slot'
          sx={sxTitle}
          speed={0.2}
        />

        <Grid
          container
          sx={{ position: 'relative', overflow: 'visible' }}
          mt='80px'
        >
          <Grid item xs={12} md={6} alignItems='center'>
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
                        src='/sectionIcons/user-calendar.webp'
                        alt='user'
                        height={80}
                        width={80}
                      />
                    </CustomGrowAnimation>
                    <Typography
                      m='15px 0'
                      variant='body2'
                      fontWeight='500'
                      fontSize={{ xs: '18px', sm: '20px' }}
                    >
                      Real-Time Availability: See up-to-date availability and
                      instantly book your preferred
                      <Box component='span' sx={sxSpan}>
                        {' '}
                        time slots{' '}
                      </Box>
                      .
                    </Typography>
                  </Stack>
                  <Button
                    endIcon={<Launch />}
                    variant='contained'
                    sx={{ float: 'right' }}
                    onClick={handleSearchClick}
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
                      src='/sectionIcons/diagram.webp'
                      alt='user'
                      height={100}
                      width={100}
                    />
                    <Typography
                      m='15px 0'
                      variant='body2'
                      fontWeight='500'
                      fontSize={{ xs: '18px', sm: '20px' }}
                    >
                      Manage Bookings Effortlessly: Our user-friendly dashboard
                      allows you to
                      <Box component='span' sx={sxSpan}>
                        {' '}
                        manage bookings{' '}
                      </Box>
                      , availability, and receive instant notifications.
                    </Typography>
                  </Stack>
                  <Button
                    endIcon={<Launch />}
                    variant='contained'
                    sx={{ float: 'right' }}
                    onClick={handleDashboardClick}
                  >
                    Start here
                  </Button>
                </Box>
              </CustomSlideAnimation>
            </Stack>
          </Grid>

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
              <Box sx={sxImageWrapper}>
                <Image
                  src='/main/calendar.webp'
                  alt='calendar'
                  fill
                  priority
                  sizes='(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 40vw'
                />
              </Box>
            </CustomGrowAnimation>
          </Grid>
        </Grid>
        <Typography
          variant='h2'
          fontSize={{ xs: '30px', md: '40px' }}
          textAlign='center'
          m='200px 0 40px'
        >
          🌟 See what our users are saying about us!
        </Typography>
        <TestimonialsCarousel />
      </Container>
    </>
  )
}

export default SectionTwo
