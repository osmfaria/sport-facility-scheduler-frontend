import { TuneOutlined } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { Field, FieldInputProps, Form, Formik } from 'formik'
import { Court } from 'interfaces/providerInterface'
import { useState } from 'react'
import * as yup from 'yup'
import { sxButton, sxFormControl } from './styles'
import { SetFieldValueType } from 'interfaces/registerInterface'
import { CalendarOptionsFormProps } from 'interfaces/componentsInterface'
import { getDirtyValues } from '@/utils/functions'
import { useSession } from 'next-auth/react'
import { useCourt } from 'providers/courts'
import { LoadingButton } from '@mui/lab'
import { useFacility } from 'providers/FacilityProvider'

function CalendarOptions({ chosenCourt }: { chosenCourt: Court }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { data: session } = useSession()
  const { updateCourt, createCourtDaysOff, isLoading } = useCourt()
  const { getFacilitiesByOwner } = useFacility()
  const hoursSelection = Array.from(
    { length: 24 },
    (_, i) => `${String(i).padStart(2, '0')}:00`
  )
  const openingHour = chosenCourt.opening_hour.slice(0, 5)
  const closingHour = chosenCourt.closing_hour.slice(0, 5)

  const handleDialog = () => {
    setIsOpen((prev) => !prev)
  }

  const initialValues = {
    regular_day_off: chosenCourt.non_operating_days
      ? chosenCourt.non_operating_days.regular_day_off
      : [],
    opening_hour: openingHour,
    closing_hour: closingHour,
  }

  const validationSchema = yup.object({
    opening_hour: yup.string().required(),
    closing_hour: yup.string().required(),
  })

  const handleButtonGroup = (
    setFieldValue: SetFieldValueType,
    selectedDays: string[]
  ) => {
    setFieldValue('regular_day_off', selectedDays)
  }

  const onSubmit = async (data: CalendarOptionsFormProps) => {
    const token = session!.user.accessToken
    const { regular_day_off, ...operatingHour } = data

    const updatedDayOff = getDirtyValues({ regular_day_off }, initialValues)
    const updatedOperatingHours = getDirtyValues(operatingHour, initialValues)

    if (updatedDayOff) {
      await createCourtDaysOff(token, updatedDayOff, chosenCourt.id)
    }

    if (updatedOperatingHours) {
      await updateCourt(token, updatedOperatingHours, chosenCourt.id)
    }

    if (updatedDayOff || updatedOperatingHours) {
      // Refetch data
      getFacilitiesByOwner(token)
    }

    handleDialog()
  }

  return (
    <>
      <Dialog open={isOpen} onClose={handleDialog}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              <DialogTitle>Schedule & Availability</DialogTitle>

              <DialogContent>
                <DialogContentText mb='20px'>
                  Select the non-operating days for the sports venue:
                </DialogContentText>
                <Stack spacing={4}>
                  <FormControl>
                    <ToggleButtonGroup
                      id='toggle-button-day-off'
                      color='primary'
                      value={values.regular_day_off}
                      onChange={(_, selectedDays: string[]) =>
                        handleButtonGroup(setFieldValue, selectedDays)
                      }
                      sx={{ justifyContent: 'center' }}
                    >
                      <ToggleButton value='SUNDAY' size='small'>
                        SUN
                      </ToggleButton>
                      <ToggleButton value='MONDAY' size='small'>
                        MON
                      </ToggleButton>
                      <ToggleButton value='TUESDAY' size='small'>
                        TUE
                      </ToggleButton>
                      <ToggleButton value='WEDNESDAY' size='small'>
                        WED
                      </ToggleButton>
                      <ToggleButton value='THURSDAY' size='small'>
                        THU
                      </ToggleButton>
                      <ToggleButton value='FRIDAY' size='small'>
                        FRI
                      </ToggleButton>
                      <ToggleButton value='SATURDAY' size='small'>
                        SAT
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </FormControl>
                  <DialogContentText mb='20px'>
                    Operating hours:
                  </DialogContentText>
                  <Stack spacing={2} direction='row'>
                    <Field name='opening_hour'>
                      {({ field }: { field: FieldInputProps<string> }) => (
                        <FormControl
                          error={
                            !!errors.closing_hour && !!touched.closing_hour
                          }
                          sx={sxFormControl}
                          size='small'
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
                          error={
                            !!errors.closing_hour && !!touched.closing_hour
                          }
                          sx={sxFormControl}
                          size='small'
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
                  <DialogContentText mb='20px'>
                    If you would like to add any <strong>holidays</strong>,
                    simply click on the date in the calendar.
                  </DialogContentText>
                </Stack>
              </DialogContent>
              <DialogActions
                sx={{
                  maxWidth: { xs: '80%', sm: '50%' },
                  margin: '0 0 0 auto',
                }}
              >
                <Button
                  variant='outlined'
                  onClick={handleDialog}
                  sx={{ flex: '1 1 50%' }}
                >
                  Go back
                </Button>
                <LoadingButton
                  loading={isLoading}
                  loadingPosition='center'
                  variant='contained'
                  color='success'
                  type='submit'
                  sx={{ flex: '1 1 50%' }}
                >
                  Save
                </LoadingButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
      <Box>
        <Button
          startIcon={<TuneOutlined />}
          variant='contained'
          onClick={handleDialog}
          sx={sxButton}
        >
          Schedule & Availability
        </Button>
      </Box>
    </>
  )
}

export default CalendarOptions
