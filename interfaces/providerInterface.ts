import { SyntheticEvent } from 'react'
import {
  LoginUserProps,
  RegisterAxiosError,
  RegisterProps,
  UpdateUserAxiosError,
  UpdateUserProps,
  UserProps,
} from './registerInterface'
import { StringMappingType } from 'typescript'
import {
  AddressAxiosError,
  AddressProp,
  FacilityPatchProp,
  FacilityRegisterProp,
  RegisterFacilityAxiosError,
} from './facilityInterface'
import { CreateCourtProp, UpdateCourtProp } from './courtInterface'

export interface UserProviderContext {
  registerUser: (user: RegisterProps) => Promise<RegisterAxiosError | undefined>
  loginUser: (credentials: LoginUserProps) => Promise<string | undefined>
  updateUser: (
    updatedUser: UpdateUserProps,
    id: string,
    token: string
  ) => Promise<UpdateUserAxiosError | undefined>
  getUser: (id: string, token: string) => Promise<void>
  userData: UserProps | undefined
  isLoading: boolean
  isLoadingUpdate: boolean
}

export interface ColorModeContext {
  toggleColorMode: (event: SyntheticEvent, value: string) => void
  mode: 'light' | 'dark'
}

interface NonOperatingDays {
  id: StringMappingType
  regular_day_off: string[]
  court: string
}

export interface Court {
  id: string
  sport_facility: {
    id: string
    name: string
  }
  name: string
  capacity: number
  is_indoor: boolean
  price_by_hour: string
  max_schedule_range_in_days: number
  sport: string
  opening_hour: string
  closing_hour: string
  non_operating_days: NonOperatingDays
}

export interface Address {
  id: string
  address1: string
  address2: string
  city: string
  zipcode: string
  state: string
  country: string
  map_image: string
}

export interface Facility {
  id: string
  user: {
    username: string
    email: string
  }
  name: string
  email: string
  phone_number: string
  address: {
    id: string
    address1: string
    address2: string
    city: string
    zipcode: string
    state: string
    country: string
    map_image: string
  }
  courts: Court[]
}

export interface RawCourtEvent {
  id: string
  datetime: string
  number_of_hours: number
  user: {
    username: string
    email: string
  }
  court: {
    name: string
    price_by_hour: string
  }
}

export interface RawHoliday {
  id: string
  holiday: string
  court: string
}

export interface CourtEvent {
  id: string
  start: string
  end?: string
  title: string
  backgroundColor?: string
  display?: string
  extendedProps?: {
    email: string
  }
}

export interface CourtPartial {
  name: string
  capacity: number
  is_indoor: boolean
  price_by_hour: string
  max_schedule_range_in_days: number
  sport: string
  opening_hour: string
  closing_hour: string
  non_operating_days: NonOperatingDays[]
}

export interface HolidayProp {
  holiday: string
}

export interface CourtProviderContext {
  getCourtsByLocationAndTime: (date: Date, sport?: string) => Promise<void>
  isLoadingCourts: boolean
  isLoadingCourt: boolean
  courts: Court[]
  city: string
  court: Court | undefined
  getCourt: (id: string) => Promise<void>
  selectCourtId: (id: string) => void
  courtId: string
  selectCity: (name: string) => void
  createCourt: (token: string, data: CreateCourtProp) => Promise<void>
  isLoading: boolean
  updateCourt: (
    token: string,
    data: UpdateCourtProp,
    id: string
  ) => Promise<void>
  createCourtDaysOff: (
    token: string,
    data: string[],
    id: string
  ) => Promise<void>
}

export interface BookingResponse {
  id: string
  datetime: string
  number_of_hours: number
  user: {
    username: string
    email: string
  }
  court: {
    name: string
    price_by_hour: string
  }
}

