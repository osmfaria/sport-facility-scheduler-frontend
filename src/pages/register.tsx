import { RegisterProps, SetFieldValueType } from 'interfaces/registerInterface'
import {
  ToggleButton,
  Container,
  TextField,
  ToggleButtonGroup,
  Box,
  Avatar,
  Typography,
  useTheme,
} from '@mui/material'
import { Stack } from '@mui/system'
import StadiumIcon from '@mui/icons-material/Stadium'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import React, { ReactElement, useState } from 'react'
import * as yup from 'yup'
import { useUser } from 'providers/user'
import Link from 'next/link'
import LoadingButton from '@mui/lab/LoadingButton'

import HowToRegIcon from '@mui/icons-material/HowToReg'

function Register(): ReactElement {
  const [isOwner, setIsOwner] = useState<boolean>(false)
  const { registerUser, isLoading } = useUser()
  const theme = useTheme()

  // Keys must match the api keys
  const initialValues = {
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    confirmPassword: '',
    is_owner: false,
  }

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('invalid email')
      .required('required field')
      .max(30, 'must be at most 30 characters'),
    username: yup
      .string()
      .required('required field')
      .max(20, 'must be at most 20 characters')
      .min(2, 'must be at least 2 characters'),
    first_name: yup
      .string()
      .required('required field')
      .max(20, 'must be at most 20 characters')
      .min(2, 'must be at least 2 characters'),
    last_name: yup
      .string()
      .required('required field')
      .max(20, 'must be at most 20 characters')
      .min(2, 'must be at least 2 characters'),
    password: yup
      .string()
      .required('required field')
      .matches(strongPasswordRegex, {
        message:
          'password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
        excludeEmptyString: true,
      }),
    confirmPassword: yup
      .string()
      .required('retype your password')
      .oneOf([yup.ref('password')], 'Must match with password'),
  })

  const onSubmit = async (
    userData: RegisterProps,
    formik: FormikHelpers<RegisterProps>
  ): Promise<void> => {
    const res = await registerUser(userData)
    if (res) {
      for (let err in res) {
        formik.setFieldError(err, res[err]![0])
      }
    }
  }

  const handleAccountType =
    (setFieldValue: SetFieldValueType) =>
    (event: React.MouseEvent<HTMLElement>, accountType: boolean | null) => {
      // Guarantee that the toggleButtonGroup always keep one selected
      if (accountType !== null) {
        setIsOwner(accountType)
        setFieldValue('is_owner', accountType)
      }
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
          <HowToRegIcon fontSize='large' />
        </Avatar>
        <Typography variant='h3' mb={4} color='primary'>
          Register
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(user, formik) => onSubmit(user, formik)}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <Stack spacing={2}>
                <Field
                  as={TextField}
                  name='email'
                  type='email'
                  label='Email address*'
                  error={!!errors.email && !!touched.email}
                  helperText={!!touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  name='username'
                  type='text'
                  label='Username*'
                  error={!!errors.username && !!touched.username}
                  helperText={!!touched.username && errors.username}
                />
                <ToggleButtonGroup
                  exclusive
                  onChange={handleAccountType(setFieldValue)}
                  value={isOwner}
                  color='primary'
                >
                  <ToggleButton
                    value={false}
                    sx={{
                      flexGrow: 1,
                    }}
                  >
                    <AccountBoxIcon sx={{ marginRight: 1 }} /> User
                  </ToggleButton>
                  <ToggleButton
                    value={true}
                    sx={{
                      flexGrow: 1,
                    }}
                  >
                    <StadiumIcon sx={{ marginRight: 1 }} /> Facility Owner
                  </ToggleButton>
                </ToggleButtonGroup>
                <Field
                  as={TextField}
                  name='first_name'
                  type='text'
                  label='First name*'
                  error={!!errors.first_name && !!touched.first_name}
                  helperText={!!touched.first_name && errors.first_name}
                />
                <Field
                  as={TextField}
                  name='last_name'
                  type='text'
                  label='Last name*'
                  error={!!errors.last_name && !!touched.last_name}
                  helperText={!!touched.last_name && errors.last_name}
                />
                <Field
                  as={TextField}
                  name='password'
                  type='password'
                  label='Password*'
                  error={!!errors.password && !!touched.password}
                  helperText={!!touched.password && errors.password}
                />
                <Field
                  as={TextField}
                  name='confirmPassword'
                  type='password'
                  label='Confirm password*'
                  error={!!errors.confirmPassword && !!touched.confirmPassword}
                  helperText={
                    !!touched.confirmPassword && errors.confirmPassword
                  }
                />
              </Stack>
              <LoadingButton
                variant='contained'
                loading={isLoading}
                loadingPosition='center'
                color='primary'
                type='submit'
                size='large'
                sx={{ marginTop: 7, width: '100%' }}
              >
                Register
              </LoadingButton>
            </Form>
          )}
        </Formik>
        <Typography mt={5}>
          Alrady have an account?
          <Link
            href='/login'
            style={{ marginLeft: '4px', color: theme.palette.primary.main }}
          >
            Sing In
          </Link>
        </Typography>
      </Box>
    </Container>
  )
}

export default Register
