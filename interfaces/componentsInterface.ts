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

export interface SettingsDrawerProps {
  isOpen: boolean
  handleDrawer: () => void
}

export interface LocationAlertProps {
  handleLocation: () => void
}

export interface locationComponent {
  long_name: string
  short_name: string
  types: string[]
}
