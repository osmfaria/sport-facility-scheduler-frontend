import {
  Container,
  TextField,
  Box,
  Avatar,
  Typography,
  InputAdornment,
} from '@mui/material'
import { Stack } from '@mui/system'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import * as yup from 'yup'
import LoadingButton from '@mui/lab/LoadingButton'
import {
  sxAvatar,
  sxBox,
  sxContainer,
  sxLoadingButton,
} from '@/styles/register.styles'
import { FacilityFormikProp } from 'interfaces/facilityInterface'
import { Email, LocationCity, Phone, Stadium } from '@mui/icons-material'
import useGooglePlaceAutoComplete from 'services/google_place_autocomplete'
import { useFacility } from 'providers/FacilityProvider'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Head from 'next/head'
import { SetFieldValueType } from 'interfaces/registerInterface'

function NewFacility(): ReactElement {
  const [latlng, setLatlng] = useState<string>('')
  const { isLoading, createFacility } = useFacility()
  const { data: session } = useSession()
  const address1Ref = useRef<HTMLInputElement>()
  const googleAutoComplete = useGooglePlaceAutoComplete()
  let autoComplete = ''

  const getTimeZoneId = async (): Promise<string> => {
    const ApiKey = process.env.NEXT_PUBLIC_EMBEDDED_MAPS_KEY
    const timestamp = new Date()
    const unixTimestamp = Math.floor(timestamp.getTime() / 1000)

    const timezone = await axios
      .get(
        `https://maps.googleapis.com/maps/api/timezone/json?location=${latlng}&timestamp=${unixTimestamp}&key=${ApiKey}`
      )
      .then((res) => res.data)
      .catch((_) => toast.warning('Select an address from the drop down'))

    if (timezone && timezone.status === 'OK') return timezone.timeZoneId
    else return 'America/New_York'
  }

  const initialValues = {
    name: '',
    email: '',
    phone_number: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
  }

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('required field')
      .max(50, 'must be at most 50 characters'),
    email: yup
      .string()
      .email()
      .required('required field')
      .max(50, 'must be at most 50 characters'),
    phone_number: yup
      .string()
      .required('required field')
      .max(15, 'must be at most 50 characters'),
    address1: yup
      .string()
      .required('required field')
      .max(50, 'must be at most 50 characters'),
    address2: yup.string().max(20, 'must be at most 20 characters'),
    city: yup
      .string()
      .required('required field')
      .max(20, 'must be at most 20 characters')
      .min(2, 'must be at least 2 characters'),
    state: yup
      .string()
      .required('required field')
      .max(2, 'must be at most 20 characters')
      .min(2, 'must be at least 2 characters'),
    country: yup
      .string()
      .required('required field')
      .max(20, 'must be at most 20 characters')
      .min(2, 'must be at least 2 characters'),
    zipcode: yup
      .string()
      .required('required field')
      .max(15, 'must be at most 15 characters'),
  })

  const handleAddressSelect = async (
    setFieldValue: SetFieldValueType
  ): Promise<void> => {
    let addressObj = await googleAutoComplete.getFullAddress(autoComplete)

    address1Ref.current!.value = addressObj.address1

    const address1 = addressObj.address1 || 'Enter a location'
    const city = addressObj.locality || ''
    const state = addressObj.adminArea1Short || ''
    const country = addressObj.countryLong || ''
    const zipcode = addressObj.postalCode || ''
    const lat = addressObj.lat
    const lng = addressObj.lng

    setFieldValue('address1', address1)
    setFieldValue('city', city)
    setFieldValue('country', country)
    setFieldValue('state', state)
    setFieldValue('zipcode', zipcode)
    setLatlng(`${lat}%2C${lng}`)
  }

  const onSubmit = async (
    data: FacilityFormikProp,
    formik: FormikHelpers<FacilityFormikProp>
  ): Promise<void> => {
    const timezone = await getTimeZoneId()
    const token = session!.user.accessToken
    const address = {
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      state: data.state,
      country: data.country,
      zipcode: data.zipcode,
      timezone: timezone,
    }
    const facility = {
      name: data.name,
      phone_number: data.phone_number,
      email: data.email,
    }

    const facilityData = { ...facility, address }
    const res = await createFacility(token, facilityData)

    if (res) {
      for (let err in res) {
        const errorMessage = Array.isArray(res[err]) ? res[err]![0] : res[err]
        if (err === 'address')
          formik.setFieldError('address1', errorMessage as string)
        else formik.setFieldError(err, errorMessage as string)
      }
    }
  }

  return (
    <>
      <Head>
        <title>Ninja Sports | New Facility</title>
        <meta name='New Facility' content='New facility form' />
      </Head>
      <Container maxWidth='sm' sx={sxContainer}>
        <Box sx={sxBox}>
          <Avatar sx={sxAvatar}>
            <Stadium fontSize='large' />
          </Avatar>
          <Typography variant='h2' mb={4} fontSize={'24px'}>
            Register Facility
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(data, formik) => onSubmit(data, formik)}
          >
            {({ errors, touched, setFieldValue, handleChange, values }) => {
              // eslint-disable-next-line
              useEffect(() => {
                const loadGoogleMaps = async (): Promise<void> => {
                  // eslint-disable-next-line
                  autoComplete = await googleAutoComplete.initAutoComplete(
                    address1Ref.current!,
                    () => handleAddressSelect(setFieldValue)
                  )
                }
                loadGoogleMaps()
              }, [])
              return (
                <Form>
                  <Stack spacing={2}>
                    <Stack direction='row' spacing={2}>
                      <Field
                        as={TextField}
                        name='name'
                        type='text'
                        label='Facility Name'
                        error={!!errors.name && !!touched.name}
                        helperText={!!touched.name && errors.name}
                      />
                      <Field
                        as={TextField}
                        name='phone_number'
                        type='text'
                        label='Phone Number'
                        error={!!errors.phone_number && !!touched.phone_number}
                        helperText={
                          !!touched.phone_number && errors.phone_number
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <Phone />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Stack>
                    <Field
                      as={TextField}
                      name='email'
                      type='text'
                      label='Email'
                      error={!!errors.email && !!touched.email}
                      helperText={!!touched.email && errors.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Field
                      as={TextField}
                      name='address1'
                      type='text'
                      label='Address Line 1*'
                      error={!!errors.address1 && !!touched.address1}
                      helperText={!!touched.address1 && errors.address1}
                      inputRef={address1Ref}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <LocationCity />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Field
                      as={TextField}
                      name='address2'
                      type='text'
                      label='Address Line 2'
                      error={!!errors.address2 && !!touched.address2}
                      helperText={!!touched.address2 && errors.address2}
                    />
                    <Stack spacing={2} direction='row'>
                      <Field
                        as={TextField}
                        name='city'
                        type='text'
                        label='City*'
                        error={!!errors.city && !!touched.city}
                        helperText={!!touched.city && errors.city}
                      />
                      <Field
                        as={TextField}
                        name='state'
                        type='text'
                        label='State*'
                        error={!!errors.state && !!touched.state}
                        helperText={!!touched.state && errors.state}
                      />
                    </Stack>
                    <Stack spacing={2} direction='row'>
                      <Field
                        as={TextField}
                        name='country'
                        type='text'
                        label='Country*'
                        error={!!errors.country && !!touched.country}
                        helperText={!!touched.country && errors.country}
                      />
                      <Field
                        as={TextField}
                        name='zipcode'
                        type='text'
                        label='Zipcode*'
                        error={!!errors.zipcode && !!touched.zipcode}
                        helperText={!!touched.zipcode && errors.zipcode}
                      />
                    </Stack>
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
                    Create Facility
                  </LoadingButton>
                </Form>
              )
            }}
          </Formik>
        </Box>
      </Container>
    </>
  )
}

export default NewFacility
