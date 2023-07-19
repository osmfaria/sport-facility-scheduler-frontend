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

export interface RegisterAxiosError {
  email?: string[]
  username?: string[]
  [key: string]: string[] | undefined 
}

export interface UpdateUserAxiosError {
  username?: string
}

export interface UpdateUserProps {
  username: string
  first_name: string
  last_name: string
  email:string
}

interface Event {
  datetime: string
  court: string
} 

export interface UserProps {
  id: string
  username: string
  email: string
  first_name: string
  last_name: string
  current_schedules: Event[]
  schedule_history: Event[]
  is_owner: boolean
  date_joined: string
}

export type SetFieldValueType = FormikProps<any>['setFieldValue']
