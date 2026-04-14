export interface RegionModel {
  id: number
  name: string
}

export interface DistrictModel {
  id: number
  name: string
  region_id: number
}

export interface MahallaModel {
  id: number
  name: string
  district_id: number
}
export interface PassportInfoRequestModel {
  passport_series: string
  passport_number: string
  birth_date: Date
}
export interface PasswordInfoResponseModel {
  pinfl: null | number
  passport_series: string
  passport_number: string
  passport_given_date: string
  first_name: string
  last_name: string
  middle_name: string
  phone: null | number
  extra_phone: null | number
  birth_date: string | Date
  region_id: string | number
  district_id: string | number
}
