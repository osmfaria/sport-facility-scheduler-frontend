import { FormikProps } from 'formik'

export interface RegisterProps {
  email: string
  username: string
  first_name: string
  last_name: string
  password: string
  confirmPassword: string
  is_owner: boolean
}

export interface LoginUserProps {
  username: string
  password: string
}

export type SetFieldValueType = FormikProps<any>['setFieldValue']
