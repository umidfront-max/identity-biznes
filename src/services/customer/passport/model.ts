export interface CustomerAddressModel {
  address: string
  region_id: string | number
  district_id: string | number
  mahalla_id: string | number
}

export interface CustomerBasePassportInfoModel {
  passport_series: string
  passport_number: string
  birth_date: Date
}

export interface CustomerPassportInfoModel extends CustomerBasePassportInfoModel {
  pinfl: null | number
  tin: null | number
  id: number
  passport_given_date: string
  passport_expiration_date: string
  passport_given_place: string
  passport_citizenship: string
  first_name: string
  last_name: string
  middle_name: string
  birth_place: string
  gender: GENDER_TYPE_ENUM
  address: CustomerAddressModel
}
export enum GENDER_TYPE_ENUM {
  MALE = 0,
  FMALE = 1,
}
export const GENDER_TYPE = new Map<GENDER_TYPE_ENUM, { label: string; value: number }>()
GENDER_TYPE.set(GENDER_TYPE_ENUM.MALE, {
  label: 'Erkak',
  value: 0,
})
GENDER_TYPE.set(GENDER_TYPE_ENUM.FMALE, {
  label: 'Ayol',
  value: 1,
})
