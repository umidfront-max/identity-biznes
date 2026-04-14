import {
  CustomerFullInfoModel,
  CustomerShortDetailsModel,
  getCustomerPassportInfo_DEFAULT,
  ConfirmCardModel,
  CustomerFullRequestInfoModel,
} from '.'
export function getCustomerShortDetails_DEFAULT(): CustomerShortDetailsModel {
  const object: CustomerShortDetailsModel = {
    birth_date: new Date(),
    birth_place: '',
    created_at: new Date(),
    first_name: '',
    gender: 0,
    id: 0,
    last_name: '',
    middle_name: '',
    passport_citizenship: '',
    passport_expiration_date: new Date(),
    passport_given_date: new Date(),
    passport_given_place: '',
    passport_number: '',
    passport_series: '',
    pinfl: '',
    tin: '',
    updated_at: new Date(),
  }

  return object
}
export function getCustomerFullInfo_DEFAULT(): CustomerFullInfoModel {
  const object: CustomerFullInfoModel = {
    ...getCustomerShortDetails_DEFAULT(),
    addresses: [],
    phones: [],
  }

  return object
}
export function getCustomerFullRequestInfo_DEFAULT(): CustomerFullRequestInfoModel {
  const object: CustomerFullRequestInfoModel = {
    ...getCustomerPassportInfo_DEFAULT(),
    addresses: [],
    phones: [],
    cards: [],
  }
  return object
}
export function getConfirmCard_DEFAULT(): ConfirmCardModel {
  const object: ConfirmCardModel = {
    session: 0,
    otp: '',
    card_id: '',
  }
  return object
}
