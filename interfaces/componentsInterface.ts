import { ReactNode } from 'react'

export interface LoadingBackdropProps {
  isLoading: boolean
}

export interface CustomTextFieldProps {
  type?: string
  name: string
  label: string
  startAdornment?: ReactNode
  endAdornment?: ReactNode
}
