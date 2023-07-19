import { Avatar, Box, Button, Divider, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import {
  avatarStyles,
  buttonStyles2,
  buttonStyles,
  typographyBook,
  typographyDiscover,
  typographyPlay,
  boxStyles,
  sxBackgroundColor,
} from '../styles/home.styles'
import { Fade } from 'react-awesome-reveal'
import {
  Search,
  StadiumOutlined,
  CalendarMonth,
  Event,
} from '@mui/icons-material'
import Image from 'next/image'
import phone from '../../public/phone-booking.png'
import CustomAnimation from '../components/CustomAnimation'
import CardFan from '../components/cards/CardsFan'
import SectionMarker from '../components/Misc/SectionMarker'
import CustomDivider from '../components/Misc/CustomDivider'

export default function Home() {
  const router = useRouter()

  return (
    <Box>
      <Box sx={boxStyles}>
        <Box
          textAlign='center'
          margin={{ xs: '15px auto', md: '60px auto' }}
          minHeight='100%'
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems='center'
            justifyContent='center'
          >
            <Typography variant='h1' fontWeight={500} sx={typographyDiscover}>
              Discover.
            </Typography>
            <Typography fontWeight={500} variant='h1' sx={typographyBook}>
              Book.
            </Typography>
            <Typography fontWeight={500} variant='h1' sx={typographyPlay}>
              Play.
            </Typography>
          </Stack>
          <Fade cascade triggerOnce>
            <Typography fontSize='20px' color='GrayText' marginTop='10px'>
              Uniting communities through sports. Unleash your inner athlete:
              Find top sports facilities and book your next challange.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent='center'
              margin='50px auto 0'
              maxWidth={{ xs: '300px', sm: 'none' }}
            >
              <Button
                variant='contained'
                sx={buttonStyles2}
                onClick={() => router.push('/courts')}
              >
                Book Now
              </Button>
              <Button variant='outlined' sx={buttonStyles}>
                Add Your Facility
              </Button>
            </Stack>
          </Fade>
        </Box>
      </Box>

      <Box position='relative' zIndex={2}>
        <CustomDivider color='paper' />

        <SectionMarker firstColor={'#ee0979'} secondColor={'#ff6a00'}>
          1
        </SectionMarker>

        <Typography variant='h4' fontWeight='600' textAlign='center' m='40px 0'>
          Discover Sport Facilities
        </Typography>
        <Stack
          direction={{ sm: 'column', md: 'row' }}
          justifyContent='center'
          alignItems='center'
          spacing={{ xs: 4, md: 12 }}
        >
          <CustomAnimation direction='left'>
            <CardFan />
          </CustomAnimation>
          <Stack maxWidth='350px' height='300px' justifyContent='space-around'>
            <CustomAnimation direction='right'>
              <Box>
                <Typography
                  variant='body2'
                  fontSize='20px'
                  m='10px 0'
                  fontWeight='600'
                >
                  Users
                </Typography>
                <Stack direction='row' alignItems='center' spacing={1}>
                  <Avatar sx={avatarStyles}>
                    <Search />
                  </Avatar>
                  <Divider flexItem orientation='vertical' />
                  <Typography
                    m='15px 0'
                    variant='body1'
                    fontWeight='500'
                    fontSize='18px'
                    color='GrayText'
                  >
                    Discover sports facilities based on your availability and
                    location.
                  </Typography>
                </Stack>
              </Box>
              <Box>
                <Typography
                  variant='body2'
                  fontSize='20px'
                  m='10px 0'
                  fontWeight='600'
                >
                  Business owners
                </Typography>
                <Stack direction='row' alignItems='center' spacing={1}>
                  <Avatar sx={avatarStyles}>
                    <StadiumOutlined />
                  </Avatar>
                  <Divider flexItem orientation='vertical' />
                  <Typography
                    m='15px 0'
                    variant='body1'
                    fontWeight='500'
                    fontSize='18px'
                    color='GrayText'
                  >
                    Register your sports facility and make it accessible to our
                    growing community.
                  </Typography>
                </Stack>
              </Box>
            </CustomAnimation>
          </Stack>
        </Stack>
      </Box>

      <Box position='relative' sx={sxBackgroundColor}>
        <CustomDivider color='default' />

        <Stack justifyContent='center' alignItems='center' m='80px 0 0'>
          <SectionMarker firstColor='#EC6EAD' secondColor='#3494E6'>
            2
          </SectionMarker>
        </Stack>
        <Typography variant='h4' fontWeight='600' textAlign='center' m='40px 0'>
          Book your time slot
        </Typography>
        <Stack
          direction={{ sm: 'column', md: 'row' }}
          alignItems='center'
          justifyContent='center'
          spacing={8}
        >
          <Fade triggerOnce>
            <Image src={phone} alt='smart phone' height={300} width={300} />
          </Fade>
          <Stack maxWidth='350px' height='300px' justifyContent='space-around'>
            <CustomAnimation direction='right'>
              <Box>
                <Typography
                  variant='body2'
                  fontSize='20px'
                  m='10px 0'
                  fontWeight='600'
                >
                  Users
                </Typography>
                <Stack direction='row' alignItems='center' spacing={1}>
                  <Avatar sx={avatarStyles}>
                    <CalendarMonth />
                  </Avatar>
                  <Divider flexItem orientation='vertical' />
                  <Typography
                    m='15px 0'
                    variant='body1'
                    fontWeight='500'
                    fontSize='18px'
                    color='GrayText'
                  >
                    Choose the date, time and how many hours.
                  </Typography>
                </Stack>
              </Box>
              <Box>
                <Typography
                  variant='body2'
                  fontSize='20px'
                  m='10px 0'
                  fontWeight='600'
                >
                  Business owners
                </Typography>
                <Stack direction='row' alignItems='center' spacing={1}>
                  <Avatar sx={avatarStyles}>
                    <Event />
                  </Avatar>
                  <Divider flexItem orientation='vertical' />
                  <Typography
                    m='15px 0'
                    variant='body1'
                    fontWeight='500'
                    fontSize='18px'
                    color='GrayText'
                  >
                    Customize your venue&apos;s operatings hours and days.
                  </Typography>
                </Stack>
              </Box>
            </CustomAnimation>
          </Stack>
        </Stack>
      </Box>

      <Box position='relative'>
        <CustomDivider color='paper' />

        <SectionMarker firstColor='#67B26F' secondColor='#4ca2cd'>
          3
        </SectionMarker>
        <Typography variant='h4' fontWeight='600' textAlign='center' m='40px 0'>
          All set, Enjoy your time!
        </Typography>
        <Fade triggerOnce>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent='center'
            margin='70px'
          >
            <Button variant='contained' onClick={() => router.push('/courts')}>
              Sign in
            </Button>
            <Button variant='outlined'>Sign up</Button>
          </Stack>
        </Fade>
      </Box>
    </Box>
  )
}
