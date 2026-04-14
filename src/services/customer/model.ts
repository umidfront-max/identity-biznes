import { CustomerContactAddressModel, CustomerContactPhoneModel, GENDER_TYPE_ENUM, CustomerPassportInfoModel } from './'
import { CardModel } from '../instalment'
export interface CustomerShortDetailsModel {
  birth_date: Date
  birth_place: string
  created_at: Date
  first_name: string
  gender: GENDER_TYPE_ENUM
  id: number
  last_name: string
  middle_name: string
  passport_citizenship: string
  passport_expiration_date: Date
  passport_given_date: Date
  passport_given_place: string
  passport_number: string
  passport_series: string
  pinfl: string
  tin: string
  updated_at: Date
}
export interface CustomerFullInfoModel extends CustomerShortDetailsModel {
  addresses: CustomerContactAddressModel[]
  phones: CustomerContactPhoneModel[]
}
export interface CustomerFullRequestInfoModel extends CustomerPassportInfoModel {
  addresses: CustomerContactAddressModel[]
  phones: CustomerContactPhoneModel[]
  cards: CardModel[]
}
export interface ConfirmCardModel {
  session: number
  otp: string
  card_id: string
}
