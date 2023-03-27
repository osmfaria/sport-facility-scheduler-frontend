import dayjs from 'dayjs'

export const convertToHour = (input: string): string => {
  return dayjs(input, 'HH:mm:ss').format('h:mm A')
}

export const convertToCurrency = (input: string | number): string => {
  return Number(input).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}
