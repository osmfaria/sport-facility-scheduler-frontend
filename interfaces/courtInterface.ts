export interface CourtFormikProp {
  name: string
  sport: string
  capacity: string
  price_by_hour: string
  max_schedule_range_in_days: string
  opening_hour: string
  closing_hour: string
  facilityId: string
  is_indoor: string 
}

export interface CreateCourtProp {
  name: string
  sport: string
  capacity: string
  price_by_hour: string
  max_schedule_range_in_days: string
  opening_hour: string
  closing_hour: string
  facilityId: string
  is_indoor: boolean 
}

export interface UpdateCourtProp {
  name?: string
  sport?: string
  capacity?: string
  price_by_hour?: string
  max_schedule_range_in_days?: string
  opening_hour?: string
  closing_hour?: string
  facilityId?: string
  is_indoor?: boolean
}


