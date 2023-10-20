import { ReactNode } from 'react'
import { EventClickArg } from '@fullcalendar/core'
import { Facility } from './providerInterface'
import { Court } from './providerInterface'
import { DateClickArg } from '@fullcalendar/interaction'
import { SelectChangeEvent } from '@mui/material'

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

export interface SectionMarkerProp {
  children: ReactNode
}

export interface CancelEventCardProps {
  isOpen: boolean
  handleClose: () => void
  eventData: EventClickArg
}

export interface HolidayCardProps {
  isOpen: boolean
  handleClose: () => void
  dateData: DateClickArg
  courtId: string
}

export interface CancelHolidayCardProps {
  isOpen: boolean
  handleClose: () => void
  eventData: EventClickArg
  courtId: string
}

export interface FullcalendarProps {
  chosenCourt: Court
}

export interface RemoveModalProps {
  isOpen: boolean
  handleClose: () => void
  name: string
  id: string
}

export interface FacilityRowProps {
  facility: Facility
  handleModalData: (name: string, id: string) => void
}

export interface CourtRowProps {
  court: Court
  handleModalData: (name: string, id: string) => void
}

export interface CalendarOptionsFormProps {
  regular_day_off: string[]
  opening_hour: string
  closing_hour: string
}

export interface CustomSelectProps {
  isLoading: boolean
  item: Facility | Court | undefined
  itemArray: Facility[] | Court[] | undefined
  handleChange: (event: SelectChangeEvent) => void
  helperText: string
  icon: ReactNode
}

export interface SportsCardProps {
  sport: string
  imagePath: string
  logoPath: string
}

export interface CarouselCardProps {
  name: string
  rating: number
  picturePath: string
  children: ReactNode
}
