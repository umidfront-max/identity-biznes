import { BranchModel } from '../branch'
import { TariffModel } from '../tariff'
import { CustomerPassportInfoModel } from '../customer'
import { STATUS_ENUM } from '../mib'
export interface InstalmentRequestModel {
  customer_id: number | null
  branch_id: number | string
  tariff_id: number | string
  amount: number | null
  initial_fee: number | null
  period: number | null
  description: string
  starts_in: string | number
}
export interface InstalmentModel {
  id: number
  customer_id: number
  customer: CustomerPassportInfoModel
  branch_id: number
  branch: BranchModel
  tariff_id: number
  tariff: TariffModel
  graphs: GraphsModel[]
  cards: CardModel[]
  guarantors: CustomerModel2[]
  documents: DocumentsModel[]
  images: DocumentsModel[]
  comments: CommentsModel[]
  type: number
  amount: number
  initial_fee: number
  description: string
  starts_in: number
  next_pay_date: number
  created_at: number
  updated_at: number
}

export interface CustomerModel2 {
  pinfl: null | number
  tin: null | number
  id: number
  passport_series: string
  passport_number: string
  birth_date: Date
  passport_given_date: string
  passport_expiration_date: string
  passport_given_place: string
  passport_citizenship: string
  first_name: string
  last_name: string
  middle_name: string
  birth_place: string
}
export interface GraphsModel {
  installment_id: null | number
  amount: null | number
  paid_amount: null | number
  overdue_days: null | number
  status: null | number
  starts_in: string
}
export interface ByPasportModel {
  pinfl: null | number
  passport_series: string
  passport_number: null | number
}
export interface CardModel {
  customer_id: number
  id: string
  customer: CustomerModel2
  number: string
  expiry: string
  phone: string
  status: STATUS_ENUM
  balance: string
}
export interface CardResponseModel {
  card: CardModel
  attachData: {
    session: number
    otpSentPhone: string
  }
}
export interface CardRequestModel {
  customer_id: number
  number: string
  expiry: string
  phone: string
}
export interface DocumentsModel {
  id: string
  type: string
  preview_url: string
  url: string
  name: string
  original_name: string
  mime: string
}
export interface CommentsModel {
  id: null | number
  installment_id: null | number
  creator_id: null | number
  creator_name: string
  comment: string
}
