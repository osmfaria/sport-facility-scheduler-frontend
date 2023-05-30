import dayjs from 'dayjs'

export const convertToHour = (input: string): string => {
  console.log(input)
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
