import { LoginUserProps } from 'interfaces/registerInterface'
import {
  Button,
  Container,
  Box,
  Avatar,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material'
import { Stack } from '@mui/system'
import { Formik, Form } from 'formik'
import { ReactElement, useState } from 'react'
import * as yup from 'yup'
import { useUser } from 'providers/user'
import CustomTextField from '../components/CustomTextField'
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import LockIcon from '@mui/icons-material/Lock'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { default as NextLink } from 'next/link'

function login(): ReactElement {
  const [showPassword, setShowPassword] = useState<boolean>()
  const { loginUser } = useUser()

  // Keys must match the api keys
  const initialValues = {
    username: '',
    password: '',
  }

  const validationSchema = yup.object({
    username: yup.string().required('enter your username'),
    password: yup.string().required('enter your password'),
  })

  const onSubmit = (userData: LoginUserProps): void => {
    loginUser(userData)
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 10 }}>
      <Box
        sx={{
          boxShadow: 1,
          borderRadius: 1,
          padding: '20px 40px 50px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          maxWidth: '400px',
          margin: 'auto'
        }}
      >
        <Avatar
          sx={{
            bgcolor: '#1976d2',
            margin: '-60px auto',
            marginBottom: 2,
            width: '80px',
            height: '80px',
            boxShadow: 8,
          }}
        >
          <ExitToAppIcon fontSize='large' />
        </Avatar>
        <Typography variant='h3' mb={4} color='primary'>
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
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

                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  size='large'
                >
                  Login
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
        <Typography mt={5}>
          Don't have an account?
          <NextLink href='/register' style={{marginLeft: '4px'}}>Sing Up</NextLink>
        </Typography>
      </Box>
    </Container>
  )
}

export default login
