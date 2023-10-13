import { RegisterProps, SetFieldValueType } from 'interfaces/registerInterface'
import {
  ToggleButton,
  Container,
  TextField,
  ToggleButtonGroup,
  Box,
  Avatar,
  Typography,
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
import {
  sxAvatar,
  sxBox,
  sxButton,
  sxContainer,
  sxIcon,
  sxLoadingButton,
  sxSpan,
} from '@/styles/register.styles'
import Head from 'next/head'

function Register(): ReactElement {
  const [isOwner, setIsOwner] = useState<boolean>(false)
  const { registerUser, isLoading } = useUser()

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

    // Display error for specific fields that made user unable to register, eg. email address already in use.
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
    <>
      <Head>
        <title>Ninja Sports | Register</title>
        <meta name='Register page' content='register form' />
      </Head>
      <Container maxWidth='sm' sx={sxContainer}>
        <Box sx={sxBox}>
          <Avatar sx={sxAvatar}>
            <HowToRegIcon fontSize='large' />
          </Avatar>
          <Typography variant='h2' mb={4} fontSize={'24px'}>
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
                    <ToggleButton value={false} sx={sxButton}>
                      <AccountBoxIcon sx={sxIcon} /> User
                    </ToggleButton>
                    <ToggleButton value={true} sx={sxButton}>
                      <StadiumIcon sx={sxIcon} /> Facility Owner
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
                    error={
                      !!errors.confirmPassword && !!touched.confirmPassword
                    }
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
                  sx={sxLoadingButton}
                >
                  Register
                </LoadingButton>
              </Form>
            )}
          </Formik>
          <Typography mt={5}>
            Already have an account?
            <Typography component='span' sx={sxSpan}>
              <Link href='/login'>Sing In</Link>
            </Typography>
          </Typography>
        </Box>
      </Container>
    </>
  )
}

export default Register
