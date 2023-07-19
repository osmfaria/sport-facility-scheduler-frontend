import {
  TextField,
  Typography,
  InputAdornment,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'
import { Stack } from '@mui/system'
import { Formik, Form, Field, FormikHelpers, FieldInputProps } from 'formik'
import React, { ChangeEvent, ReactElement } from 'react'
import * as yup from 'yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { AttachMoney } from '@mui/icons-material'
import { SetFieldValueType } from 'interfaces/registerInterface'
import { CourtFormikProp } from 'interfaces/courtInterface'
import { Court } from 'interfaces/providerInterface'
import { getDirtyValues } from '@/utils/functions'
import { useRouter } from 'next/router'
import { useCourt } from 'providers/courts'
import { useSession } from 'next-auth/react'
import { sxFormControl, sxTextField } from './styles'

function CourtForm({ court }: { court: Court }): ReactElement {
  const { updateCourt, isLoading } = useCourt()
  const router = useRouter()
  const { data: session } = useSession()
  const hoursSelection = Array.from(
    { length: 24 },
    (_, i) => `${String(i).padStart(2, '0')}:00`
  )

  const openingHour = court.opening_hour.slice(0, 5)
  const closingHour = court.closing_hour.slice(0, 5)
  const capacity = court.capacity.toString()
  const maxScheduleRange = court.max_schedule_range_in_days.toString()
  const isIndoor = court.is_indoor ? 'indoor' : 'outdoor'

  const initialValues = {
    name: court.name,
    sport: court.sport,
    capacity: capacity,
    price_by_hour: court.price_by_hour,
    max_schedule_range_in_days: maxScheduleRange,
    opening_hour: openingHour,
    closing_hour: closingHour,
    is_indoor: isIndoor,
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
  })

  const onSubmit = async (
    data: Omit<CourtFormikProp, 'facilityId'>,
    formik: FormikHelpers<Omit<CourtFormikProp, 'facilityId'>>
  ): Promise<void> => {
    let updatedValues = getDirtyValues(data, initialValues)

    if (updatedValues) {
      if (updatedValues.is_indoor) {
        updatedValues = {
          ...updatedValues,
          is_indoor: updatedValues.is_indoor === 'indoor',
        }
      }
      const token = session!.user.accessToken

      await updateCourt(token, updatedValues, court.id)
    }
    router.push('/dashboard/courtmanager')
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(data, formik) => onSubmit(data, formik)}
    >
      {({ errors, touched, setFieldValue }) => {
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
                  sx={sxTextField}
                />
                <Field
                  as={TextField}
                  name='sport'
                  type='text'
                  label='Sport'
                  error={!!errors.sport && !!touched.sport}
                  helperText={!!touched.sport && errors.sport}
                  sx={sxTextField}
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
                  sx={sxTextField}
                />
                <Field
                  as={TextField}
                  name='price_by_hour'
                  type='number'
                  label='Price per hour'
                  error={!!errors.price_by_hour && !!touched.price_by_hour}
                  helperText={!!touched.price_by_hour && errors.price_by_hour}
                  onBlur={(e: ChangeEvent<HTMLInputElement>) =>
                    handlePriceChange(e, setFieldValue)
                  }
                  sx={sxTextField}
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
                      sx={sxFormControl}
                      error={!!errors.closing_hour && !!touched.closing_hour}
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
                      sx={sxFormControl}
                      error={!!errors.closing_hour && !!touched.closing_hour}
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
            <Stack direction='row' spacing={2} mt={6} justifyContent='flex-end'>
              <Button
                variant='outlined'
                color='inherit'
                onClick={() => router.push('/dashboard/courtmanager')}
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

export default CourtForm
