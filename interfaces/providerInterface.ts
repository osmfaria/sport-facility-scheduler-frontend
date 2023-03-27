import { Dispatch, SetStateAction, SyntheticEvent } from 'react'
import {
  LoginUserProps,
  RegisterAxiosError,
  RegisterProps,
} from './registerInterface'

export interface UserProviderContext {
  registerUser: (user: RegisterProps) => Promise<RegisterAxiosError | undefined>
  loginUser: (credentials: LoginUserProps) => Promise<string | undefined>
  isLoading: boolean
}

export interface ColorModeContext {
  toggleColorMode: (event: SyntheticEvent, value: string) => void
  mode: 'light' | 'dark'
}

export interface CourtProviderContext {
  getCourtsByLocationAndTime: (sport?: string) => Promise<void>
  isLoading: boolean
  courts: Court[]
  city: string
  setCity: Dispatch<SetStateAction<string>>
  date: Date
  setDate: Dispatch<SetStateAction<Date>>
}

export interface Court {
  capacity: number
  closing_hour: string
  id: string
  is_indoor: boolean
  max_schedule_range_in_days: number
  name: string
  opening_hour: string
  price_by_hour: string
  sport: string
  sport_facility: {
    name: string
  }
}

export interface CustomThemeConfig {
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
