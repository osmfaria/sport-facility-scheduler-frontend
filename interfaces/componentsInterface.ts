import { ReactNode } from 'react'
import { EventClickArg } from '@fullcalendar/core'

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
  handlePrivacy: () => void
}

export interface locationComponent {
  long_name: string
  short_name: string
  types: string[]
}

export interface HourCardProp {
  hour: number
}

export interface CustomAnimationProp {
  children: ReactNode
  direction: 'left' | 'right'
}

export interface SectionMarkerProp {
  children: ReactNode
  firstColor: string
  secondColor: string
}

export interface CancelEventCardProps {
  isOpen: boolean
  handleClose: () => void
  eventData: EventClickArg
}

export interface FullcalendarProps {
  startTime: string
  endTime: string
  daysOfWeek: number[]
}