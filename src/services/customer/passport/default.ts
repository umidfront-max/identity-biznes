import { type CustomerAddressModel, type CustomerBasePassportInfoModel, type CustomerPassportInfoModel, GENDER_TYPE_ENUM } from './model'

export function getCustomerAddressDEFAULT(): CustomerAddressModel {
  const object: CustomerAddressModel = {
    address: '',
    region_id: '',
    district_id: '',
    mahalla_id: '',
  }

  return object
}

export function getCustomerBasePassportInfo_DEFAULT(): CustomerBasePassportInfoModel {
  const object: CustomerBasePassportInfoModel = {
    passport_series: '',
    passport_number: '',
    birth_date: new Date(),
  }

  return object
}

export function getCustomerPassportInfo_DEFAULT(): CustomerPassportInfoModel {
  const object: CustomerPassportInfoModel = {
    ...getCustomerBasePassportInfo_DEFAULT(),
    pinfl: null,
    tin: null,
    id: 0,
    passport_given_date: '',
    passport_expiration_date: '',
    passport_given_place: '',
    passport_citizenship: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    birth_place: '',
    gender: GENDER_TYPE_ENUM.MALE,
    address: getCustomerAddressDEFAULT(),
  }

  return object
}
