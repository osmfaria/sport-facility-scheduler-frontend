import { UpdateUserProps } from 'interfaces/registerInterface'
import { TextField } from '@mui/material'
import { Stack } from '@mui/system'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import React, { ReactElement } from 'react'
import * as yup from 'yup'
import { useUser } from 'providers/user'
import LoadingButton from '@mui/lab/LoadingButton'
import { sxLoadingButton } from '@/styles/register.styles'
import { useSession } from 'next-auth/react'
import { Save } from '@mui/icons-material'
import { useRouter } from 'next/router'

function UserForm(): ReactElement {
  const { updateUser, isLoadingUpdate, userData } = useUser()
  const router = useRouter()
  const { data: session } = useSession()

  // Keys must match the api keys
  const initialValues = {
    email: userData!.email,
    username: userData!.username,
    first_name: userData!.first_name,
    last_name: userData!.last_name,
  }

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
  })

  const onSubmit = async (
    updatedUserData: UpdateUserProps,
    formik: FormikHelpers<UpdateUserProps>
  ): Promise<void> => {
    const userId = userData!.id
    const token = session!.user.accessToken
    const res = await updateUser(updatedUserData, userId, token)

    // Display error for specific fields that made user unable to register, eg. email address already in use.
    if (typeof res === 'object') {
      const errorKeys = Object.keys(res) as Array<keyof typeof res>
      for (let err of errorKeys) {
        formik.setFieldError(err, res[err]![0])
      }
    } else {
      router.push('/')
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Stack spacing={2}>
            <Field
              as={TextField}
              name='email'
              type='email'
              label='Email address'
              error={!!errors.email && !!touched.email}
              helperText={!!touched.email && errors.email}
              disabled
            />
            <Field
              as={TextField}
              name='username'
              type='text'
              label='Username*'
              error={!!errors.username && !!touched.username}
              helperText={!!touched.username && errors.username}
            />
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
          </Stack>
          <LoadingButton
            variant='contained'
            loading={isLoadingUpdate}
            startIcon={<Save />}
            color='success'
            type='submit'
            size='large'
            sx={sxLoadingButton}
          >
            Save
          </LoadingButton>
        </Form>
      )}
    </Formik>
  )
}

export default UserForm
