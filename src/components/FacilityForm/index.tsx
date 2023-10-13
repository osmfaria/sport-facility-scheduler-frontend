import { TextField, InputAdornment, Button } from '@mui/material'
import { Stack } from '@mui/system'
import { Formik, Form, Field, FormikHelpers, getIn } from 'formik'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import * as yup from 'yup'
import LoadingButton from '@mui/lab/LoadingButton'
import {
  FacilityAxiosError,
  FacilityFormikProp2,
} from 'interfaces/facilityInterface'
import { Email, LocationCity, Phone } from '@mui/icons-material'
import useGooglePlaceAutoComplete from 'services/google_place_autocomplete'
import { useFacility } from 'providers/FacilityProvider'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { Facility } from 'interfaces/providerInterface'
import { getDirtyValues } from '@/utils/functions'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

function FacilityForm({ facility }: { facility: Facility }): ReactElement {
  const [latlng, setLatlng] = useState<string>('')
  const { isLoading, updateFacility, updateAddress } = useFacility()
  const { data: session } = useSession()
  const router = useRouter()
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
      .catch(() => toast.warning('Select an address from the drop down'))

    if (timezone && timezone.status === 'OK') return timezone.timeZoneId
    else return 'America/New_York'
  }

  const initialValues = {
    name: facility.name,
    email: facility.email,
    phone_number: facility.phone_number,
    address: {
      address1: facility.address.address1,
      address2: facility.address.address2,
      city: facility.address.city,
      state: facility.address.state,
      country: facility.address.country,
      zipcode: facility.address.zipcode,
    },
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
    address: yup.object().shape({
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
    }),
  })

  const handleAddressSelect = async (
    setFieldValue: FormikHelpers<string>['setFieldValue']
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

    setFieldValue('address.address1', address1)
    setFieldValue('address.city', city)
    setFieldValue('address.country', country)
    setFieldValue('address.state', state)
    setFieldValue('address.zipcode', zipcode)
    setLatlng(`${lat}%2C${lng}`)
  }

  const onSubmit = async (
    data: FacilityFormikProp2,
    formik: FormikHelpers<FacilityFormikProp2>
  ): Promise<void> => {
    const token = session!.user.accessToken
    const { address: addressFormValues, ...facilityFormValues } = data
    const { address: initialAddressValues, ...initialFacilityValues } =
      initialValues
    let requestErrors: FacilityAxiosError = {}

    const facilityDataToUpdate = getDirtyValues(
      facilityFormValues,
      initialFacilityValues
    )
    let addressDataToUpdate = getDirtyValues(
      addressFormValues,
      initialAddressValues
    )

    // If any address data was changed, a request will be made to update it
    if (addressDataToUpdate) {
      // Check if it is necessary to request a new timezone
      if (addressDataToUpdate.address1) {
        const timezone = await getTimeZoneId()
        addressDataToUpdate = { ...addressDataToUpdate, timezone }
      }
      const res = await updateAddress(token, facility.id, addressDataToUpdate)
      if (res) requestErrors = res
    }

    // If any facility data was changed, a request will be made to update it
    if (facilityDataToUpdate) {
      const res = await updateFacility(token, facility.id, data)
      if (res) requestErrors = { ...requestErrors, ...res }
    }

    // If any errors exist, set them to be displayed in the corresponding input field
    if (Object.keys(requestErrors).length > 0) {
      for (let err in requestErrors) {
        const errorMessage = Array.isArray(requestErrors[err])
          ? requestErrors[err]![0]
          : requestErrors[err]
        formik.setFieldError(err, errorMessage as string)
      }
    } else {
      toast.success('Changes saved!')
      router.push('/dashboard/facilitymanager')
    }
  }

  return (
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
                  helperText={!!touched.phone_number && errors.phone_number}
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
                name='address.address1'
                type='text'
                label='Address Line 1*'
                error={
                  getIn(errors, 'address.address1') &&
                  getIn(touched, 'address.address1')
                }
                helperText={
                  getIn(touched, 'address.address1') &&
                  getIn(errors, 'address.address1')
                }
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
                name='address.address2'
                type='text'
                label='Address Line 2'
                error={
                  getIn(errors, 'address.address2') &&
                  getIn(touched, 'address.address2')
                }
                helperText={
                  getIn(touched, 'address.address2') &&
                  getIn(errors, 'address.address2')
                }
              />
              <Stack spacing={2} direction='row'>
                <Field
                  as={TextField}
                  name='address.city'
                  type='text'
                  label='City*'
                  error={
                    getIn(errors, 'address.city') &&
                    getIn(touched, 'address.city')
                  }
                  helperText={
                    getIn(touched, 'address.city') &&
                    getIn(errors, 'address.city')
                  }
                />
                <Field
                  as={TextField}
                  name='address.state'
                  type='text'
                  label='State*'
                  error={
                    getIn(errors, 'address.state') &&
                    getIn(touched, 'address.state')
                  }
                  helperText={
                    getIn(touched, 'address.state') &&
                    getIn(errors, 'address.state')
                  }
                />
              </Stack>
              <Stack spacing={2} direction='row'>
                <Field
                  as={TextField}
                  name='address.country'
                  type='text'
                  label='Country*'
                  error={
                    getIn(errors, 'address.country') &&
                    getIn(touched, 'address.country')
                  }
                  helperText={
                    getIn(touched, 'address.country') &&
                    getIn(errors, 'address.country')
                  }
                />
                <Field
                  as={TextField}
                  name='address.zipcode'
                  type='text'
                  label='Zipcode*'
                  error={
                    getIn(errors, 'address.zipcode') &&
                    getIn(touched, 'address.zipcode')
                  }
                  helperText={
                    getIn(touched, 'address.zipcode') &&
                    getIn(errors, 'address.zipcode')
                  }
                />
              </Stack>
            </Stack>
            <Stack direction='row' spacing={2} mt={6} justifyContent='flex-end'>
              <Button
                variant='outlined'
                color='inherit'
                onClick={() => router.push('/dashboard/facilitymanager')}
              >
                Cancel
              </Button>
              <LoadingButton
                variant='contained'
                loading={isLoading}
                loadingPosition='center'
                color='success'
                type='submit'
                size='large'
              >
                Save
              </LoadingButton>
            </Stack>
          </Form>
        )
      }}
    </Formik>
  )
}

export default FacilityForm
