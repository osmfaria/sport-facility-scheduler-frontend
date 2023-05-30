import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
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
              maxWidth={{xs:'300px', sm: 'none'}}
            >
              <Button
                variant='contained'
                sx={buttonStyles2}
                onClick={() => router.push('/courts')}
              >
                Book NOW
              </Button>
              <Button variant='outlined' sx={buttonStyles}>
                Add your facility
              </Button>
            </Stack>
          </Fade>
        </Box>
      </Box>

      <Box position='relative' zIndex={2}>
        <div className={styles.divider}>
          <svg
            data-name='Layer 1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1200 120'
            preserveAspectRatio='none'
            className={styles.svg}
          >
            <path
              d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
              className={styles.shapefill}
            ></path>
          </svg>
        </div>

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
        <div className={styles.divider}>
          <svg
            data-name='Layer 1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1200 120'
            preserveAspectRatio='none'
            className={styles.svg}
          >
            <path
              d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
              className={styles.shapefill2}
            ></path>
          </svg>
        </div>

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
                    Customize your venue's operating hours and days.
                  </Typography>
                </Stack>
              </Box>
            </CustomAnimation>
          </Stack>
        </Stack>
      </Box>

      <Box position='relative'>
        <div className={styles.divider}>
          <svg
            data-name='Layer 1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1200 120'
            preserveAspectRatio='none'
            className={styles.svg}
          >
            <path
              d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
              className={styles.shapefill}
            ></path>
          </svg>
        </div>
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
