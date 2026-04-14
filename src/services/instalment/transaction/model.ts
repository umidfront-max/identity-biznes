import { CustomerShortDetailsModel } from '../../customer'
export interface TransactionResponseModel {
  id: number
  installment_id: number
  installment: InstallmentModel
  customer_id: number
  customer: CustomerShortDetailsModel
  card_id: number
  card: null
  transaction_type_id: number
  transaction_type: TransactionTypeResModel
  amount: number
  created_at: number
  updated_at: number
}
export interface TransactionRequestModel {
  id?: number
  installment_id: number | string
  customer_id: number | string
  transaction_type_id: number | string
  amount: number | string
}
export interface TransactionTypeResModel {
  created_at: string
  deleted_at: null
  id: number
  is_system: boolean
  name_en: string
  name_ru: string
  name_uz: string
  updated_at: string
}
export interface InstallmentModel {
  id: number
  customer_id: number
  branch_id: number
  tariff_id: number
  type: number
  amount: string
  initial_fee: string
  description: string
  sms_notify: boolean
  any_card_charge: boolean
  is_blacklist: boolean
  status: number
  period: number
  plum_id: null
  starts_in: string
  next_pay_date: null
  created_at: string
  updated_at: string
  deleted_at: null
  withdrawn_auto_charge: boolean
}
