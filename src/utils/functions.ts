import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Court } from 'interfaces/providerInterface'

dayjs.extend(customParseFormat)

export const convertToHour = (input: string): string => {
  const time = dayjs(input.trim(), 'HH:mm:ss')

  if (!time.isValid()) {
    return 'Invalid time'
  }

  return time.format('h:mm a')
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
  if (court!.non_operating_days) {
    let nonOperatingDaysNumber = court!.non_operating_days.regular_day_off.map(
      (elem) => weekDayNumber[elem as keyof WeekDayNumber]
    )
    return week.filter((day) => nonOperatingDaysNumber.indexOf(day) === -1)
  }
  return week
}

export const getDirtyValues = (updatedValues: any, initialValues: any): any => {
  let data = {}

  for (const key in updatedValues) {
    if (updatedValues[key] !== initialValues[key]) {
      data = { ...data, [key]: updatedValues[key] }
    }
  }

  if (Object.keys(data).length > 0) return data
  else return null
}
