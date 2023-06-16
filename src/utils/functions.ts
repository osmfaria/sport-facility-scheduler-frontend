import dayjs from 'dayjs'
import { Court } from 'interfaces/providerInterface'
import { ObjectType } from 'typescript'

export const convertToHour = (input: string): string => {
  try {
    return dayjs(input, 'HH:mm:ss').format('h:mm a')
  } catch (error) {
    console.error(`Error converting to hour: ${error}`)
    return 'Invalid time'
  }
}

export const convertToCurrency = (input: string | number): string => {
  return Number(input).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export const capitalize = (str: string): string => {
  if (typeof str !== 'string' || str.length === 0) {
    return ''
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

interface WeekDayNumber {
  MONDAY: number
  TUESDAY: number
  WEDNESDAY: number
  THURSDAY: number
  FRIDAY: number
  SATURDAY: number
  SUNDAY: number
}

export const weekDayNumber: WeekDayNumber = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
}

export const courtOperatingDays = (court: Court | undefined): number[] => {
  let week = [0, 1, 2, 3, 4, 5, 6]
  if (court) {
    let nonOperatingDaysNumber = court.non_operating_days.map(
      (elem) => weekDayNumber[elem.regular_day_off as keyof WeekDayNumber]
    )
    return week.filter((day) => nonOperatingDaysNumber.indexOf(day) === -1)
  }
  return week
}
