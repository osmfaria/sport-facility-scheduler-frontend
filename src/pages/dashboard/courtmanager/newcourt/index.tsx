import {
  Container,
  TextField,
  Box,
  Avatar,
  Typography,
  InputAdornment,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from '@mui/material'
import { Stack } from '@mui/system'
import { Formik, Form, Field, FormikHelpers, FieldInputProps } from 'formik'
import React, { ChangeEvent, ReactElement, useEffect } from 'react'
import * as yup from 'yup'
import LoadingButton from '@mui/lab/LoadingButton'
import {
  sxAvatar,
  sxBox,
  sxContainer,
  sxLoadingButton,
} from '@/styles/register.styles'
import { AttachMoney, Stadium } from '@mui/icons-material'
import { useFacility } from 'providers/FacilityProvider'
import { useSession } from 'next-auth/react'
import { SetFieldValueType } from 'interfaces/registerInterface'
import { CourtFormikProp } from 'interfaces/courtInterface'
import { useCourt } from 'providers/courts'

function NewCourt(): ReactElement {
  const { data: session } = useSession()
  const { facilitiesByOwner, getFacilitiesByOwner } = useFacility()
  const { createCourt, isLoading } = useCourt()
  const hoursSelection = Array.from(
    { length: 24 },
    (_, i) => `${String(i).padStart(2, '0')}:00`
  )

  useEffect(() => {
    if (session) {
      const token = session!.user.accessToken
      getFacilitiesByOwner(token)
    }
  }, [session])

  const initialValues = {
    name: '',
    sport: '',
    capacity: '',
    price_by_hour: '',
    max_schedule_range_in_days: '',
    opening_hour: '',
    closing_hour: '',
    facilityId: '',
    is_indoor: 'outdoor',
  }

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('required field')
      .max(50, 'must be at most 50 characters'),
    sport: yup
      .string()
      .required('required field')
      .max(50, 'must be at most 50 characters'),
    capacity: yup
      .number()
      .positive('type a number greater than 0')
      .integer('type an integer number')
      .required('required field'),
    price_by_hour: yup
      .number()
      .positive('type a number greater than 0')
      .required('required field'),
    max_schedule_range_in_days: yup
      .number()
      .integer('type an integer number')
      .positive('type a number greater than 0')
      .required('Enter the number of days'),
    opening_hour: yup.string().required('required field'),
    closing_hour: yup.string().required('required field'),
    facilityId: yup
      .string()
      .required('choose the facility to add the sport venue'),
  })

  const onSubmit = async (
    data: CourtFormikProp,
    formik: FormikHelpers<CourtFormikProp>
  ): Promise<void> => {
    const updatedData = { ...data, is_indoor: data.is_indoor === 'indoor' }
    const token = session!.user.accessToken
    createCourt(token, updatedData)
  }

  const formatPrice = (input: string): string => {
    return parseFloat(input).toFixed(2)
  }

  const handlePriceChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: SetFieldValueType
  ) => {
    const inputValue = e.target.value
    const formattedValue = formatPrice(inputValue)
    setFieldValue('price_by_hour', formattedValue)
  }

  return (
    <Container maxWidth='sm' sx={sxContainer}>
      <Box sx={sxBox}>
        <Avatar sx={sxAvatar}>
          <Stadium fontSize='large' />
        </Avatar>
        <Typography variant='h3' mb={4} color='primary'>
          Create Sport Venue
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(data, formik) => onSubmit(data, formik)}
        >
          {({ errors, touched, setFieldValue, handleChange, values }) => {
            return (
              <Form>
                <Stack spacing={2}>
                  <Stack direction='row' spacing={2}>
                    <Field
                      as={TextField}
                      name='name'
                      type='text'
                      label='Venue Name'
                      error={!!errors.name && !!touched.name}
                      helperText={!!touched.name && errors.name}
                      sx={{ maxWidth: '50%', flexGrow: 1 }}
                    />
                    <Field
                      as={TextField}
                      name='sport'
                      type='text'
                      label='Sport'
                      error={!!errors.sport && !!touched.sport}
                      helperText={!!touched.sport && errors.sport}
                      sx={{ maxWidth: '50%', flexGrow: 1 }}
                    />
                  </Stack>
                  <Stack direction='row' spacing={2}>
                    <Field
                      as={TextField}
                      name='capacity'
                      type='number'
                      label='Capacity'
                      min='1'
                      step='1'
                      error={!!errors.capacity && !!touched.capacity}
                      helperText={!!touched.capacity && errors.capacity}
                      sx={{ maxWidth: '50%', flexGrow: 1 }}
                    />
                    <Field
                      as={TextField}
                      name='price_by_hour'
                      type='number'
                      label='Price per hour'
                      error={!!errors.price_by_hour && !!touched.price_by_hour}
                      helperText={
                        !!touched.price_by_hour && errors.price_by_hour
                      }
                      onBlur={(e: ChangeEvent<HTMLInputElement>) =>
                        handlePriceChange(e, setFieldValue)
                      }
                      sx={{ maxWidth: 'calc(50% - 8px)', flexGrow: 1 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <AttachMoney />
                          </InputAdornment>
                        ),
                        placeholder: '22.00',
                      }}
                    />
                  </Stack>
                  <FormControl>
                    <Field
                      as={TextField}
                      name='max_schedule_range_in_days'
                      type='number'
                      label='Schedule Range (days)'
                      error={
                        !!errors.max_schedule_range_in_days &&
                        !!touched.max_schedule_range_in_days
                      }
                      helperText={
                        !!touched.max_schedule_range_in_days &&
                        errors.max_schedule_range_in_days
                      }
                      inputProps={{
                        placeholder: '60',
                      }}
                    />
                    <FormHelperText>
                      <Typography variant='caption'>
                        Duration of available booking days in the future
                      </Typography>
                    </FormHelperText>
                  </FormControl>

                  <Stack spacing={2} direction='row'>
                    <Field name='opening_hour'>
                      {({ field }: { field: FieldInputProps<string> }) => (
                        <FormControl
                          sx={{ width: '50%' }}
                          error={
                            !!errors.closing_hour && !!touched.closing_hour
                          }
                        >
                          <InputLabel id='select-opening-time-label'>
                            Opening time
                          </InputLabel>
                          <Select
                            labelId='select-opening-time-label'
                            id='select-opening-time'
                            label='Opening time'
                            {...field}
                          >
                            {hoursSelection.map((hour) => (
                              <MenuItem value={hour} key={hour}>
                                {hour}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {!!touched.opening_hour && errors.opening_hour}
                          </FormHelperText>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='closing_hour'>
                      {({ field }: { field: FieldInputProps<string> }) => (
                        <FormControl
                          sx={{ width: '50%' }}
                          error={
                            !!errors.closing_hour && !!touched.closing_hour
                          }
                        >
                          <InputLabel id='select-closing-time-label'>
                            Closing time
                          </InputLabel>
                          <Select
                            labelId='select-closing-time-label'
                            id='select-closing-time'
                            label='Closing time'
                            {...field}
                          >
                            {hoursSelection.map((hour) => (
                              <MenuItem value={hour} key={`1${hour}`}>
                                {hour}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {!!touched.closing_hour && errors.closing_hour}
                          </FormHelperText>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>
                  {facilitiesByOwner && (
                    <Field name='facilityId'>
                      {({ field }: { field: FieldInputProps<string> }) => (
                        <FormControl
                          error={!!touched.facilityId && !!errors.facilityId}
                        >
                          <InputLabel id='select-facility-label-newcourt'>
                            Choose a Facility
                          </InputLabel>
                          <Select
                            labelId='select-facility-label-newcourt'
                            id='select-facility-newcourt'
                            startAdornment={
                              <Stadium
                                sx={{ marginRight: '5px', color: 'GrayText' }}
                              />
                            }
                            label='Choose a Facility'
                            {...field}
                          >
                            {facilitiesByOwner!.map((facility) => (
                              <MenuItem value={facility.id} key={facility.id}>
                                {facility.name}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {!!touched.facilityId && errors.facilityId}
                          </FormHelperText>
                        </FormControl>
                      )}
                    </Field>
                  )}
                  <Field name='is_indoor'>
                    {({ field }: { field: FieldInputProps<string> }) => (
                      <FormControl>
                        <FormLabel id='radio-newcourt'>Location Type</FormLabel>
                        <RadioGroup {...field} row>
                          <FormControlLabel
                            value='outdoor'
                            control={<Radio />}
                            label='Outdoor'
                          />
                          <FormControlLabel
                            value='indoor'
                            control={<Radio />}
                            label='Indoor'
                          />
                        </RadioGroup>
                      </FormControl>
                    )}
                  </Field>
                </Stack>
                <Divider sx={{ marginTop: '10px' }} />
                <LoadingButton
                  variant='contained'
                  loading={isLoading}
                  loadingPosition='center'
                  color='primary'
                  type='submit'
                  size='large'
                  sx={sxLoadingButton}
                >
                  Create Venue
                </LoadingButton>
              </Form>
            )
          }}
        </Formik>
      </Box>
    </Container>
  )
}

export default NewCourt
