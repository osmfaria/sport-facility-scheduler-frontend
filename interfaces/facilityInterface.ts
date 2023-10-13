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

export interface FacilityPatchProp {
  name?: string
  email?: string
  phone_number?: string
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

export interface FacilityFormikProp2 {
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
  }
}

export interface AddressProp {
  address1?: string
  address2?: string
  city?: string
  state?: string
  country?: string
  zipcode?: string
  timezone?: string
}

export interface AddressAxiosError {
  address1?: string[]
  address2?: string[]
  city?: string[]
  state?: string[]
  country?: string[]
  zipcode?: string[]
  timezone?: string[]
  [key: string]: string[] | string | undefined
}

export interface RegisterFacilityAxiosError {
  name?: string[]
  email?: string[]
  phone_number?: string[]
  address?: string
  [key: string]: string[] | string | undefined
}

export interface FacilityAxiosError
  extends RegisterFacilityAxiosError,
    AddressAxiosError {}
