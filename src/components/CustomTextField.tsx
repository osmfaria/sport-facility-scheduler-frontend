import React, { ReactElement } from 'react'
import TextField from '@mui/material/TextField'
import { FieldHookConfig, useField } from 'formik'
import { CustomTextFieldProps } from 'interfaces/componentsInterface'

const CustomTextField = ({
  type,
  name,
  label,
  startAdornment,
  endAdornment,
  ...props
}: CustomTextFieldProps): ReactElement => {
  const [field, meta] = useField(name as string | FieldHookConfig<any>)

  const inputProps = {
    ...(startAdornment && { startAdornment }),
    ...(endAdornment && { endAdornment }),
  }

  return (
    <TextField
      autoComplete={type === 'password' ? 'current-password' : ''}
      type={type}
      label={label}
      {...field}
      {...props}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      InputProps={inputProps}
      sx={{backgroundColor: 'transparent'}}
    />
  )
}

export default CustomTextField
