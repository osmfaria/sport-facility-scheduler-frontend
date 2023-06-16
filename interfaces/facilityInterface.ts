export interface FacilityRegisterProp {
  name: string
  email: string
  phone_number: string
  address: {
    address1: string
    address2: string
    city: string
    state: string
    country: string
    zipcode: string
    timezone: string
  }
}

export interface FacilityFormikProp {
  name: string
  email: string
  phone_number: string
  address1: string
  address2: string
  city: string
  state: string
  country: string
  zipcode: string
}

export interface RegisterFacilityAxiosError {
  name?: string[]
  email?: string[]
  phone_number?: string[]
  address?: string
  [key: string]: string[] | string | undefined
}
