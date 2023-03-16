import { RegisterProps } from '@/interfaces/registerInterface'
import {
  Button,
  ButtonGroup,
  ToggleButton,
  Container,
  TextField,
  ToggleButtonGroup,
} from '@mui/material'
import { Stack } from '@mui/system'
import StadiumIcon from '@mui/icons-material/Stadium'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { Formik, Form, Field } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'

function register() {
  const initialValues = {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    isOwner: false,
  }

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/

  const validationSchema = yup.object({
    email: yup.string().email('invalid email.').required().max(30),
    username: yup.string().required().max(20).min(2),
    firstName: yup.string().required().max(20).min(2),
    lastName: yup.string().required().max(20).min(2),
    password: yup.string().required().matches(strongPasswordRegex, {
      message:
        'password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
      excludeEmptyString: true,
    }),
    confirmPassword: yup
      .string()
      .required('retype your password')
      .oneOf([yup.ref('password')], 'Must match with password'),
  })

  const onSubmit = (values: RegisterProps): void => {
    console.log(values)
  }

  const [alignment, setAlignment] = useState<string | null>('left')

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment)
  }

  return (
    <Container maxWidth='xs' sx={{}}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, isValid, touched, dirty }) => (
          <Form>
            <Stack spacing={2}>
              <Field
                as={TextField}
                name='email'
                type='email'
                label='email'
                error={!!errors.email && !!touched.email}
                helperText={!!touched.email && errors.email}
              />
              <Field
                as={TextField}
                name='username'
                type='text'
                label='username'
                error={!!errors.username && !!touched.username}
                helperText={!!touched.username && errors.username}
              />
              <Field
                as={TextField}
                name='firstName'
                type='text'
                label='first name'
                error={!!errors.firstName && !!touched.firstName}
                helperText={!!touched.firstName && errors.firstName}
              />
              <Field
                as={TextField}
                name='lastName'
                type='text'
                label='last name'
                error={!!errors.lastName && !!touched.lastName}
                helperText={!!touched.lastName && errors.lastName}
              />
              <Field
                as={TextField}
                name='password'
                type='password'
                label='password'
                error={!!errors.password && !!touched.password}
                helperText={!!touched.password && errors.password}
              />
              <Field
                as={TextField}
                name='confirmPassword'
                type='password'
                label='confirm password'
                error={!!errors.confirmPassword && !!touched.confirmPassword}
                helperText={!!touched.confirmPassword && errors.confirmPassword}
              />
              <ToggleButtonGroup
                exclusive
                onChange={handleAlignment}
                value={alignment}
              >
                <ToggleButton value='left'>
                  <StadiumIcon /> Facility Owner
                </ToggleButton>
                <ToggleButton value='right'>
                  <AccountBoxIcon /> User
                </ToggleButton>
              </ToggleButtonGroup>
              <Button
                variant='outlined'
                color='primary'
                type='submit'
                disabled={!isValid || !dirty}
              >
                Register
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default register
