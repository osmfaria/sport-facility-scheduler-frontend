import { LoginUserProps } from 'interfaces/registerInterface'
import {
  Container,
  Box,
  Avatar,
  InputAdornment,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material'
import { Stack } from '@mui/system'
import { Formik, Form, FormikHelpers } from 'formik'
import { ReactElement, useEffect, useState } from 'react'
import * as yup from 'yup'
import CustomTextField from '../components/CustomTextField'
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import LockIcon from '@mui/icons-material/Lock'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { default as NextLink } from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { LoadingButton } from '@mui/lab'
import { sxAvatar, sxBox, sxContainer } from '@/styles/login.styles'
import Head from 'next/head'

function Login(): ReactElement {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter()
  const theme = useTheme()
  const callbackUrl = router.query.callbackUrl || '/'

  useEffect(() => {
    router.events.on('routeChangeError', (err) => console.log(err))

    return () => {
      router.events.off('routeChangeError', (err) => console.log(err))
    }
  })

  const initialValues = {
    username: '',
    password: '',
  }

  const validationSchema = yup.object({
    username: yup.string().required('enter your username'),
    password: yup.string().required('enter your password'),
  })

  const onSubmit = async (
    credentials: LoginUserProps,
    formik: FormikHelpers<LoginUserProps>
  ): Promise<void> => {
    const res = await signIn('credentials', {
      redirect: false,
      username: credentials.username,
      password: credentials.password,
      callbackUrl: `${window.location.origin}`,
    })

    if (res && !res.error && res.url) {
      router.push(callbackUrl as string)
    } else {
      formik.setErrors({
        username: 'invalid username or password',
        password: 'invalid username or password',
      })
    }
    formik.setSubmitting(false)
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <>
      <Head>
        <title>Ninja Sports | Login</title>
        <meta name='Login page' content='login form' />
      </Head>
      <Container maxWidth='sm' sx={sxContainer}>
        <Box sx={sxBox}>
          <Avatar sx={sxAvatar}>
            <ExitToAppIcon fontSize='large' />
          </Avatar>
          <Typography variant='h2' mb={4} fontSize={'24px'}>
            Login
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(credentials, formik) => onSubmit(credentials, formik)}
          >
            {(formik) => (
              <Form>
                <Stack spacing={5}>
                  <CustomTextField
                    name='username'
                    label='Username'
                    startAdornment={
                      <InputAdornment position='start'>
                        <AccountCircle />
                      </InputAdornment>
                    }
                  />
                  <CustomTextField
                    name='password'
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    startAdornment={
                      <InputAdornment position='start'>
                        <LockIcon />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />

                  <LoadingButton
                    variant='contained'
                    color='primary'
                    loading={formik.isSubmitting}
                    loadingPosition='center'
                    type='submit'
                    size='large'
                  >
                    Login
                  </LoadingButton>
                </Stack>
              </Form>
            )}
          </Formik>
          <Typography mt={5}>
            Don&apos;t have an account?
            <Typography
              component='span'
              color={theme.palette.primary.main}
              ml={1}
            >
              <NextLink href='/register'>Sign Up</NextLink>
            </Typography>
          </Typography>
        </Box>
      </Container>
    </>
  )
}

export default Login
