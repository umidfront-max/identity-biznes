import { PasswordInfoResponseModel, RegionModel, DistrictModel, MahallaModel } from './model'
export function getPasswordInfoResponse_DEFAULT(): PasswordInfoResponseModel {
  const object: PasswordInfoResponseModel = {
    pinfl: null,
    passport_series: '',
    passport_number: '',
    passport_given_date: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    phone: null,
    extra_phone: null,
    birth_date: '',
    region_id: '',
    district_id: '',
  }
  return object
}

export function getRegion_DEFAULT(): RegionModel {
  const object: RegionModel = {
    id: 0,
    name: '',
  }
  return object
}

export function getDistrict_DEFAULT(): DistrictModel {
  const object: DistrictModel = {
    id: 0,
    name: '',
    region_id: 0,
  }
  return object
}
export function getMahalla_DEFAULT(): MahallaModel {
  const object: MahallaModel = {
    id: 0,
    name: '',
    district_id: 0,
  }
  return object
}