export interface ScheduleProviderContext {
  getAvailableHours: (
    courtId: string | string[] | undefined,
    token: string
  ) => Promise<void>
  courtSchedule: number[]
  selectedHour: number | undefined
  selectTimeSlot: (newSelectedHour: number) => void
  isLoading: boolean
  selectDate: (date: Date) => void
  selectedDate: Date
  timeSlotRange: number
  bookCourt: (
    coirtId: string,
    numberOfHours: number,
    token: string
  ) => Promise<number>
  bookingConfirmation: BookingResponse | undefined
  isLoadingBooking: boolean
  getCourtEvents: (
    token: string,
    courtId: string,
    initialDate: string,
    finalDate: string
  ) => Promise<void>
  courtEvents: CourtEvent[]
  resetCourtEvents: () => void
  cancelBooking: (token: string, id: string) => Promise<void>
  createHoliday: (token: string, id: string, data: HolidayProp) => Promise<void>
  deleteHoliday: (token: string, id: string, date: string) => Promise<void>
  getHoliday: (token: string, id: string) => Promise<void>
  selectEvents: (events: CourtEvent[]) => void
}

export interface FacilityProviderContext {
  getAddress: (facilityId: string) => Promise<void>
  getFacility: (facilityId: string, token: string) => Promise<void>
  getFacilityCourts: (facilityId: string, token: string) => Promise<void>
  getFacilitiesByOwner: (token: string) => Promise<void>
  facilitiesByOwner: Facility[] | undefined
  chosenFacility: Facility | undefined
  chosenCourt: Court | undefined
  courtsByFacility: Court[] | undefined
  facility: Facility | undefined
  address: Address | undefined
  isLoadingAddress: boolean
  isLoadingFacility: boolean
  isLoadingCourtsByFacility: boolean
  isLoadingFacilityByOwner: boolean
  addressString: string
  createFacility: (
    token: string,
    data: FacilityRegisterProp
  ) => Promise<RegisterFacilityAxiosError>
  isLoading: boolean
  removeFacility: (token: string, facilityId: string) => Promise<void>
  removeCourt: (token: string, courtId: string) => Promise<void>
  updateFacility: (
    token: string,
    facilityId: string,
    data: FacilityPatchProp
  ) => Promise<Omit<RegisterFacilityAxiosError, 'address'>>
  updateAddress: (
    token: string,
    facilityId: string,
    data: AddressProp
  ) => Promise<AddressAxiosError>
  selectCourt: (court: Court | undefined) => void
  selectFacility: (facility: Facility) => void
  selectInitialData: () => void
}

export interface StepsProviderContext {
  handleNext: (page: string) => void
  handleBack: (page: string) => void
  steps: string[]
  activeStep: number
  selectCurrentStep: (step: number) => void
}

export interface CustomDarkThemeConfig {
  palette: {
    mode: 'dark'
    primary: {
      main: string
      light: string
      dark: string
      contrastText: string
    }
    secondary: {
      main: string
    }
    background: {
      default: string
      paper: string
    }
    text: {
      primary: string
      secondary: string
    }
  }
}

export interface CustomLightThemeConfig {
  palette: {
    mode: 'light'
    primary: {
      main: string
      light: string
    }
    secondary: {
      main: string
      light: string
    }
    background: {
      default: string
      paper: string
    }
    text: {
      primary: string
      secondary: string
    }
    grey: {
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
      700: string
      800: string
      900: string
    }
  }
  typography: {
    fontFamily: string
    h1: {
      fontSize: string
      fontWeight: number
      lineHeight: number
    }
    h2: {
      fontSize: string
      fontWeight: number
      lineHeight: number
    }
    h3: {
      fontSize: string
      fontWeight: number
      lineHeight: number
    }
    h4: {
      fontSize: string
      fontWeight: number
      lineHeight: number
    }
    h5: {
      fontSize: string
      fontWeight: number
      lineHeight: number
    }
    h6: {
      fontSize: string
      fontWeight: number
      lineHeight: number
    }
    subtitle1: {
      fontSize: string
      fontWeight: number
      lineHeight: number
    }
    subtitle2: {
      fontSize: string
      fontWeight: number
      lineHeight: number
    }
    body1: {
      fontSize: string
      fontWeight: number
      lineHeight: number
    }
    body2: {
      fontSize: string
      fontWeight: number
      lineHeight: number
    }
    button: {
      fontSize: string
      fontWeight: number
      textTransform: string
    }
    caption: {
      fontSize: string
      fontWeight: number
      lineHeight: number
    }
    overline: {
      fontSize: string
      fontWeight: number
      lineHeight: number
      textTransform: string
    }
  }
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: string
        }
      }
    }
  }
}
