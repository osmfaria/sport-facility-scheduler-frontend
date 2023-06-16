import { ReactNode } from 'react'

export interface childrenProp {
  children: ReactNode
}

export interface Timezone {
  dstOffset: number
  rawOffset: number
  status: string
  timeZoneId: string
  timeZoneName: string
}
