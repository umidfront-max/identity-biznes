export interface PensionDTORequest {
  pinfl: number | null
  passport_series: string
  passport_number: string
  passport_given_date: string
  first_name: string
  last_name: string
  middle_name: string
  phone: number | null
  extra_phone: number | null
  birth_date: string
  region_id: number
  district_id: number
}

export interface PensionDTOResponse {
  id?: number
  status: number
  request: {
    pinfl: number
    passport_series: string
    passport_number: string
    passport_given_date: string
    first_name: string
    last_name: string
    middle_name: string
    phone: number
    extra_phone: number
    birth_date: string
    region_id: number
    district_id: number
  }
}

export interface UserStoreType<T> {
  formData: T
  list: null | object
  initialFormData: T
}
